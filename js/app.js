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

// ===== Вивід на сторінку (блок викликів show) =====
show("out-count", `Моделей у каталозі: ${phones.length}`);
show("out-numbered", numberedList(phones));
