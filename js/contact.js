/* ═══════════════════════════════════════════
   SeMe™ – contact.js
   Form validation & submission feedback
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

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

    // Basic email format check
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector('.btn-contact-submit');
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
    }, 3500);
  });
});
