/* ═══════════════════════════════════════════
   SeMe™ – main.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: shrink on scroll ── */
  const navbar = document.querySelector('.site-navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
  });

  /* ── Enquiry form: basic validation + feedback ── */
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input[required]');
      let valid = true;

      inputs.forEach(input => {
        input.classList.remove('is-invalid');
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          valid = false;
        }
      });

      if (valid) {
        const btn = form.querySelector('.btn-say-hello');
        const original = btn.textContent;
        btn.textContent = 'Message sent!';
        btn.disabled = true;
        btn.style.background = '#28a745';
        btn.style.borderColor = '#28a745';

        form.reset();

        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3000);
      }
    });
  }

  /* ── Product image: lazy-load polyfill for older browsers ── */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Product tabs: reset scroll position on tab change ── */
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('shown.bs.tab', () => {
      const wrapper = document.querySelector('.products-scroll-wrapper');
      if (wrapper) wrapper.scrollLeft = 0;
    });
  });

});

/* ── Navbar scrolled style (added via JS) ── */
const style = document.createElement('style');
style.textContent = `
  .navbar-scrolled {
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    padding-top: 0.4rem !important;
    padding-bottom: 0.4rem !important;
    transition: all 0.25s ease;
  }
  .enquiry-input.is-invalid {
    box-shadow: 0 0 0 2px #dc3545 !important;
  }
`;
document.head.appendChild(style);
