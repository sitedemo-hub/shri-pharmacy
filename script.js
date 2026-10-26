// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

// Audience tabs
const tabs = document.querySelectorAll('.tabs button');
const panels = document.querySelectorAll('.panel');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.setAttribute('aria-selected', x === t));
  panels.forEach(p => p.classList.toggle('active', p.id === t.dataset.tab));
}));

// Enquiry form: submissions go to the owner's Formspree inbox/dashboard.
// Paste the owner's endpoint here, e.g. 'https://formspree.io/f/abcdwxyz'
const FORM_ENDPOINT = '';
document.getElementById('enquiry').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target;
  const note = document.getElementById('formnote');
  const btn = f.querySelector('button[type="submit"]');
  if (f._gotcha.value) return; // honeypot: bots fill this hidden field
  if (!f.name.value.trim() || !f.contact.value.trim() || !f.msg.value.trim()) {
    note.textContent = 'Please fill in your name, contact and message.';
    return;
  }
  if (!FORM_ENDPOINT) {
    note.textContent = 'Enquiry form will be activated soon. Please call us directly.';
    return;
  }
  btn.disabled = true;
  note.textContent = 'Sending...';
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: f.name.value.trim(),
        contact: f.contact.value.trim(),
        customer_type: f.type.value,
        message: f.msg.value.trim()
      })
    });
    if (!res.ok) throw new Error(res.status);
    f.reset();
    note.textContent = 'Thank you! We have received your enquiry and will contact you soon.';
  } catch (err) {
    note.textContent = 'Sorry, something went wrong. Please try again or call us.';
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('yr').textContent = new Date().getFullYear();
