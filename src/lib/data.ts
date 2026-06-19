export type Slide = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  image: string;
};

export const SLIDES: Slide[] = [
  {
    id: "ceramic",
    index: "01",
    title: "ЗЕРКАЛЬНАЯ ГЛУБИНА",
    subtitle:
      "Многослойная керамическая защита, раскрывающая истинный цвет кузова.",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "restore",
    index: "02",
    title: "ВТОРОЕ РОЖДЕНИЕ",
    subtitle:
      "Полная реставрация лакокрасочного покрытия и кузовных элементов.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "ppf",
    index: "03",
    title: "НЕВИДИМАЯ БРОНЯ",
    subtitle: "Полиуретановая плёнка, которая защищает и самовосстанавливается.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=2400&q=80",
  },
];

export type Stat = { value: number; suffix: string; label: string };

export const STATS: Stat[] = [
  { value: 12, suffix: " лет", label: "В индустрии детейлинга" },
  { value: 4200, suffix: "+", label: "Защищённых автомобилей" },
  { value: 9, suffix: " лет", label: "Гарантия на керамику" },
  { value: 100, suffix: "%", label: "Ручная работа мастеров" },
];

import type { IconKey } from "@/components/ui/Icons";

export type Service = {
  id: string;
  code: string;
  icon: IconKey;
  title: string;
  desc: string;
  specs: string[];
  tag: string;
};

export const SERVICES: Service[] = [
  {
    id: "detailing",
    code: "SRV-01",
    icon: "detailing",
    title: "Детейлинг кузова",
    desc: "Многоэтапная полировка, удаление голограмм и подготовка ЛКП к защите.",
    specs: ["3 этапа коррекции", "Замер толщиномером", "Чистый бокс"],
    tag: "Flagship",
  },
  {
    id: "ceramic",
    code: "SRV-02",
    icon: "ceramic",
    title: "Керамическое покрытие",
    desc: "Защита на молекулярном уровне с устойчивым гидрофобным эффектом.",
    specs: ["Твёрдость 9H", "Гарантия 9 лет", "Эффект «лотоса»"],
    tag: "9H Coating",
  },
  {
    id: "ppf",
    code: "SRV-03",
    icon: "ppf",
    title: "Оклейка плёнками",
    desc: "Антигравийная полиуретановая и виниловая плёнка любой сложности.",
    specs: ["Self-healing", "Без швов", "Под лекало"],
    tag: "PPF / Vinyl",
  },
  {
    id: "restoration",
    code: "SRV-04",
    icon: "restoration",
    title: "Реставрация",
    desc: "Возвращение фарам, коже и хромированным элементам первоначального вида.",
    specs: ["Полировка фар", "Реставрация кожи", "Хром / пластик"],
    tag: "Restore",
  },
  {
    id: "interior",
    code: "SRV-05",
    icon: "interior",
    title: "Детейлинг интерьера",
    desc: "Глубокая химчистка, защита кожи и восстановление салона до состояния new.",
    specs: ["Озонирование", "Защита кожи", "Химчистка"],
    tag: "Interior",
  },
  {
    id: "presale",
    code: "SRV-06",
    icon: "presale",
    title: "Предпродажная подготовка",
    desc: "Комплексный пакет работ, повышающий ликвидность и цену автомобиля.",
    specs: ["Экспресс-полировка", "Чистка ДВС", "Фото-сет"],
    tag: "Pre-sale",
  },
];

export type ProcessStep = {
  num: string;
  title: string;
  desc: string;
  marker: string;
};

export const PROCESS: ProcessStep[] = [
  {
    num: "01",
    title: "Диагностика ЛКП",
    desc: "Замер толщины покрытия по 40 точкам, дефектовка под спектральной лампой.",
    marker: "STAGE / DIAGNOSTIC",
  },
  {
    num: "02",
    title: "Подготовка и очистка",
    desc: "Бесконтактная мойка, глиняная обработка, обезжиривание поверхности.",
    marker: "STAGE / PREP",
  },
  {
    num: "03",
    title: "Нанесение защиты",
    desc: "Коррекция лака и нанесение керамики или плёнки в условиях чистого бокса.",
    marker: "STAGE / PROTECT",
  },
  {
    num: "04",
    title: "Контроль качества",
    desc: "Финальная проверка под лампами 5000K и выдача акта выполненных работ.",
    marker: "STAGE / QC",
  },
];

export type Advantage = {
  icon: IconKey;
  title: string;
  desc: string;
  code: string;
};

export const ADVANTAGES: Advantage[] = [
  {
    icon: "light",
    code: "ADV-01",
    title: "Свет 5000K в боксах",
    desc: "Спектральное освещение выявляет любые микродефекты ЛКП ещё до начала работ.",
  },
  {
    icon: "cert",
    code: "ADV-02",
    title: "Сертифицированные мастера",
    desc: "Команда с официальными сертификатами производителей защитных составов.",
  },
  {
    icon: "shield",
    code: "ADV-03",
    title: "Гарантия по договору",
    desc: "Юридически закреплённая гарантия до 9 лет на каждое выполненное покрытие.",
  },
  {
    icon: "lock",
    code: "ADV-04",
    title: "Закрытая территория",
    desc: "Охраняемый отапливаемый бокс с видеонаблюдением 24/7. Авто под защитой.",
  },
];

export type Case = {
  id: string;
  title: string;
  meta: string;
  before: string;
  after: string;
};

export const CASES: Case[] = [
  {
    id: "case-1",
    title: "Porsche 911 — Coating Restoration",
    meta: "Полировка в 3 этапа · Керамика 9H",
    before:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=30&sat=-100",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  },
];
