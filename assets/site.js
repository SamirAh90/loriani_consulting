const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (event.target instanceof Element && !event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 561px)').addEventListener('change', closeMenu);

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const fields = new FormData(contactForm);
  const name = String(fields.get('name') ?? '').trim();
  const company = String(fields.get('company') ?? '').trim();
  const email = String(fields.get('email') ?? '').trim();
  const message = String(fields.get('message') ?? '').trim();
  const subject = `Förfrågan från ${company || name}`;
  const body = `Hej LoriAni Consulting!\r\n\r\n${message}\r\n\r\nNamn: ${name}\r\nFöretag: ${company || 'Ej angivet'}\r\nE-post: ${email}`;
  const mailto = `mailto:loriani.consulting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  document.querySelector('#form-status').textContent = 'Din e-postapp öppnas med din förfrågan. Skicka meddelandet där för att kontakta oss. Om appen inte öppnas kan du använda e-postadressen nedan.';
});
