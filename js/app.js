// js/app.js — «Мобі-Гід», фінальний проєкт (варіант 10).
// Дані вантажаться з data.json через fetch; увесь JavaScript сайту лежить в одному файлі.

// ===== Стан сторінки =====

let items = []; // заповнюється в init() після fetch("data.json"); раніше це був масив, зашитий у код
let favorites = []; // id моделей у списку «порівняти»

// ===== Завантаження даних =====

// Завантажує data.json і повертає масив записів; у разі проблеми кидає помилку з поясненням.
// Перевірка response.ok потрібна, бо fetch відхиляє проміс лише коли запит не вдалося виконати (немає мережі).
// Відповідь 404 чи 500 для нього «успішна»: без перевірки ми б спробували розібрати сторінку-помилку як JSON
// і побачили б незрозумілу помилку розбору замість справжньої причини.
async function loadData() {
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Файл даних порожній або має неправильну структуру");
  }
  return data;
}

// Приймає помилку й показує на сторінці повідомлення людською мовою з порадою: консоль користувач не відкриває.
function showLoadError(error) {
  const box = document.getElementById("load-error");
  box.hidden = false;
  box.textContent = `Не вдалося завантажити каталог. Перевірте з'єднання і оновіть сторінку. Технічні подробиці: ${error.message}`;
}

// Показує спінер, завантажує дані й малює картки; при помилці виводить повідомлення на сторінці.
// Якщо в записі немає id, id береться з його номера за порядком.
async function init() {
  const loader = document.querySelector(".loader");
  loader.hidden = false;
  try {
    const data = await loadData();
    items = data.map((item, index) => ({ id: index + 1, ...item }));
    renderCards(items);
  } catch (error) {
    showLoadError(error);
  } finally {
    // finally виконується і після успіху, і після помилки. Якщо сховати спінер у кінці try, то при збої
    // виконання одразу перейде в catch і спінер лишився б крутитися поруч із повідомленням про помилку.
    loader.hidden = true;
  }
}

// ===== Картки каталогу =====

// Приймає тег, клас і (необов'язково) текст, повертає новий елемент; текст кладе тільки через textContent.
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

// Приймає число, повертає рядок із розділювачами розрядів за українськими правилами.
const num = (value) => Number(value).toLocaleString("uk-UA");

// Приймає смартфон, повертає повну назву без дубля бренду: у даних model буває «Samsung Galaxy S23», а буває «iPhone 14».
const fullName = (item) =>
  item.model.toLowerCase().includes(item.brand.toLowerCase()) ? item.model : `${item.brand} ${item.model}`;

// Фото беремо за назвою моделі (перший збіг), для невідомих моделей лишається загальне фото.
const PHOTOS = [
  ["galaxy s24", "images/galaxy-s24.jpg"],
  ["galaxy a55", "images/galaxy-a55.jpg"],
  ["galaxy s23", "images/samsung-galaxy-s23.jpg"],
  ["iphone 15", "images/iPhone-15.jpg"],
  ["redmi", "images/xiaomi-redmi-note-12.jpg"],
  ["iphone", "images/images.jpeg"]
];
const FALLBACK_PHOTO = "images/smartphones-hero.jpg";

// Приймає смартфон, повертає шлях до його фото.
function photoFor(item) {
  const name = fullName(item).toLowerCase();
  const found = PHOTOS.find(([key]) => name.includes(key));
  return found ? found[1] : FALLBACK_PHOTO;
}

// Приймає смартфон, повертає складський код: поле sku, якщо воно є, інакше код за форматом SKU-PH-11450 з id.
const skuOf = (item) =>
  item.sku ?? (Number.isFinite(Number(item.id)) ? `SKU-PH-${11449 + Number(item.id)}` : String(item.id));

// Приймає смартфон, повертає короткий опис, складений із самих даних: камера й перші функції.
const summaryOf = (item) => {
  const features = item.features.length === 0 ? "додаткових функцій не вказано" : item.features.slice(0, 3).join(", ");
  return `Основна камера ${item.camera.main_mp} Мп; ${features}`;
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
    img.src = photoFor(item);
    img.alt = `Смартфон ${fullName(item)}`;

    const title = el("h3", "", item.model);
    title.title = item.model;
    const body = el("div", "card-body");
    body.append(
      title,
      el("p", "card-brand", item.brand),
      el("p", "", `Рік: ${item.year}`),
      el("p", "card-sku", skuOf(item)),
      el("p", "card-desc", summaryOf(item))
    );

    const action = el("a", "card__action", "Детальніше");
    action.href = "#";
    const actions = el("div", "card__actions");
    actions.append(action);

    card.append(badge, img, body, actions);
    container.append(card);
  }
}

// ===== Модальне вікно з повною деталізацією =====

// Підписи для ключів об'єкта specs; невідомі ключі виводяться як є (з пробілами замість «_»).
const LABELS = {
  screen: "Екран",
  display: "Екран",
  battery: "Акумулятор",
  chipset: "Процесор",
  processor: "Процесор",
  cpu: "Процесор",
  ram: "Оперативна пам'ять",
  storage: "Вбудована пам'ять",
  os: "Операційна система",
  weight: "Вага",
  charging: "Зарядка"
};

// Приймає ключ об'єкта, повертає підпис для людини.
const labelOf = (key) => LABELS[key] ?? key.replaceAll("_", " ");

// Приймає значення будь-якого типу, повертає рядок: числа з розділювачами, логічні як «так/ні», вкладене як «ключ: значення».
function formatValue(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") return num(value);
  if (typeof value === "boolean") return value ? "так" : "ні";
  if (Array.isArray(value)) return value.map((inner) => formatValue(inner)).join(", ");
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, inner]) => `${labelOf(key)}: ${formatValue(inner)}`)
      .join("; ");
  }
  return String(value);
}

// Приймає варіант пам'яті: число (ГБ) стає «128 ГБ» або «1 ТБ», рядок лишається як є.
const formatStorage = (variant) => {
  if (typeof variant !== "number") return String(variant);
  return variant >= 1024 ? `${variant / 1024} ТБ` : `${variant} ГБ`;
};

// Приймає розмір матриці в мегапікселях, повертає текст; 0 і відсутнє значення означають «немає».
const mpText = (value) => (value ? `${value} Мп` : "немає");

// Приймає смартфон за id (рядок чи число), повертає його запис або undefined.
const findItem = (id) => items.find((p) => String(p.id) === String(id));

// Приймає масив пар [підпис, значення], повертає список означень <dl> (createElement + textContent).
function buildPairs(pairs) {
  const list = el("dl", "kv");
  for (const [label, value] of pairs) {
    list.append(el("dt", "", label), el("dd", "", value));
  }
  return list;
}

// Приймає масив значень, текст для порожнього випадку і функцію форматування; повертає <ul> або абзац-заглушку.
function buildList(values, emptyText, format = String) {
  if (values.length === 0) return el("p", "muted", emptyText);
  const list = el("ul", "chips");
  for (const value of values) {
    list.append(el("li", "", format(value)));
  }
  return list;
}

// Приймає масив функцій, повертає ряд «пігулок» із LR4 або текст, якщо функцій немає.
function buildPills(features) {
  if (features.length === 0) return el("p", "muted", "додаткових функцій не вказано");
  const box = el("div", "pills");
  for (const feature of features) {
    box.append(el("span", "pill", feature));
  }
  return box;
}

// Приймає об'єкт specs, повертає таблицю «Характеристика — Значення» з thead і tbody, зібрану в коді.
function buildSpecsTable(specs) {
  const thead = el("thead");
  const headRow = el("tr");
  headRow.append(el("th", "", "Характеристика"), el("th", "", "Значення"));
  thead.append(headRow);

  const tbody = el("tbody");
  for (const [key, value] of Object.entries(specs)) {
    const row = el("tr");
    const name = el("th", "", labelOf(key));
    name.scope = "row";
    const cell = el("td");
    if (Array.isArray(value)) {
      // Масив усередині об'єкта (specs.storage) — це перелік варіантів, а не одне значення:
      // виводимо його списком, а решту полів specs — звичайними рядками.
      cell.append(buildList(value, "варіанти не вказані", key === "storage" ? formatStorage : formatValue));
    } else {
      cell.textContent = formatValue(value);
    }
    row.append(name, cell);
    tbody.append(row);
  }
  const table = el("table", "specs-table");
  table.append(thead, tbody);
  return table;
}

// Приймає таблицю, повертає її в контейнері з горизонтальною прокруткою (для ширини 360px).
const wrapTable = (table) => {
  const box = el("div", "table-wrap");
  box.append(table);
  return box;
};

// Приймає смартфон і заповнює всі секції модалки; кожен контейнер спершу очищається, щоб дані двох записів не змішувались.
function fillDialog(item) {
  const camera = item.camera;
  document.getElementById("d-title").textContent = `${item.brand} ${item.model}`;
  document.getElementById("d-main").replaceChildren(
    buildPairs([
      ["Бренд", item.brand],
      ["Рік випуску", String(item.year)],
      ["Складський код", skuOf(item)]
    ])
  );
  document.getElementById("d-object").replaceChildren(
    el("h3", "", "Камера"),
    buildPairs([
      ["Основна", mpText(camera.main_mp)],
      ["Надширококутна", mpText(camera.ultraWide_mp)],
      ["Телеоб'єктив", mpText(camera.tele_mp)],
      ["Відео", camera.video ? String(camera.video) : "немає"]
    ])
  );
  document.getElementById("d-table").replaceChildren(
    el("h3", "", "Характеристики"),
    wrapTable(buildSpecsTable(item.specs))
  );
  document.getElementById("d-list").replaceChildren(
    el("h3", "", "Датчики"),
    buildList(item.sensors, "датчики не вказані")
  );
  document.getElementById("d-features").replaceChildren(
    el("h3", "", "Функції"),
    buildPills(item.features)
  );
}

// Вішає ОДИН обробник кліку на контейнер карток і відкриває модалку для картки, по якій клікнули.
function initCards() {
  const cards = document.getElementById("cards");
  const dlg = document.getElementById("details");

  // Один слухач на контейнері працює й для карток, створених пізніше: клік «спливає» від кнопки вгору
  // до #cards, а сам контейнер renderCards не перестворює, а лише міняє його вміст. Якби слухачі
  // висіли на кнопках, то після кожного перемальовування списку нові кнопки лишалися б «глухими».
  cards.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    event.preventDefault(); // посилання href="#" не має гортати сторінку нагору
    const item = findItem(card.dataset.id);
    if (!item) return;
    fillDialog(item);
    dlg.showModal();
    dlg.scrollTop = 0;
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
// ===== Запуск =====
initForm();
initMenu();
initTheme();
if (document.getElementById("cards") !== null) {
  initCards();
  init();
}
