// All site copy, per language. Edit text here, then `npm run build`.

export const SITE_URL = 'https://adigoldshtein.com';
export const EMAIL = 'dradigoldshtein@gmail.com';
export const CONTACT_ENDPOINT = 'https://fd3kjuggg1.execute-api.eu-west-2.amazonaws.com/prod/SendEmail';

export const content = {
  he: {
    lang: 'he',
    dir: 'rtl',
    locale: 'he_IL',
    path: '/',
    switchLabel: 'English',
    switchHref: '/en',
    switchLang: 'en',

    title: 'ד״ר עדי גולדשטיין אהרון | טיפולי שורש ואנדודונטיה במיקרוסקופ',
    description: 'ד״ר עדי גולדשטיין אהרון עוסקת באנדודונטיה – טיפולי שורש, טיפולי שורש חוזרים, טראומה דנטלית וכירורגיה אנדודונטית. כלל הטיפולים מבוצעים תחת מיקרוסקופ אנדודונטי.',

    name: 'ד״ר עדי גולדשטיין אהרון',
    nameShort: 'ד״ר עדי גולדשטיין אהרון',
    role: 'אנדודונטיה · טיפולי שורש במיקרוסקופ',

    nav: { about: 'אודות', treatments: 'תחומי טיפול', contact: 'צור קשר' },
    skip: 'דלג לתוכן',

    hero: {
      eyebrow: 'אנדודונטיה · טיפולי שורש במיקרוסקופ',
      titlePrefix: 'ד״ר',
      titleName: 'עדי גולדשטיין אהרון',
      lead: 'ד״ר עדי גולדשטיין אהרון עוסקת באנדודונטיה – טיפולי שורש, טיפולי שורש חוזרים, טיפול בטראומה דנטלית וכירורגיה אנדודונטית. כלל הטיפולים מבוצעים תחת מיקרוסקופ אנדודונטי, לדיוק מרבי ולשימור השן הטבעית.',
      cta: 'לתיאום ייעוץ',
      ctaSecondary: 'תחומי טיפול',
      imageAlt: 'ד״ר עדי גולדשטיין אהרון במרפאה',
      badge: 'ראשת קורס טיפולי שורש, אוניברסיטת תל אביב',
    },

    about: {
      eyebrow: 'אודות',
      title: 'הכשרה, הוראה וניסיון קליני',
      intro: 'שילוב של עשייה אקדמית בפקולטה לרפואת שיניים באוניברסיטת תל אביב עם ניסיון קליני רב שנים.',
      items: [
        { icon: 'graduation', text: 'בוגרת אוניברסיטת תל אביב משנת 2017' },
        { icon: 'presentation', text: 'ראשת קורס טיפולי שורש באוניברסיטת תל אביב' },
        { icon: 'landmark', text: 'סגל אקדמי באוניברסיטת תל אביב' },
        { icon: 'stethoscope', text: 'מדריכה קלינית מעל 7 שנים' },
        { icon: 'wind', text: 'מטפלת בגז צחוק' },
      ],
    },

    treatments: {
      eyebrow: 'תחומי טיפול',
      title: 'שימור השן הטבעית, בדיוק מרבי',
      items: [
        { icon: 'tooth', title: 'טיפולי שורש', text: 'טיפול בעצב השן שהודלק או נפגע, להקלה על הכאב ולשימור השן הטבעית.' },
        { icon: 'refresh', title: 'טיפולי שורש חוזרים', text: 'טיפול מחודש בשן שעברה בעבר טיפול שורש ולא החלימה כמצופה.' },
        { icon: 'shield', title: 'טראומה דנטלית', text: 'אבחון וטיפול בשיניים שנפגעו בחבלה – שבר, תזוזה או עקירה.' },
        { icon: 'scalpel', title: 'כירורגיה אנדודונטית', text: 'טיפול כירורגי באזור קצה השורש, כאשר טיפול שמרני אינו מספיק.' },
      ],
    },

    microscope: {
      title: 'כלל הטיפולים מבוצעים תחת מיקרוסקופ אנדודונטי',
      imageAlt: 'ד״ר עדי גולדשטיין אהרון ליד המיקרוסקופ האנדודונטי במרפאה',
      text: 'הגדלה ותאורה מתקדמות מאפשרות לראות ולטפל בפרטים הקטנים ביותר – בדיוק, בעדינות ותוך שימור מרבי של רקמת השן.',
    },

    contact: {
      eyebrow: 'צור קשר',
      title: 'נשמח לעמוד לרשותך',
      text: 'השאירו פרטים ונחזור אליכם בהקדם, או כתבו לנו ישירות במייל.',
      emailLabel: 'אימייל',
      form: {
        name: 'שם מלא',
        email: 'אימייל',
        phone: 'טלפון',
        message: 'במה נוכל לעזור?',
        submit: 'שליחה',
        sending: 'שולח…',
        sent: 'תודה! ההודעה נשלחה ונחזור אליך בהקדם.',
        error: 'אירעה שגיאה בשליחה. אפשר לנסות שוב או לכתוב לנו ישירות במייל.',
        required: 'נא למלא טלפון או אימייל.',
        invalidEmail: 'כתובת האימייל אינה תקינה.',
      },
    },

    footer: { rights: 'כל הזכויות שמורות.' },
    notFound: { title: 'הדף לא נמצא', text: 'ייתכן שהקישור שגוי או שהדף הועבר.', back: 'לדף הבית' },
  },

  en: {
    lang: 'en',
    dir: 'ltr',
    locale: 'en_US',
    path: '/en',
    switchLabel: 'עברית',
    switchHref: '/',
    switchLang: 'he',

    title: 'Dr. Adi Goldshtein Aharon | Endodontics & Microscope Root Canal Treatment',
    description: 'Dr. Adi Goldshtein Aharon practices endodontics: root canal treatment, root canal retreatment, dental trauma and endodontic surgery. All treatments are performed under an endodontic microscope.',

    name: 'Dr. Adi Goldshtein Aharon',
    nameShort: 'Dr. Adi Goldshtein Aharon',
    role: 'Endodontics · Microscope root canal treatment',

    nav: { about: 'About', treatments: 'Treatments', contact: 'Contact' },
    skip: 'Skip to content',

    hero: {
      eyebrow: 'Endodontics · Microscope root canal treatment',
      titlePrefix: 'Dr.',
      titleName: 'Adi Goldshtein Aharon',
      lead: 'Dr. Adi Goldshtein Aharon practices endodontics: root canal treatment, root canal retreatment, dental trauma care and endodontic surgery. All treatments are performed under an endodontic microscope, for maximum precision and preservation of the natural tooth.',
      cta: 'Book a consultation',
      ctaSecondary: 'Treatments',
      imageAlt: 'Dr. Adi Goldshtein Aharon at the clinic',
      badge: 'Head of the endodontics course, Tel Aviv University',
    },

    about: {
      eyebrow: 'About',
      title: 'Training, teaching and clinical experience',
      intro: 'Academic work at the Tel Aviv University School of Dental Medicine, combined with years of clinical practice.',
      items: [
        { icon: 'graduation', text: 'Tel Aviv University graduate, class of 2017' },
        { icon: 'presentation', text: 'Head of the endodontics course at Tel Aviv University' },
        { icon: 'landmark', text: 'Academic faculty member at Tel Aviv University' },
        { icon: 'stethoscope', text: 'Clinical instructor for over 7 years' },
        { icon: 'wind', text: 'Treatment with nitrous oxide (laughing gas)' },
      ],
    },

    treatments: {
      eyebrow: 'Treatments',
      title: 'Saving the natural tooth, with precision',
      items: [
        { icon: 'tooth', title: 'Root canal treatment', text: 'Treating an inflamed or damaged tooth nerve to relieve pain and preserve the natural tooth.' },
        { icon: 'refresh', title: 'Root canal retreatment', text: 'Re-treating a tooth that had a root canal in the past and has not healed as expected.' },
        { icon: 'shield', title: 'Dental trauma', text: 'Diagnosis and care for teeth injured by impact: fractures, displacement or knocked-out teeth.' },
        { icon: 'scalpel', title: 'Endodontic surgery', text: 'Surgical treatment around the root tip, when conventional treatment is not enough.' },
      ],
    },

    microscope: {
      title: 'Every treatment is performed under an endodontic microscope',
      imageAlt: 'Dr. Adi Goldshtein Aharon beside the endodontic microscope at the clinic',
      text: 'Advanced magnification and illumination make it possible to see and treat the finest details: precisely, gently, and preserving as much of the tooth as possible.',
    },

    contact: {
      eyebrow: 'Contact',
      title: 'We would be glad to help',
      text: 'Leave your details and we will get back to you soon, or email us directly.',
      emailLabel: 'Email',
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone',
        message: 'How can we help?',
        submit: 'Send',
        sending: 'Sending…',
        sent: 'Thank you! Your message was sent and we will be in touch soon.',
        error: 'Something went wrong. Please try again, or email us directly.',
        required: 'Please enter a phone number or an email.',
        invalidEmail: 'Please check the email address.',
      },
    },

    footer: { rights: 'All rights reserved.' },
    notFound: { title: 'Page not found', text: 'The link may be wrong, or the page has moved.', back: 'Back to home' },
  },
};
