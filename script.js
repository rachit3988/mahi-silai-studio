/* ═══════════════════════════════════════════
   MAHI SILAI STUDIO – script.js
═══════════════════════════════════════════ */

/* ── Section Navigation ─────────────────── */
function showSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav__link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
  });

  window.scrollTo({ top: 0, behavior: 'instant' });

  // Re-trigger animations for new section
  setTimeout(initScrollAnimations, 50);
}

/* ── Mobile Menu ────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ── Nav Scroll Style ───────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Gallery Filter ─────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.g-item').forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

/* ── Contact Form ───────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  e.target.reset();
  setTimeout(() => success.classList.remove('show'), 6000);
}

/* ── Scroll Animations ──────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.why__card, .svc-card, .testimonial__card, .contact__card, .process__step, ' +
    '.g-item, .work-preview__item, .quick-contact__box'
  );
  elements.forEach((el, i) => {
    if (!el.classList.contains('visible')) {
      el.classList.add('anim-up');
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    }
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  // Trigger nav scroll state check
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 30);
});
