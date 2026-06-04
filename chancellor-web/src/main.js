const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const bookingForm = document.querySelector('#booking');

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  header.classList.toggle('menu-open', isOpen);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    header.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

function setError(field, message) {
  const wrapper = field.closest('.field');
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  wrapper?.classList.toggle('has-error', Boolean(message));
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (error) error.textContent = message;
}

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = ['checkin', 'checkout', 'guests', 'rooms'].map((id) => document.getElementById(id));
  let isValid = true;

  fields.forEach((field) => {
    if (!field.value) {
      const label = bookingForm.querySelector(`label[for="${field.id}"]`)?.textContent || 'This field';
      setError(field, `${label} is required to continue.`);
      isValid = false;
    } else {
      setError(field, '');
    }
  });

  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  if (checkin.value && checkout.value && new Date(checkout.value) <= new Date(checkin.value)) {
    setError(checkout, 'Select a check-out date after your check-in date.');
    isValid = false;
  }

  const status = bookingForm.querySelector('.form-status');
  if (status) {
    status.textContent = isValid
      ? 'Great — availability search is ready to connect to your booking engine.'
      : 'Please complete the highlighted fields before checking availability.';
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));


// Offer filtering
const filterButtons = document.querySelectorAll('[data-filter]');
const offerCards = document.querySelectorAll('[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    offerCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

// Contact form validation
const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = Array.from(contactForm.querySelectorAll('[required]'));
  let isValid = true;
  requiredFields.forEach((field) => {
    let message = '';
    if (!field.value.trim()) {
      const label = contactForm.querySelector(`label[for="${field.id}"]`)?.textContent || 'This field';
      message = `${label} is required.`;
    } else if (field.type === 'email' && !field.validity.valid) {
      message = 'Please enter a valid email address.';
    }
    setError(field, message);
    if (message) isValid = false;
  });
  const status = contactForm.querySelector('.form-status');
  if (status) {
    status.textContent = isValid
      ? 'Thank you — your inquiry is ready to connect to the hotel CRM or email workflow.'
      : 'Please correct the highlighted fields before sending your inquiry.';
  }
});
