"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";
import { MagneticButton } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/seo";

/* ---------- inline neon icons ---------- */
const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, ReactNode> = {
  phone: (
    <svg {...iconProps}>
      <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  mail: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  pin: (
    <svg {...iconProps}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  clock: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  whatsapp: (
    <svg {...iconProps}>
      <path d="M5.2 19.2 6.4 16A7 7 0 1 1 9 18.5l-3.8.7Z" />
      <path d="M9 9.4c.4 2 1.8 3.4 3.8 4.1l1.1-1.1 1.7.8c.2.1.3.3.3.5-.1.8-.7 1.4-1.5 1.4-3.2-.1-6.1-2.9-6.2-6.1 0-.8.6-1.4 1.4-1.5.2 0 .4.1.5.3l.8 1.7L9 9.4Z" />
    </svg>
  ),
};

const CONTACTS = [
  { icon: "phone", label: "Телефон", value: SITE.phone, href: SITE.phoneHref },
  { icon: "mail", label: "Почта", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: "whatsapp", label: "WhatsApp", value: SITE.phone, href: SITE.whatsappHref },
  { icon: "pin", label: "Адрес", value: SITE.fullAddress },
  { icon: "clock", label: "Часы работы", value: "Ежедневно · 09:00 — 21:00" },
];

export function Footer() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          car: formData.get("car"),
        }),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "Telegram request failed");
      }

      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-white/5 bg-graphite">
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      {/* soft brand-blue aura */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-blue/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        {/* Heading */}
        <Reveal>
          <SectionLabel index="06">Контакты</SectionLabel>
          <h2 className="display section-title mt-5 max-w-3xl text-white-pure">
            Запишитесь на детейлинг <span className="text-acid">в Кемерово</span>
          </h2>
        </Reveal>

        {/* Two cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* ---- Left: info card ---- */}
          <Reveal>
            <div className="neon-hover group flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-md sm:p-6 md:p-8">
              <h3 className="display text-xl text-white-pure">Студия «Автореконструкция»</h3>
              <p className="mt-2 text-sm text-muted">
                Приезжайте на диагностику — оценим ЛКП, салон и зоны риска бесплатно.
              </p>

              {/* contact list */}
              <ul className="mt-7 space-y-3">
                {CONTACTS.map((c) => {
                  const inner = (
                    <li className="group/item flex items-center gap-4 rounded-xl border border-transparent bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.05]">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-acid/20 bg-acid/10 text-acid shadow-[0_0_18px_-6px_rgba(236,20,44,0.5)]">
                        {ICONS[c.icon]}
                      </span>
                      <span className="min-w-0 leading-relaxed">
                        <span className="mb-1 block text-[0.7rem] uppercase leading-none tracking-[0.16em] text-muted-soft">
                          {c.label}
                        </span>
                        <span className="block break-words text-sm leading-tight text-white-pure transition-colors group-hover/item:text-acid">
                          {c.value}
                        </span>
                      </span>
                    </li>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    <div key={c.label}>{inner}</div>
                  );
                })}
              </ul>

              {/* embedded rounded map */}
              <div className="mt-7 overflow-hidden rounded-xl border border-white/10">
                <iframe
                  title="Карта"
                  className="h-44 w-full grayscale invert-[0.92] contrast-[0.9]"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=86.02%2C55.33%2C86.16%2C55.38&layer=mapnik"
                />
              </div>
            </div>
          </Reveal>

          {/* ---- Right: compact form card ---- */}
          <Reveal delay={0.1}>
            <div className="neon-hover flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/40 p-5 backdrop-blur-md sm:p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="display text-xl text-white-pure">Быстрая заявка</h3>
                <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-acid">15 MIN</span>
              </div>
              <p className="mt-2 text-sm text-muted">
                Оставьте контакты — перезвоним, уточним задачу и рассчитаем цену работ.
              </p>

              <form onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col">
                <div className="space-y-6">
                  <Field name="name" label="Ваше имя" />
                  <Field name="phone" label="Телефон" type="tel" />
                  <Field name="car" label="Марка и модель авто" />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={status === "sending"}
                  className="display adaptive-cta group mt-9 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white-pure"
                  strength={0.12}
                >
                  {status === "sending"
                    ? "Отправляем..."
                    : status === "sent"
                      ? "Заявка отправлена ✓"
                      : "Отправить заявку"}
                  {status === "idle" && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  )}
                </MagneticButton>
                <p
                  aria-live="polite"
                  className={`mt-4 text-center text-xs ${
                    status === "error" ? "text-acid" : "text-muted-soft"
                  }`}
                >
                  {status === "error"
                    ? errorMessage
                      ? `Не удалось отправить: ${errorMessage}`
                      : "Не удалось отправить заявку. Позвоните нам или попробуйте еще раз."
                    : "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности."}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom footer — 3 columns */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 text-sm md:px-8 lg:grid-cols-3 lg:gap-8">
          {/* Brand */}
          <div>
            <span className="display text-3xl text-white-pure">
              {SITE.shortName}
              {/* <span className="text-acid">.</span> */}
            </span>
            <p className="mt-4 max-w-xs text-muted">
              Детейлинг-центр премиум-класса в Кемерово: керамика, полировка, оклейка плёнкой,
              химчистка и реставрация автомобилей.
            </p>
            <p className="mt-3 text-muted-soft">{SITE.domain}</p>
          </div>

          {/* Реквизиты */}
          <div>
            <p className="mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-soft">
              Реквизиты
            </p>
            <p className="mt-5 text-white-pure">Студия «Автореконструкция»</p>
            <p className="mt-2.5 text-muted">Детейлинг и кузовной ремонт · Кемерово</p>
            <p className="mt-2.5 text-muted">{SITE.district} · {SITE.street}</p>
          </div>

          {/* Контакты + правовое */}
          <div className="lg:text-left">
            <a href={SITE.phoneHref} className="block text-white-pure transition-colors hover:text-acid">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2.5 block text-muted transition-colors hover:text-acid">
              {SITE.email}
            </a>
            <a href={SITE.whatsappHref} className="mt-2.5 block text-muted transition-colors hover:text-acid">
              WhatsApp · {SITE.phone}
            </a>
            <p className="mt-2.5 text-muted">{SITE.fullAddress}</p>

            <div className="mt-6 space-y-2">
              <a href="#" className="block text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-acid hover:decoration-acid/60">
                Политика обработки персональных данных
              </a>
              <a href="#" className="block text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-acid hover:decoration-acid/60">
                Публичная оферта
              </a>
            </div>

            <p className="mt-6 text-muted-soft">© {new Date().getFullYear()} {SITE.shortName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Underline-style input — light, airy, no "black hole" */
function Field({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <label className="group block">
      <span className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted-soft transition-colors group-focus-within:text-acid">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        className="w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white-pure outline-none transition-colors placeholder:text-muted-soft focus:border-acid"
      />
    </label>
  );
}
