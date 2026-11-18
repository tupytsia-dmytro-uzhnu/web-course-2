// ===== Дані варіанта 10: каталог смартфонів =====
// Дані набрано вручну зі спрощеного variant10.json; у LR10 вони переїдуть у зовнішній файл
// data.json і завантажуватимуться через fetch.
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
    sku: "SKU-PH-11450",
    img: "images/galaxy-s24.jpg",
    description: "Флагман Samsung із потужним процесором, чудовою камерою та яскравим екраном AMOLED. Підтримує 5G, NFC і захист IP68, а акумулятор витримує весь день активної роботи.",
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
    sku: "SKU-PH-11451",
    img: "images/galaxy-a55.jpg",
    description: "Доступна модель із великим екраном і ємною батареєю.",
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
    sku: "SKU-PH-11452",
    img: "images/iPhone-15.jpg",
    description: "Смартфон Apple з камерою 48 Мп і зарядкою через USB-C.",
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
    sku: "SKU-PH-11453",
    img: "images/xiaomi-redmi-note-12.jpg",
    description: "Бюджетна новинка Xiaomi з екраном AMOLED.",
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
    sku: "SKU-PH-11454",
    img: "images/images.jpeg",
    description: "Смартфон Google з обчислювальною фотографією та чистим Android.",
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
    sku: "SKU-PH-11455",
    img: "images/samsung-galaxy-s23.jpg",
    description: "Складаний смартфон Samsung із зовнішнім екраном для швидких дій і компактним корпусом.",
    camera: { mainMp: 12, ultraWideMp: 12, teleMp: 0, video: "4K" },
    sensors: ["акселерометр", "гіроскоп", "датчик Холла", "сканер відбитка"],
    features: ["5G", "NFC", "IPX8", "бездротова зарядка"]
  },
  {
    id: 7,
    model: "iPhone 14",
    brand: "Apple",
    segment: "преміум",
    year: 2022,
    battery: 3279,
    sku: "SKU-PH-11456",
    img: "images/images.jpeg",
    description: "Надійний смартфон Apple з режимом Cinematic.",
    camera: { mainMp: 12, ultraWideMp: 12, teleMp: 0, video: "4K" },
    sensors: ["акселерометр", "гіроскоп", "барометр", "датчик освітленості"],
    features: ["5G", "NFC", "IP68", "бездротова зарядка"]
  },
  {
    id: 8,
    model: "Xiaomi 13",
    brand: "Xiaomi",
    segment: "флагман",
    year: 2023,
    battery: 4500,
    sku: "SKU-PH-11457",
    img: "images/xiaomi-redmi-note-12.jpg",
    description: "Флагман Xiaomi з камерою Leica, швидкою зарядкою та яскравим екраном AMOLED, що добре видно навіть на сонці.",
    camera: { mainMp: 50, ultraWideMp: 12, teleMp: 10, video: "8K" },
    sensors: ["акселерометр", "гіроскоп", "сканер відбитка", "інфрачервоний порт", "барометр"],
    features: ["5G", "NFC", "швидка зарядка", "бездротова зарядка"]
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

// ===== LR9: створення елементів і рендер карток =====

// Приймає тег, клас і (необов'язково) текст, повертає новий елемент; текст кладе тільки через textContent.
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// Приймає масив смартфонів і малює з нього картки в контейнері #cards; попередній вміст контейнера видаляється.
function renderCards(list) {
  const container = document.getElementById("cards");
  container.replaceChildren();
  for (const item of list) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = item.id;

    // Клас бейджа залежить від даних: нові моделі — акцентний, старші — приглушений (модифікатор --old)
    const isNew = item.year >= 2023;
    const badge = el("span", isNew ? "badge" : "badge badge--old", isNew ? "Новинка" : "Раніше");

    // У img дані йдуть у src і alt, а не в розмітку
    const img = el("img", "card__img");
    img.src = item.img;
    img.alt = `Смартфон ${item.brand} ${item.model}`;

    const title = el("h3", "", item.model);
    title.title = item.model;
    const body = el("div", "card-body");
    body.append(
      title,
      el("p", "card-brand", item.brand),
      el("p", "", `Рік: ${item.year}`),
      el("p", "card-sku", item.sku),
      el("p", "card-desc", item.description)
    );

    const action = el("a", "card__action", "Детальніше");
    action.href = "#";
    const actions = el("div", "card__actions");
    actions.append(action);

    card.append(badge, img, body, actions);
    container.append(card);
  }
}

// Малює всі смартфони при завантаженні каталогу (на інших сторінках контейнера немає).
function initCatalog() {
  if (document.getElementById("cards") === null) return;
  renderCards(phones);
}

// ===== LR9: пошук і фільтри =====

// Читає пошук, сегмент, NFC і бренди з бічної панелі, будує відфільтрований масив (з функціями LR8),
// перемальовує картки й керує блоком «Нічого не знайдено».
function applyFilters() {
  const query = document.getElementById("q").value.trim().toLowerCase();
  const segment = document.getElementById("filter").value;
  const onlyNfc = document.getElementById("nfc").checked;
  const brands = [...document.querySelectorAll(".layout__aside input:checked")].map((box) => box.value);

  let result = segment === "all" ? phones : filterBySegment(phones, segment);
  if (onlyNfc) result = filterByFeature(result, "NFC");
  result = result.filter(
    (p) =>
      (query === "" || p.model.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)) &&
      (brands.length === 0 || brands.includes(p.brand))
  );

  renderCards(result);
  document.getElementById("empty").hidden = result.length > 0;
}

// Підписує поле пошуку, список сегментів, прапорець NFC і бічну панель брендів на події.
function initSearch() {
  const search = document.getElementById("q");
  if (search === null) return;
  // input спрацьовує на кожну зміну тексту під час набирання, а change лише коли поле втрачає фокус,
  // тому живий пошук без кнопки «шукати» потребує саме input.
  search.addEventListener("input", applyFilters);
  document.getElementById("filter").addEventListener("change", applyFilters);
  document.getElementById("nfc").addEventListener("change", applyFilters);
  document.querySelector(".layout__aside").addEventListener("change", applyFilters);
}

// ===== LR9: модальне вікно та делегування кліків =====

// Приймає смартфон і записує його дані в поля модалки; текст кладеться тільки через textContent.
const fillDialog = (item) => {
  document.getElementById("d-title").textContent = `${item.brand} ${item.model}`;
  document.getElementById("d-line1").textContent = `Рік: ${item.year}. Артикул: ${item.sku}`;
  document.getElementById("d-line2").textContent =
    `Камера: основна ${item.camera.mainMp} Мп, надширококутна ${item.camera.ultraWideMp} Мп, відео ${item.camera.video}. Акумулятор: ${item.battery} мАг`;
  document.getElementById("d-line3").textContent =
    `Функції: ${item.features.join(", ")}. Датчики: ${item.sensors.join(", ")}`;
};

// Вішає ОДИН обробник кліку на контейнер карток і відкриває модалку для картки, по якій клікнули.
function initDialog() {
  const cards = document.getElementById("cards");
  const dlg = document.getElementById("details");
  if (cards === null || dlg === null) return;

  // Один слухач на контейнері працює й для карток, створених пізніше: клік «спливає» від кнопки вгору
  // до #cards, а сам контейнер renderCards не перестворює, а лише міняє його вміст. Якби слухачі
  // висіли на кнопках, то після кожного перемальовування списку нові кнопки лишалися б «глухими».
  cards.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    event.preventDefault(); // посилання href="#" не має гортати сторінку нагору
    const item = phones.find((p) => p.id === Number(card.dataset.id));
    if (!item) return;
    fillDialog(item);
    dlg.showModal();
  });

  document.getElementById("d-close").addEventListener("click", () => dlg.close());
}

// ===== LR9: тост =====

let toastTimer = null; // id поточного таймера: потрібен, щоб скасувати його при новому повідомленні

// Приймає текст, показує його у блоці #toast і ховає через 2,5 секунди.
const showToast = (text) => {
  const toast = document.getElementById("toast");
  if (toast === null) return;
  toast.textContent = text;
  toast.hidden = false;
  // clearTimeout потрібен, бо без нього старий таймер спрацював би через свої 2,5 с і сховав би
  // нове повідомлення передчасно, хоча воно щойно з'явилося.
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2500);
};

// ===== LR9: форма замовлення =====

// Приймає елемент форми, повертає ключ його блока помилки: для груп перемикачів і прапорців name, для решти id або name.
const errorKey = (control) =>
  control.type === "radio" || control.type === "checkbox"
    ? control.name || control.id
    : control.id || control.name;

// Приймає елемент форми, повертає (за потреби створює) порожній span.error для нього.
const errorSlot = (control) => {
  const key = errorKey(control);
  let slot = document.getElementById(`err-${key}`);
  if (slot === null) {
    slot = el("span", "error");
    slot.id = `err-${key}`;
    control.insertAdjacentElement("afterend", slot);
  }
  return slot;
};

// Приймає елемент форми, повертає підпис для квитанції (текст label або name).
const captionOf = (control) => {
  const label = control.id !== "" ? document.querySelector(`label[for="${control.id}"]`) : null;
  return label !== null ? label.textContent.trim() : control.name || control.id;
};

// Власна перевірка через setCustomValidity: pattern дозволяє будь-які дві літери групи,
// а для смартфонів група має бути саме PH.
const checkSkuGroup = (input) => {
  const code = input.value.trim();
  if (/^SKU-[A-Z]{2}-/.test(code) && !code.startsWith("SKU-PH-")) {
    input.setCustomValidity("Для смартфонів код має починатися з SKU-PH-");
  } else {
    // Обов'язково скидаємо повідомлення: інакше поле лишилося б невалідним назавжди.
    input.setCustomValidity("");
  }
};

// Перевіряє всі поля форми, виводить повідомлення під ними й повертає true, якщо помилок немає.
function validateForm(form) {
  let valid = true;
  const shown = new Set(); // щоб для групи перемикачів показати повідомлення один раз
  for (const control of form.elements) {
    if (!control.willValidate) continue;
    const key = errorKey(control);
    if (key === "") continue;
    const ok = control.checkValidity();
    control.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
    if (!ok && !shown.has(key)) {
      errorSlot(control).textContent = control.validationMessage;
      shown.add(key);
    } else if (ok && !shown.has(key)) {
      errorSlot(control).textContent = "";
    }
  }
  return valid;
}

// Приймає форму, повертає масив рядків «Підпис: значення»; значення різних типів читаються по-різному.
const collectReceipt = (form) => {
  const lines = [];
  const done = new Set();
  for (const control of form.elements) {
    if (!control.willValidate || errorKey(control) === "") continue;
    if (control.type === "radio") {
      if (done.has(control.name)) continue;
      done.add(control.name);
      const chosen = form.querySelector(`input[name="${control.name}"]:checked`);
      lines.push(`${control.name}: ${chosen !== null ? chosen.value : "не обрано"}`);
    } else if (control.type === "checkbox") {
      lines.push(`${captionOf(control)}: ${control.checked ? "так" : "ні"}`);
    } else if (control.type === "number") {
      lines.push(`${captionOf(control)}: ${Number(control.value)}`);
    } else if (control.tagName === "SELECT") {
      lines.push(`${captionOf(control)}: ${control.selectedOptions[0].text}`);
    } else {
      lines.push(`${captionOf(control)}: ${control.value.trim()}`);
    }
  }
  return lines;
};

// Приймає форму й рядки квитанції, будує блок під формою через createElement + textContent.
const showReceipt = (form, lines) => {
  let box = document.getElementById("receipt");
  if (box === null) {
    box = el("section", "receipt");
    box.id = "receipt";
    form.after(box);
  }
  box.replaceChildren(el("h2", "", "Замовлення прийнято"), ...lines.map((line) => el("p", "", line)));
};

// Підключає перевірку до форми замовлення (на сторінках без форми нічого не робить).
function initForm() {
  const form = document.querySelector("form");
  if (form === null) return;
  form.noValidate = true; // дублює атрибут novalidate на випадок, якщо його немає в розмітці
  const sku = form.querySelector('input[pattern*="SKU"]');

  form.addEventListener("submit", (event) => {
    // Ця перевірка в браузері лише зручність для користувача і не є захистом: код на сторінці можна змінити
    // чи обійти надісланим запитом, тому справжню перевірку даних завжди виконує сервер.
    event.preventDefault();
    if (sku !== null) checkSkuGroup(sku);
    if (!validateForm(form)) {
      const bad = form.querySelector(".invalid");
      if (bad !== null) bad.focus();
      return;
    }
    showReceipt(form, collectReceipt(form));
    showToast("Замовлення надіслано");
    form.reset();
  });

  // Поки користувач виправляє поле з помилкою, повідомлення оновлюється одразу
  form.addEventListener("input", (event) => {
    const control = event.target;
    if (sku !== null && control === sku) checkSkuGroup(sku);
    if (control.classList.contains("invalid")) {
      const ok = control.checkValidity();
      control.classList.toggle("invalid", !ok);
      errorSlot(control).textContent = ok ? "" : control.validationMessage;
    }
  });
}

// ===== LR9: бургер-меню =====

// Приймає true/false: відкриває чи закриває меню. Клас .open і aria-expanded міняються разом,
// щоб видимий і програмний (для екранних читалок) стани не розходилися.
const setMenu = (open) => {
  document.getElementById("menu").classList.toggle("open", open);
  document.getElementById("burger").setAttribute("aria-expanded", String(open));
};

// Підписує кнопку на клік, а документ на Escape і клік поза меню (на сторінці без меню нічого не робить).
function initMenu() {
  const menu = document.getElementById("menu");
  const burger = document.getElementById("burger");
  if (menu === null || burger === null) return;
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#menu") && !event.target.closest("#burger")) setMenu(false);
  });
}

// ===== LR9: тема =====

// Повертає true, якщо зараз темна тема: спершу класи-перебивачі на <html>, і лише потім системна схема.
function isDark() {
  const root = document.documentElement;
  if (root.classList.contains("dark-theme")) return true;
  if (root.classList.contains("light-theme")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Приймає true/false: вмикає темну чи світлу тему класами на <html>, оновлює aria-pressed і текст кнопки.
const applyTheme = (dark) => {
  const root = document.documentElement;
  root.classList.toggle("dark-theme", dark);
  root.classList.toggle("light-theme", !dark);
  const button = document.getElementById("theme");
  button.setAttribute("aria-pressed", String(dark));
  button.textContent = dark ? "☀️ Світла тема" : "🌙 Темна тема";
};

// Узгоджує кнопку з поточною темою і перемикає її на клік (з повідомленням-тостом).
function initTheme() {
  const button = document.getElementById("theme");
  if (button === null) return;
  applyTheme(isDark());
  button.addEventListener("click", () => {
    const next = !isDark();
    applyTheme(next);
    showToast(next ? "Увімкнено темну тему" : "Увімкнено світлу тему");
  });
}

// ===== Вивід на сторінку (блок викликів show) =====
if (document.getElementById("demo") !== null) {
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
}

// ===== LR9: запуск =====
initCatalog();

initSearch();

initDialog();

initForm();

initMenu();
initTheme();
