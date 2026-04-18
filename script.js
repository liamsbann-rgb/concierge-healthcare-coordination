// Concierge Healthcare Coordination — minimal interactivity

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu when a link is tapped
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Booking form — builds a mailto draft so it works on a static host
  // (no backend required for Vercel static deployment)
  const form = document.getElementById('bookingForm');
  const note = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.className = 'form-note';
      note.textContent = '';

      const data = Object.fromEntries(new FormData(form).entries());

      // Basic validation
      if (!data.name || !data.email || !data.consent) {
        note.textContent = 'Please fill out your name, email, and consent to being contacted.';
        note.classList.add('error');
        return;
      }

      const subject = encodeURIComponent(
        `Consultation Request — ${data.name}`
      );
      const bodyLines = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || '—'}`,
        `Service of Interest: ${data.service || '—'}`,
        '',
        'Message:',
        data.message || '(no message provided)',
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));

      // Open the user's default mail client pre-filled
      const mailto = `mailto:info@conciergecareconsultants.org?subject=${subject}&body=${body}`;
      window.location.href = mailto;

      note.textContent =
        'Thanks! Your email client should open with a pre-filled message. If it doesn\'t, please email info@conciergecareconsultants.org directly.';
      note.classList.add('success');
      form.reset();
    });
  }

  // Smooth-scroll offset for sticky header when jumping via anchors
  const header = document.querySelector('.site-header');
  if (header) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - (header.offsetHeight - 4);
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
});
