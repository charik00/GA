import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Serverless: receives a checkout order (no online payment, it is a request)
// and notifies the manager by email + Telegram, and emails the customer a
// branded confirmation. All secrets come from env, nothing is hardcoded:
//   RESEND_API_KEY, ORDER_EMAIL_TO, ORDER_EMAIL_FROM,
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
export const prerender = false;

interface OrderItem { name: string; kind: string; qty: number; price: number | null }
interface OrderPayload {
  customer: { name: string; phone: string; email: string; city?: string; address?: string; notes?: string };
  items: OrderItem[];
  subtotal: number | null;
  updates?: boolean;
}

const env = (k: string): string | undefined =>
  (process.env?.[k] ?? (import.meta as any).env?.[k]) || undefined;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const money = (n: number) => `${n.toLocaleString('en-US')} ₪`;
const lineTotal = (i: OrderItem) => (i.price != null ? money(i.price * i.qty) : 'On request');

function nowStamp(): string {
  try {
    return new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem', hour12: false }) + ' (Israel time)';
  } catch {
    return new Date().toISOString();
  }
}

/* ---------- plain text (manager email fallback + Telegram) ---------- */
function orderText(o: OrderPayload): string {
  const c = o.customer;
  return [
    'NEW ORDER, Genetic Analyze',
    nowStamp(),
    '',
    'Items:',
    ...o.items.map((i) => `- ${i.name} (${i.kind}) x${i.qty}, ${i.price != null ? money(i.price * i.qty) : 'price on request'}`),
    '',
    o.subtotal != null ? `Subtotal: ${money(o.subtotal)}` : 'Subtotal: price on request',
    '',
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    `Email: ${c.email}`,
    `City: ${c.city || '(not provided)'}`,
    `Address: ${c.address || '(not provided)'}`,
    `Notes: ${c.notes || '(none)'}`,
    `Consent (Privacy Policy): yes`,
    `Send me updates: ${o.updates ? 'yes' : 'no'}`,
  ].join('\n');
}

/* ---------- shared order rows for HTML emails ---------- */
function rowsHtml(o: OrderPayload): string {
  return o.items
    .map(
      (i) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #E5DFD5;color:#2A2A2A;font-size:15px">${esc(i.name)}
          <span style="color:#8A857A;font-size:13px"> &middot; ${esc(i.kind)} &middot; Qty ${i.qty}</span></td>
        <td style="padding:10px 0;border-bottom:1px solid #E5DFD5;color:#2A2A2A;font-size:15px;text-align:right;white-space:nowrap">${lineTotal(i)}</td>
      </tr>`
    )
    .join('');
}
const subtotalRow = (o: OrderPayload) =>
  `<tr><td style="padding:14px 0 0;font-size:15px;color:#3E3E3E;font-weight:600">Subtotal</td>
   <td style="padding:14px 0 0;font-size:15px;color:#3E3E3E;font-weight:600;text-align:right">${o.subtotal != null ? money(o.subtotal) : 'On request'}</td></tr>`;

/* ---------- manager notification email ---------- */
function managerHtml(o: OrderPayload): string {
  const c = o.customer;
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#8A857A;font-size:13px;white-space:nowrap">${k}</td><td style="padding:4px 0;color:#2A2A2A;font-size:14px">${esc(v)}</td></tr>`;
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#2A2A2A">
    <h2 style="font-size:18px;color:#1A1A1A;margin:0 0 4px">New order, Genetic Analyze</h2>
    <p style="color:#8A857A;font-size:13px;margin:0 0 18px">${nowStamp()}</p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 18px">${rowsHtml(o)}${subtotalRow(o)}</table>
    <table style="border-collapse:collapse">
      ${row('Name', c.name)}${row('Phone', c.phone)}${row('Email', c.email)}
      ${row('City', c.city || '(not provided)')}${row('Address', c.address || '(not provided)')}
      ${row('Notes', c.notes || '(none)')}
      ${row('Consent', 'yes (Privacy Policy)')}${row('Send updates', o.updates ? 'yes' : 'no')}
    </table>
  </div>`;
}

/* ---------- branded customer confirmation email ---------- */
function customerHtml(o: OrderPayload): string {
  return `<div style="background:#FAF7F2;padding:0;margin:0">
  <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;background:#FAF7F2">
    <div style="background:#232323;padding:28px 32px;text-align:center">
      <div style="color:#C9A96E;font-size:24px;letter-spacing:0.04em">Genetic Analyze</div>
      <div style="color:#9a958c;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin-top:6px">Whole-plant formulas</div>
    </div>
    <div style="padding:34px 32px 8px">
      <h1 style="font-size:26px;color:#1A1A1A;font-weight:normal;margin:0 0 12px">Thank you for your order</h1>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#3E3E3E;margin:0 0 24px">
        Dear ${esc(o.customer.name)}, we have received your order and are glad to have you with us.
        There is no online payment, our manager will reach out personally to take care of the rest.
      </p>
      <table style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;margin:0 0 28px">
        ${rowsHtml(o)}${subtotalRow(o)}
      </table>
      <div style="background:#F2EDE4;border-radius:10px;padding:22px 24px;margin:0 0 26px">
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8A857A;margin:0 0 14px">What happens next</p>
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#3E3E3E;margin:0">
          1. Our manager will contact you to confirm the details.<br/>
          2. Payment and delivery are arranged together, at your convenience.<br/>
          3. Your formulas are prepared and sent on their way.
        </p>
      </div>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#3E3E3E;margin:0 0 4px">
        Any questions in the meantime? Simply reply to this email or reach us at
        <a href="mailto:ok@drkaholi.com" style="color:#C8862F">ok@drkaholi.com</a>.
      </p>
    </div>
    <div style="padding:22px 32px 30px;border-top:1px solid #E5DFD5;text-align:center">
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A857A;margin:0">
        Genetic Analyze &middot; Israel<br/>These statements have not been evaluated by any regulatory authority.
      </p>
    </div>
  </div>
</div>`;
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = env('TELEGRAM_BOT_TOKEN');
  const chat_id = env('TELEGRAM_CHAT_ID');
  if (!token || !chat_id) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text }),
  });
  return res.ok;
}

export const POST: APIRoute = async ({ request }) => {
  let order: OrderPayload;
  try {
    order = (await request.json()) as OrderPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid payload' }), { status: 400 });
  }

  // Required: name, phone, email and at least one item. City/Address/Notes optional.
  const c = order.customer || ({} as OrderPayload['customer']);
  if (!c.name || !c.phone || !c.email || !order.items?.length) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), { status: 422 });
  }

  const text = orderText(order);
  const apiKey = env('RESEND_API_KEY');
  const from = env('ORDER_EMAIL_FROM');
  const to = env('ORDER_EMAIL_TO');

  let managerEmail = false;
  let customerEmail = false;

  if (apiKey && from) {
    const resend = new Resend(apiKey);
    // manager notification
    if (to) {
      try {
        const { error } = await resend.emails.send({
          from,
          to,
          replyTo: c.email,
          subject: `New order, ${c.name}`,
          html: managerHtml(order),
          text,
        });
        managerEmail = !error;
      } catch { managerEmail = false; }
    }
    // customer confirmation
    try {
      const { error } = await resend.emails.send({
        from,
        to: c.email,
        subject: 'Thank you for your order, Genetic Analyze',
        html: customerHtml(order),
      });
      customerEmail = !error;
    } catch { customerEmail = false; }
  }

  const telegram = await sendTelegram(text).catch(() => false);

  // The order is always accepted (it is a lead, never drop it). delivered flags
  // surface which channels actually fired, useful before env keys are set.
  return new Response(JSON.stringify({ ok: true, delivered: { managerEmail, customerEmail, telegram } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
