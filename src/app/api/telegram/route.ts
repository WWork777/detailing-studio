import { NextResponse } from "next/server";

const TELEGRAM_API_TIMEOUT_MS = 10_000;

type LeadPayload = {
  name?: string;
  phone?: string;
  car?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 300) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMessage({ name, phone, car }: Required<LeadPayload>) {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Авто:</b> ${escapeHtml(car)}`,
  ];

  return lines.join("\n");
}

function readTelegramError(text: string) {
  if (!text) return "";

  try {
    const data = JSON.parse(text) as { description?: unknown; error_code?: unknown };
    const description = typeof data.description === "string" ? data.description : "";
    const errorCode = typeof data.error_code === "number" ? data.error_code : "";
    return [errorCode, description].filter(Boolean).join(": ");
  } catch {
    return text.slice(0, 180);
  }
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const proxyUrl = process.env.TELEGRAM_PROXY_URL;

  if (!token || !chatId || !proxyUrl) {
    return NextResponse.json(
      { ok: false, message: "Telegram settings are not configured" },
      { status: 500 },
    );
  }

  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }

  const lead = {
    name: clean(payload.name),
    phone: clean(payload.phone),
    car: clean(payload.car),
  };

  if (!lead.name || !lead.phone || !lead.car) {
    return NextResponse.json({ ok: false, message: "Заполните все поля" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_API_TIMEOUT_MS);
  const body = new URLSearchParams({
    chat_id: chatId,
    text: buildMessage(lead),
    parse_mode: "HTML",
    disable_web_page_preview: "true",
  });

  try {
    const telegramResponse = await fetch(
      `${proxyUrl.replace(/\/$/, "")}/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        signal: controller.signal,
      },
    );

    if (!telegramResponse.ok) {
      const telegramError = readTelegramError(await telegramResponse.text());
      console.error("Telegram lead request failed", {
        status: telegramResponse.status,
        statusText: telegramResponse.statusText,
        error: telegramError,
      });

      return NextResponse.json(
        {
          ok: false,
          message: telegramError || "Telegram request failed",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Telegram request failed";
    console.error("Telegram lead request failed", { error: message });
    return NextResponse.json({ ok: false, message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
