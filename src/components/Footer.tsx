"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Tech";

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
};

const CONTACTS = [
  { icon: "phone", label: "Телефон", value: "+7 (3842) 00-00-00", href: "tel:+73842000000" },
  { icon: "mail", label: "Почта", value: "studio@obsidian-kemerovo.ru", href: "mailto:studio@obsidian-kemerovo.ru" },
  { icon: "pin", label: "Адрес", value: "Кемерово, пр. Кузнецкий, 100" },
  { icon: "clock", label: "Часы работы", value: "Ежедневно · 09:00 — 21:00" },
];

export function Footer() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.currentTarget.reset();
  }

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-white/5 bg-graphite">
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      {/* soft acid aura */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-acid/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        {/* Heading */}
        <Reveal>
          <SectionLabel index="06">Контакты</SectionLabel>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,5vw,3.8rem)] text-white-pure">
            Доверьте автомобиль <span className="text-acid">профессионалам</span>
          </h2>
        </Reveal>

        {/* Two cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* ---- Left: info card ---- */}
          <Reveal>
            <div className="neon-hover group flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-md md:p-8">
              <h3 className="display text-xl text-white-pure">Студия OBSIDIAN</h3>
              <p className="mt-2 text-sm text-muted">
                Приезжайте на консультацию — оценим состояние ЛКП бесплатно.
              </p>

              {/* contact list */}
              <ul className="mt-7 space-y-3">
                {CONTACTS.map((c) => {
                  const inner = (
                    <li className="group/item flex items-center gap-4 rounded-xl border border-transparent bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.05]">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-acid/20 bg-acid/10 text-acid shadow-[0_0_18px_-6px_rgba(198,241,53,0.5)]">
                        {ICONS[c.icon]}
                      </span>
                      <span className="min-w-0 leading-relaxed">
                        <span className="mb-1 block text-[0.7rem] uppercase leading-none tracking-[0.16em] text-muted-soft">
                          {c.label}
                        </span>
                        <span className="block truncate text-sm leading-none text-white-pure transition-colors group-hover/item:text-acid">
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
            <div className="neon-hover flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-md md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="display text-xl text-white-pure">Быстрая заявка</h3>
                <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-acid">15 MIN</span>
              </div>
              <p className="mt-2 text-sm text-muted">
                Оставьте контакты — перезвоним и подберём программу ухода.
              </p>

              <form onSubmit={onSubmit} className="mt-8 flex flex-1 flex-col">
                <div className="space-y-6">
                  <Field name="name" label="Ваше имя" />
                  <Field name="phone" label="Телефон" type="tel" />
                  <Field name="car" label="Марка и модель авто" />
                </div>

                <button
                  type="submit"
                  className="display group mt-9 flex w-full items-center justify-center gap-2 rounded-full bg-acid py-3.5 tracking-tight text-ink shadow-[0_0_20px_rgba(194,255,46,0.3)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(194,255,46,0.5)]"
                >
                  {sent ? "Заявка отправлена ✓" : "Отправить заявку"}
                  {!sent && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-muted-soft">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
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
            <span className="display text-3xl tracking-tight text-white-pure">
              OBSIDIAN<span className="text-acid">.</span>
            </span>
            <p className="mt-4 max-w-xs text-muted">
              Детейлинг-центр премиум-класса в Кемерово: керамика, полировка, оклейка
              плёнкой, химчистка и реставрация автомобилей.
            </p>
            <p className="mt-3 text-muted-soft">obsidian-kemerovo.ru</p>
          </div>

          {/* Реквизиты */}
          <div>
            <p className="mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-soft">
              Реквизиты
            </p>
            <p className="mt-5 text-white-pure">ИП Обсидиан О. О.</p>
            <p className="mt-2.5 text-muted">Детейлинг-центр премиум-класса · Кемерово</p>
            <p className="mt-2.5 text-muted">ОГРНИП 320420500123456 · ИНН 420512345678</p>
          </div>

          {/* Контакты + правовое */}
          <div className="lg:text-left">
            <a href="tel:+73842000000" className="block text-white-pure transition-colors hover:text-acid">
              +7 (3842) 00-00-00
            </a>
            <a href="mailto:studio@obsidian-kemerovo.ru" className="mt-2.5 block text-muted transition-colors hover:text-acid">
              studio@obsidian-kemerovo.ru
            </a>
            <a href="https://t.me/obsidian_kemerovo" className="mt-2.5 block text-muted transition-colors hover:text-acid">
              t.me/obsidian_kemerovo
            </a>
            <p className="mt-2.5 text-muted">г. Кемерово, пр. Кузнецкий, 100</p>

            <div className="mt-6 space-y-2">
              <a href="#" className="block text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-acid hover:decoration-acid/60">
                Политика обработки персональных данных
              </a>
              <a href="#" className="block text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-acid hover:decoration-acid/60">
                Публичная оферта
              </a>
            </div>

            <p className="mt-6 text-muted-soft">© {new Date().getFullYear()} OBSIDIAN</p>
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
