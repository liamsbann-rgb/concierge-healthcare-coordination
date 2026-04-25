// Concierge Healthcare Coordination
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {

  // Set current year in footer
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
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Booking form — saves to Firebase Firestore
  const form = document.getElementById('bookingForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      note.className = 'form-note';
      note.textContent = '';

      const data = Object.fromEntries(new FormData(form).entries());

      if (!data.name || !data.email || !data.consent) {
        note.textContent = 'Please fill out your name, email, and consent to being contacted.';
        note.classList.add('error');
        return;
      }

      try {
        await addDoc(collection(db, "consultations"), {
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          service: data.service || '',
          message: data.message || '',
          timestamp: serverTimestamp()
        });
        note.textContent = 'Thank you! We\'ll be in touch shortly to schedule your consultation.';
        note.classList.add('success');
        form.reset();
      } catch (err) {
        console.error('Firestore error:', err);
        note.textContent = 'Something went wrong. Please email info@conciergecareconsultants.org directly.';
        note.classList.add('error');
      }
    });
  }

  // Smooth-scroll offset for sticky header
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
