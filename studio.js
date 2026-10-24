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
const header = document.querySelector('.header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
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

// Motion. Everything below is progressive enhancement: CSS hides animated
// elements only while .js is set and motion is allowed, and .no-anim undoes
// that if GSAP is unavailable.
if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
  document.documentElement.classList.add('no-anim');
} else {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  document.fonts.ready.then(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: '(prefers-reduced-motion: no-preference)', fine: '(pointer: fine)' }, context => {
      const { motion, fine } = context.conditions;
      if (!motion) return;
      const ease = 'expo.out';

      gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

      // Hero intro
      const heroLine = SplitText.create('.hero-line', { type: 'words,lines', mask: 'lines' });
      const intro = gsap.timeline({ defaults: { ease } });
      intro
        .set('.hero-line', { autoAlpha: 1 })
        .fromTo('[data-hero].eyebrow', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .8 })
        .from(heroLine.lines, { yPercent: 110, duration: 1.1, stagger: .1 }, '-=.5')
        .fromTo('.rotator', { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: .9 }, '-=.7')
        .fromTo('.hero-copy > [data-hero]:not(.eyebrow)', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, stagger: .1 }, '-=.6')
        .fromTo('.device', { autoAlpha: 0, y: 80, rotateX: 22 }, { autoAlpha: 1, y: 0, rotateX: fine ? 6 : 0, duration: 1.4 }, .3)
        .fromTo('.hero-visual > :not(.device)', { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1, duration: .8, stagger: .12, ease: 'back.out(1.7)' }, '-=.8');

      document.querySelectorAll('[data-count]').forEach(counter => {
        intro.from(counter, { textContent: 0, duration: 1.6, ease: 'power2.out', snap: { textContent: 1 } }, 1);
      });

      // Rotating word
      const words = ['calm.', 'clear.', 'fast.', 'yours.'];
      const word = document.querySelector('.rotator-word');
      let index = 0;
      const rotate = gsap.timeline({ repeat: -1, delay: 2.4, repeatDelay: 1.6 });
      rotate
        .to(word, { yPercent: -110, duration: .5, ease: 'power3.in' })
        .call(() => { index = (index + 1) % words.length; word.textContent = words[index]; })
        .fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: .7, ease });

      // Hero parallax: layers drift with the pointer, aurora drifts on scroll
      if (fine) {
        const visual = document.querySelector('.hero-visual');
        const layers = [...visual.querySelectorAll('[data-depth]')].map(layer => ({
          depth: Number(layer.dataset.depth),
          x: gsap.quickTo(layer, 'x', { duration: .8, ease: 'power3' }),
          y: gsap.quickTo(layer, 'y', { duration: .8, ease: 'power3' })
        }));
        const hero = document.querySelector('.hero');
        hero.addEventListener('pointermove', event => {
          const px = event.clientX / window.innerWidth - .5;
          const py = event.clientY / window.innerHeight - .5;
          layers.forEach(layer => { layer.x(px * layer.depth); layer.y(py * layer.depth); });
        });
        hero.addEventListener('pointerleave', () => layers.forEach(layer => { layer.x(0); layer.y(0); }));
      }
      gsap.to('.hero .aurora', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-inner', { yPercent: 8, autoAlpha: .4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center top', end: 'bottom top', scrub: true } });

      // Section headings: line-by-line mask reveal
      document.querySelectorAll('[data-split]:not(.hero-line)').forEach(heading => {
        const split = SplitText.create(heading, { type: 'lines', mask: 'lines' });
        gsap.set(heading, { autoAlpha: 1 });
        gsap.from(split.lines, { yPercent: 110, duration: 1.1, stagger: .12, ease, scrollTrigger: { trigger: heading, start: 'top 88%', once: true } });
      });

      document.querySelectorAll('[data-reveal]').forEach(element => {
        gsap.fromTo(element, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease, scrollTrigger: { trigger: element, start: 'top 90%', once: true } });
      });

      document.querySelectorAll('[data-stagger]').forEach(group => {
        ScrollTrigger.batch(group.children, {
          start: 'top 90%',
          once: true,
          onEnter: batch => gsap.fromTo(batch, { autoAlpha: 0, y: 60, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: .1, ease })
        });
      });

      gsap.fromTo('.process-line-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process-steps', start: 'top 65%', end: 'bottom 65%', scrub: .5 } });
      gsap.from('.footer-wordmark', { yPercent: 50, autoAlpha: 0, duration: 1.4, ease, scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true } });

      if (fine) {
        // Magnetic buttons
        document.querySelectorAll('.magnetic').forEach(button => {
          const x = gsap.quickTo(button, 'x', { duration: .6, ease: 'elastic.out(1, .4)' });
          const y = gsap.quickTo(button, 'y', { duration: .6, ease: 'elastic.out(1, .4)' });
          button.addEventListener('pointermove', event => {
            const box = button.getBoundingClientRect();
            x((event.clientX - box.left - box.width / 2) * .3);
            y((event.clientY - box.top - box.height / 2) * .3);
          });
          button.addEventListener('pointerleave', () => { x(0); y(0); });
        });

        // Gentle 3D tilt on project cards
        document.querySelectorAll('.project-card').forEach(card => {
          const rx = gsap.quickTo(card, 'rotationX', { duration: .6, ease: 'power3' });
          const ry = gsap.quickTo(card, 'rotationY', { duration: .6, ease: 'power3' });
          gsap.set(card, { transformPerspective: 1000 });
          card.addEventListener('pointermove', event => {
            const box = card.getBoundingClientRect();
            ry(((event.clientX - box.left) / box.width - .5) * 6);
            rx(((event.clientY - box.top) / box.height - .5) * -6);
          });
          card.addEventListener('pointerleave', () => { rx(0); ry(0); });
        });
      }
    });

    // Cursor spotlight on cards (cheap CSS variables, fine pointers only)
    mm.add('(pointer: fine)', () => {
      const cards = document.querySelectorAll('.project-card, .service');
      const onMove = event => {
        const card = event.currentTarget;
        const box = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - box.left}px`);
        card.style.setProperty('--my', `${event.clientY - box.top}px`);
      };
      cards.forEach(card => card.addEventListener('pointermove', onMove));
      return () => cards.forEach(card => card.removeEventListener('pointermove', onMove));
    });
  });
}

// Safety net: if anything above throws before the intro runs, show the page.
setTimeout(() => {
  const line = document.querySelector('.hero-line');
  if (line && getComputedStyle(line).visibility === 'hidden') document.documentElement.classList.add('no-anim');
}, 4000);
