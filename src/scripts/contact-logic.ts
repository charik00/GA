/* Contact form: validates required fields, submits the message to /api/contact
 * (Web3Forms, to info@geneticanalyze.com), shows a confirmation, and degrades gracefully
 * with a clear message when the Web3Forms key is not configured. */
const form = document.getElementById('ct-form') as HTMLFormElement | null;
const status = document.getElementById('ct-status');
const btn = form?.querySelector('.ct-btn') as HTMLButtonElement | null;

function show(msg: string, kind: 'ok' | 'error' | 'info') {
  if (!status) return;
  status.textContent = msg;
  status.hidden = false;
  status.classList.remove('is-ok', 'is-error', 'is-info');
  status.classList.add(kind === 'ok' ? 'is-ok' : kind === 'error' ? 'is-error' : 'is-info');
}

const val = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() || '';
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = val('ct-name');
  const email = val('ct-email');
  const phone = val('ct-phone');
  const message = val('ct-message');

  if (!name || !email || !message) {
    show('Please fill in your name, email and message.', 'error');
    return;
  }
  if (!emailOk(email)) {
    show('Please enter a valid email address.', 'error');
    return;
  }

  if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }
  show('Sending, one moment.', 'info');
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.delivered) {
      show('Thank you. Your message has been sent, we will get back to you shortly.', 'ok');
      form.reset();
    } else if (res.ok && data.ok && data.delivered === false) {
      // endpoint reachable but email channel not configured yet
      show('Message form is not connected yet. Meanwhile, please email info@geneticanalyze.com or use WhatsApp.', 'info');
    } else {
      throw new Error('submit failed');
    }
  } catch {
    show('Something went wrong sending the message. Please email info@geneticanalyze.com directly.', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = ''; }
  }
});

export {};
