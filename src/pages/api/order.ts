import type { APIRoute } from 'astro';

// Serverless: receives a checkout order and forwards it to the manager by
// email (Web3Forms) AND Telegram. No online payment. Secrets come from env.
export const prerender = false;

interface OrderItem { name: string; kind: string; qty: number; price: number | null }
interface OrderPayload {
  customer: { name: string; phone: string; email: string; city: string; address: string; notes?: string };
  items: OrderItem[];
  subtotal: number | null;
  updates?: boolean;
}

const env = (k: string): string | undefined =>
  (process.env?.[k] ?? (import.meta as any).env?.[k]) || undefined;

function formatOrder(o: OrderPayload): string {
  const lines = o.items.map(
    (i) => `• ${i.name} (${i.kind}) ×${i.qty}` + (i.price != null ? `, ${i.price * i.qty} ₪` : ', price on request')
  );
  const c = o.customer;
  return [
    'NEW ORDER, Genetic Analyze',
    '',
    'Items:',
    ...lines,
    '',
    o.subtotal != null ? `Subtotal: ${o.subtotal} ₪` : 'Subtotal: price on request',
    '',
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    `Email: ${c.email}`,
    `City: ${c.city}`,
    `Address: ${c.address}`,
    c.notes ? `Notes: ${c.notes}` : 'Notes: (none)',
    `Marketing opt-in: ${o.updates ? 'yes' : 'no'}`,
  ].join('\n');
}

async function sendEmail(o: OrderPayload, text: string): Promise<boolean> {
  const access_key = env('WEB3FORMS_ACCESS_KEY');
  if (!access_key) return false;
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key,
      subject: `New order, ${o.customer.name}`,
      from_name: 'Genetic Analyze website',
      replyto: o.customer.email,
      to: env('ORDER_EMAIL_TO') || 'ok@drkaholi.com',
      message: text,
    }),
  });
  return res.ok;
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

  const c = order.customer || ({} as OrderPayload['customer']);
  if (!c.name || !c.phone || !c.email || !c.city || !c.address || !order.items?.length) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), { status: 422 });
  }

  const text = formatOrder(order);
  const [email, telegram] = await Promise.all([
    sendEmail(order, text).catch(() => false),
    sendTelegram(text).catch(() => false),
  ]);

  // The order is accepted even if delivery channels are not configured yet
  // (client still needs to supply the keys). delivered flags surface that.
  return new Response(JSON.stringify({ ok: true, delivered: { email, telegram } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
