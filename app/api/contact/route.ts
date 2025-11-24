import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  phone?: string;
  message?: string;
};

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram env vars are missing');
    return NextResponse.json({ error: 'Misconfigured server' }, { status: 500 });
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, phone, message } = body;

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const text = [
    '<b>Новая заявка</b>',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Сообщение:`,
    message,
  ].join('\n');

  const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!telegramResponse.ok) {
    const errorText = await telegramResponse.text();
    console.error('Telegram API error', errorText);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

