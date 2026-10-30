(function () {
  // Header shadow once the page is scrolled.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Gentle reveal of sections as they enter the viewport.
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 5, 4) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Contact form → existing SendEmail endpoint (same JSON payload as before).
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');
  var label = button.querySelector('.btn-label');
  var idleLabel = label.textContent;
  var d = form.dataset;

  function setStatus(text, kind) {
    status.textContent = text || '';
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phoneNumber: form.phoneNumber.value.trim(),
      message: form.message.value.trim()
    };
    if (!data.email && !data.phoneNumber) {
      setStatus(d.msgRequired, 'error');
      form.phoneNumber.focus();
      return;
    }
    if (data.email && !form.email.checkValidity()) {
      setStatus(d.msgInvalidEmail, 'error');
      form.email.focus();
      return;
    }
    // Spam trap: real visitors never fill the hidden field.
    if (form.company.value) { form.reset(); setStatus(d.msgSent, 'success'); return; }

    button.disabled = true;
    label.textContent = d.msgSending;
    setStatus('');

    fetch(d.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      setStatus(d.msgSent, 'success');
    }).catch(function () {
      setStatus(d.msgError, 'error');
    }).then(function () {
      button.disabled = false;
      label.textContent = idleLabel;
    });
  });
})();
