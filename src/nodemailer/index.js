// AWS Lambda behind API Gateway (POST /SendEmail): emails contact-form submissions.
//
// Credentials come from the function's environment variables, never from code:
//   GMAIL_USER          sending Gmail address, e.g. dradigoldshtein@gmail.com
//   GMAIL_APP_PASSWORD  16-character Gmail App Password (recommended)
//   MAIL_TO             optional, defaults to GMAIL_USER
// or, instead of an App Password, OAuth2:
//   GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN
//
// Works on the nodejs22.x and nodejs24.x runtimes (async handler, no callback).
const nodemailer = require('nodemailer');

const env = process.env;
const LIMITS = { name: 200, email: 320, phoneNumber: 40, message: 5000 };

function transport() {
  if (!env.GMAIL_USER) throw new Error('GMAIL_USER is not set');
  const auth = env.GMAIL_APP_PASSWORD
    ? { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD }
    : {
        type: 'OAuth2',
        user: env.GMAIL_USER,
        clientId: env.GMAIL_CLIENT_ID,
        clientSecret: env.GMAIL_CLIENT_SECRET,
        refreshToken: env.GMAIL_REFRESH_TOKEN,
      };
  return nodemailer.createTransport({ service: 'gmail', auth });
}

const escapeHtml = (s) => s
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function readPayload(event) {
  // Lambda proxy integration delivers a JSON string in event.body;
  // the non-proxy integration (how this API was set up) passes the parsed body as the event.
  let data = event || {};
  if (typeof data.body === 'string') {
    const raw = data.isBase64Encoded ? Buffer.from(data.body, 'base64').toString('utf8') : data.body;
    data = JSON.parse(raw || '{}');
  }
  const out = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    out[key] = String(data[key] || '').trim().slice(0, max);
  }
  return out;
}

const isProxy = (event) => Boolean(event && event.requestContext && 'body' in event);
const reply = (statusCode, message) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ message }),
});

exports.handler = async (event) => {
  const proxy = isProxy(event);
  let data;
  try {
    data = readPayload(event);
  } catch (err) {
    if (proxy) return reply(400, 'Invalid request body');
    throw new Error('Invalid request body');
  }

  if (!data.email && !data.phoneNumber) {
    if (proxy) return reply(400, 'Phone or email is required');
    throw new Error('Phone or email is required');
  }

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phoneNumber],
    ['Message', data.message],
  ];

  try {
    await transport().sendMail({
      from: `"adigoldshtein.com" <${env.GMAIL_USER}>`,
      to: env.MAIL_TO || env.GMAIL_USER,
      replyTo: data.email || undefined,
      subject: `New contact request from ${data.name || data.email || data.phoneNumber}`,
      text: rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n'),
      html: rows
        .map(([k, v]) => `<p><strong>${k}</strong><br>${v ? escapeHtml(v).replace(/\n/g, '<br>') : '-'}</p>`)
        .join(''),
    });
  } catch (err) {
    console.error('sendMail failed:', err && err.message);
    if (proxy) return reply(502, 'Could not send email');
    throw new Error('Could not send email');
  }

  console.log('Contact request sent');
  return proxy ? reply(200, 'Email sent successfully') : 'Email sent successfully';
};
