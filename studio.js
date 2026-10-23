const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
const revealed = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  revealed.forEach(section => observer.observe(section));
} else {
  revealed.forEach(section => section.classList.add('is-visible'));
}
window.matchMedia('(min-width: 821px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  const submit = contactForm.querySelector('button[type="submit"]');
  const label = submit.querySelector('.button-label');
  const checks = [
    ['name', field => field.value.trim() ? '' : 'Please add your name.'],
    ['email', field => !field.value.trim() ? 'Please add your email so I can reply.' : field.validity.valid ? '' : 'That email doesn’t look quite right.'],
    ['message', field => field.value.trim() ? '' : 'Please tell me a little about your idea.']
  ];
  function validate(field, check) {
    const message = check(field);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent = message;
    return !message;
  }
  checks.forEach(([name, check]) => {
    const field = contactForm.elements[name];
    field.addEventListener('blur', () => { if (field.value) validate(field, check); });
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field, check); });
  });
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const invalid = checks.map(([name, check]) => validate(contactForm.elements[name], check) ? null : contactForm.elements[name]).filter(Boolean);
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
    submit.disabled = true;
    label.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = '';
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      contactForm.reset();
      status.classList.add('is-success');
      status.textContent = 'Thanks! Your request is on its way. I’ll reply within two business days.';
    } catch {
      status.classList.add('is-error');
      status.textContent = 'Sorry, something went wrong. Please try again, or email hello@serenegoods.ca.';
    } finally {
      submit.disabled = false;
      label.textContent = 'Send my request';
    }
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
