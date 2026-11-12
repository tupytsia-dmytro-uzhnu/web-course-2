// ===== Дані варіанта 10: каталог смартфонів =====
// const забороняє лише перепризначити саму змінну phones, а не змінити вміст масиву,
// тому метод push, що додає елемент у той самий масив, працює без помилок.
const phones = [
  {
    id: 1,
    model: "Galaxy S24",
    brand: "Samsung",
    segment: "флагман",
    year: 2024,
    battery: 4000,
    camera: { mainMp: 50, ultraWideMp: 12, teleMp: 10, video: "8K" },
    sensors: ["акселерометр", "гіроскоп", "датчик наближення", "сканер відбитка", "барометр"],
    features: ["5G", "NFC", "IP68", "бездротова зарядка"]
  },
  {
    id: 2,
    model: "Galaxy A55",
    brand: "Samsung",
    segment: "середній клас",
    year: 2024,
    battery: 5000,
    camera: { mainMp: 50, ultraWideMp: 12, teleMp: 0, video: "Full HD" },
    sensors: ["акселерометр", "гіроскоп", "датчик наближення", "сканер відбитка"],
    features: ["5G", "NFC", "IP67"]
  },
  {
    id: 3,
    model: "iPhone 15",
    brand: "Apple",
    segment: "преміум",
    year: 2023,
    battery: 3349,
    camera: { mainMp: 48, ultraWideMp: 12, teleMp: 0, video: "4K" },
    sensors: ["акселерометр", "гіроскоп", "барометр", "датчик освітленості", "компас"],
    features: ["5G", "NFC", "IP68", "бездротова зарядка"]
  },
  {
    id: 4,
    model: "Redmi Note 12",
    brand: "Xiaomi",
    segment: "бюджетний",
    year: 2023,
    battery: 5000,
    camera: { mainMp: 48, ultraWideMp: 8, teleMp: 0, video: "Full HD" },
    sensors: ["акселерометр", "гіроскоп", "сканер відбитка", "інфрачервоний порт"],
    features: ["NFC", "швидка зарядка"]
  },
  {
    id: 5,
    model: "Pixel 7",
    brand: "Google",
    segment: "преміум",
    year: 2022,
    battery: 4355,
    camera: { mainMp: 50, ultraWideMp: 12, teleMp: 0, video: "4K" },
    sensors: ["акселерометр", "гіроскоп", "барометр", "сканер відбитка", "датчик освітленості"],
    features: ["5G", "NFC", "IP68", "бездротова зарядка"]
  },
  {
    id: 6,
    model: "Galaxy Z Flip5",
    brand: "Samsung",
    segment: "складаний",
    year: 2023,
    battery: 3700,
    camera: { mainMp: 12, ultraWideMp: 12, teleMp: 0, video: "4K" },
    sensors: ["акселерометр", "гіроскоп", "датчик Холла", "сканер відбитка"],
    features: ["5G", "NFC", "IPX8", "бездротова зарядка"]
  }
];

// ===== Допоміжні функції =====

// Приймає id елемента та значення (рядок або масив рядків), записує текст у елемент.
// Нічого не повертає. Єдина функція, що торкається сторінки.
const show = (id, value) => {
  const box = document.getElementById(id);
  if (box === null) {
    console.error("Немає елемента з id:", id);
    return;
  }
  box.textContent = Array.isArray(value) ? value.join("\n") : value;
};

// Приймає масив записів, повертає рядок: список моделей або текст «нічого не знайдено».
const listOrEmpty = (items) =>
  items.length === 0
    ? "  нічого не знайдено"
    : items.map((p) => `  • ${p.model}`).join("\n");

// ===== Функції обробки =====

// Приймає масив смартфонів, повертає масив рядків виду «1. Модель — Бренд, рік (камера, акумулятор)».
function numberedList(items) {
  const lines = [];
  for (let i = 0; i < items.length; i++) {
    const p = items[i];
    lines.push(`${i + 1}. ${p.model} — ${p.brand}, ${p.year} (основна камера ${p.camera.mainMp} Мп, акумулятор ${p.battery} мАг)`);
  }
  return lines;
}

// Приймає смартфон, повертає назву узагальненої групи за його сегментом (тільки switch).
function categoryOf(phone) {
  switch (phone.segment) {
    case "флагман":
    case "преміум":
      return "Топовий сегмент";
    case "середній клас":
      return "Середній сегмент";
    case "бюджетний":
      return "Доступний сегмент";
    default:
      return "Інші сегменти";
  }
}

// Приймає масив і сегмент, повертає масив записів, у яких segment строго дорівнює value.
const filterBySegment = (items, value) => items.filter((p) => p.segment === value);

// Приймає масив і мінімальний рік, повертає масив моделей цього року й новіших.
const filterByYearFrom = (items, minYear) => items.filter((p) => p.year >= minYear);

// Приймає масив і назву функції, повертає масив моделей, які її підтримують.
const filterByFeature = (items, feature) => items.filter((p) => p.features.includes(feature));

// Приймає масив, повертає масив моделей із найбільшою основною камерою (reduce шукає максимум, filter збирає всі рівні).
const modelsWithBiggestCamera = (items) => {
  const biggest = items.reduce((max, p) => (p.camera.mainMp > max ? p.camera.mainMp : max), 0);
  return items.filter((p) => p.camera.mainMp === biggest);
};

// Приймає масив, повертає масив усіх унікальних датчиків (flatMap розгортає масиви, Set прибирає повтори).
const uniqueSensors = (items) => [...new Set(items.flatMap((p) => p.sensors))];

// Приймає масив, повертає НОВИЙ масив за зростанням акумулятора; оригінал не змінюється.
const sortByBattery = (items) => [...items].sort((a, b) => a.battery - b.battery);

// Приймає масив, повертає НОВИЙ масив за назвою моделі в українській абетці.
const sortByModel = (items) => [...items].sort((a, b) => a.model.localeCompare(b.model, "uk"));

// Приймає масив смартфонів, повертає ОБ'ЄКТ статистики за акумулятором: count, total, average, max, categories.
const statsForPhones = (items) => {
  // Початкове значення 0 — стартова сума. Без нього reduce взяв би за накопичувач перший ОБ'ЄКТ
  // і додавав би до нього числа, тож замість суми вийшов би рядок «[object Object]5000…».
  const total = items.reduce((sum, p) => sum + p.battery, 0);
  const max = items.reduce((best, p) => (p.battery > best.battery ? p : best), items[0]);
  return {
    count: items.length,
    total,
    average: (total / items.length).toFixed(1),
    max,
    categories: new Set(items.map((p) => p.segment)).size
  };
};

// ===== Вивід на сторінку (блок викликів show) =====
show("out-count", `Моделей у каталозі: ${phones.length}`);
show("out-numbered", numberedList(phones));
show("out-categories", phones.map((p) => `${p.model} → ${categoryOf(p)}`));
const flagships = filterBySegment(phones, "флагман");
const fromYear = filterByYearFrom(phones, 2023);
const withWireless = filterByFeature(phones, "бездротова зарядка");
const withUwb = filterByFeature(phones, "UWB");
const biggestCamera = modelsWithBiggestCamera(phones);
show("out-filter", [
  `Сегмент «флагман»: знайдено ${flagships.length}`,
  listOrEmpty(flagships),
  `Від 2023 року: знайдено ${fromYear.length}`,
  listOrEmpty(fromYear),
  `З бездротовою зарядкою: знайдено ${withWireless.length}`,
  listOrEmpty(withWireless),
  `З функцією UWB: знайдено ${withUwb.length}`,
  listOrEmpty(withUwb),
  `Найбільша основна камера (${biggestCamera[0].camera.mainMp} Мп): ${biggestCamera.map((p) => p.model).join(", ")}`
]);
const byBattery = sortByBattery(phones);
const byModel = sortByModel(phones);
show("out-sorted", [
  "За акумулятором (від меншого до більшого):",
  byBattery.map((p) => `  ${p.model} — ${p.battery} мАг`).join("\n"),
  "За назвою (українська абетка):",
  byModel.map((p) => `  ${p.model}`).join("\n"),
  "Вихідний порядок (масив не змінено):",
  phones.map((p) => `  ${p.model}`).join("\n")
]);
const stats = statsForPhones(phones);
const sensors = uniqueSensors(phones);
show("out-stats", [
  `Усього моделей: ${stats.count}`,
  `Сума ємностей акумуляторів: ${stats.total} мАг`,
  `Середня ємність: ${stats.average} мАг`,
  `Найбільший акумулятор: ${stats.max.model} (${stats.max.battery} мАг)`,
  `Різних сегментів: ${stats.categories}`,
  `Унікальні датчики (${sensors.length}): ${sensors.join(", ")}`
]);
