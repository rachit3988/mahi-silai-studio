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
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
    });
  });
});

/* ── Contact Form → WhatsApp ────────────── */
function handleForm(e) {
  e.preventDefault();
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const email   = document.getElementById('f-email').value.trim();
  const message = document.getElementById('f-message').value.trim();

  const YOUR_WHATSAPP = '919990687859'; // ✏️ Replace with your number

  let text = 'Hello Mahi Silai Studio! \n\n';
  text += '*Name:* ' + name + '\n';
  text += '*Phone:* ' + phone + '\n';
  text += '*Service Required:* ' + service + '\n';
  if (email)   text += '*Email:* ' + email + '\n';
  if (message) text += '\n*Message:*\n' + message;
  text += '\n\nPlease let me know the details. Thank you!';

  window.open('https://wa.me/' + YOUR_WHATSAPP + '?text=' + encodeURIComponent(text), '_blank');
}

/* ── Doorstep Booking → WhatsApp ─────────── */
function bookDoorstep() {
  const YOUR_WHATSAPP = '919990687859'; // ✏️ Replace with your number
  const text = 'Hello Mahi Silai Studio! 🌸\n\nI am interested in your *Doorstep Service* — I would like to book a home visit for measurements and doorstep delivery.\n\nPlease let me know the available slots and details. Thank you!';
  window.open('https://wa.me/' + YOUR_WHATSAPP + '?text=' + encodeURIComponent(text), '_blank');
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
    '.why__card, .svc-card, .testimonial__card, .contact__card, .process__step, .g-item, .work-preview__item, .quick-contact__box'
  );
  elements.forEach((el, i) => {
    if (!el.classList.contains('visible')) {
      el.classList.add('anim-up');
      el.style.transitionDelay = (i * 0.06) + 's';
      observer.observe(el);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 30);
  buildLightbox();
  attachLightboxClicks();
});


/* ═══════════════════════════════════════════
   LIGHTBOX — built entirely in JS
═══════════════════════════════════════════ */

function buildLightbox() {
  const modal = document.createElement('div');
  modal.id = 'lightbox';
  modal.innerHTML = `
    <div id="lb-backdrop"></div>
    <div id="lb-box">
      <button id="lb-close" title="Close">&#x2715;</button>
      <button id="lb-prev">&#8592;</button>
      <button id="lb-next">&#8594;</button>
      <div id="lb-img-wrap">
        <img id="lb-img" src="" alt="" />
        <div id="lb-placeholder"><span>📷</span><p>Image not found — add file to assets/ folder</p></div>
      </div>
      <div id="lb-caption"></div>
      <div id="lb-counter"></div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('lb-backdrop').addEventListener('click', closeLightbox);
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => lightboxNav(-1));
  document.getElementById('lb-next').addEventListener('click', () => lightboxNav(1));

  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('lb-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
  });
}

let lbItems = [];
let lbIndex = 0;

function attachLightboxClicks() {
  // Gallery items
  document.querySelectorAll('.g-item').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const allVisible = Array.from(document.querySelectorAll('#galleryGrid .g-item:not(.hidden)'));
      lbItems = allVisible.map(item => {
        const img = item.querySelector('img');
        const lbl = item.querySelector('.g-item__label');
        return { src: img ? img.getAttribute('src') : '', alt: img ? img.alt : '', label: lbl ? lbl.textContent.trim() : '' };
      });
      lbIndex = allVisible.indexOf(el);
      showFrame();
    });
  });

  // Home work-preview items
  document.querySelectorAll('.work-preview__item').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      lbItems = [{ src: img ? img.getAttribute('src') : '', alt: img ? img.alt : '', label: el.dataset.label || '' }];
      lbIndex = 0;
      showFrame();
    });
  });
}

function showFrame() {
  const item   = lbItems[lbIndex];
  const lbImg  = document.getElementById('lb-img');
  const ph     = document.getElementById('lb-placeholder');

  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbImg.style.display = '';
  ph.style.display = 'none';

  // If image fails to load show placeholder
  lbImg.onerror = function() {
    lbImg.style.display = 'none';
    ph.style.display = 'flex';
  };

  document.getElementById('lb-caption').textContent = item.label || item.alt;
  document.getElementById('lb-counter').textContent = lbItems.length > 1 ? (lbIndex + 1) + ' / ' + lbItems.length : '';

  const showNav = lbItems.length > 1;
  document.getElementById('lb-prev').style.display = showNav ? 'flex' : 'none';
  document.getElementById('lb-next').style.display = showNav ? 'flex' : 'none';

  document.getElementById('lightbox').classList.add('lb-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('lb-open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
  showFrame();
}