import type { APIRoute } from 'astro';

// Serverless: receives a contact message and forwards it to the manager by
// email (Web3Forms) to info@geneticanalyze.com. Key comes from env; degrades gracefully.
export const prerender = false;

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const env = (k: string): string | undefined =>
  (process.env?.[k] ?? (import.meta as any).env?.[k]) || undefined;

export const POST: APIRoute = async ({ request }) => {
  let p: ContactPayload;
  try {
    p = (await request.json()) as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid payload' }), { status: 400 });
  }

  if (!p.name?.trim() || !p.email?.trim() || !p.message?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), { status: 422 });
  }

  const access_key = env('WEB3FORMS_ACCESS_KEY');
  // Not configured yet: accept the message but tell the client it was not delivered,
  // so the UI can show a clear message instead of failing silently.
  if (!access_key) {
    return new Response(JSON.stringify({ ok: true, delivered: false, reason: 'not_configured' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = [
    'NEW CONTACT MESSAGE, Genetic Analyze',
    '',
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Phone: ${p.phone || '(none)'}`,
    '',
    'Message:',
    p.message,
  ].join('\n');

  let delivered = false;
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key,
        subject: `Contact message, ${p.name}`,
        from_name: 'Genetic Analyze website',
        replyto: p.email,
        to: env('ORDER_EMAIL_TO') || 'info@geneticanalyze.com',
        message: text,
      }),
    });
    delivered = res.ok;
  } catch {
    delivered = false;
  }

  return new Response(JSON.stringify({ ok: true, delivered }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
