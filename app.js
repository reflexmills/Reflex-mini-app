// Задержка загрузки
window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("bg-video").classList.add("blur");
    document.getElementById("main-content").classList.remove("hidden");
  }, 2000); // имитируем загрузку
};

const prices = {
  bot: 4999,
  site: 3449,
  miniapp: 4399,
};

const services = {
  bot: {
    title: "Создание Telegram-бота",
    description: "Вы получите функционального Telegram-бота под ваши задачи, полностью кастомизированного. Возможна интеграция с базами данных, кнопки, команды, админ-панель и многое другое.",
    form: `
      <label>🗝 Название бота:</label>
      <input type="text" required />

      <label>🛠 Функционал (какие кнопки и команды?):</label>
      <textarea required></textarea>

      <label>⚙ Подробно о кнопках (что делают):</label>
      <textarea required></textarea>

      <label>✉️ Основная цель бота:</label>
      <textarea required></textarea>

      <p>📎 Фото/видео пример (загрузите на imgur или другой хостинг и вставьте ссылку):</p>
      <input type="url" placeholder="https://..." />
    `,
  },
  site: {
    title: "Создание сайта",
    description: "Современный адаптивный сайт под ваши задачи: лендинг, портфолио, блог, интернет-магазин или корпоративный сайт. Быстрая загрузка, мобильная оптимизация, уникальный дизайн.",
    form: `
      <label>🗝 Название сайта:</label>
      <input type="text" required />

      <label>🌐 Тип сайта (лендинг, блог, магазин и т.д.):</label>
      <input type="text" required />

      <label>🧩 Страницы (главная, контакты и т.д.):</label>
      <textarea required></textarea>

      <label>📎 Примеры дизайна или сайт-референс (по ссылке):</label>
      <input type="url" placeholder="https://..." />
    `,
  },
  miniapp: {
    title: "Создание Mini App Telegram",
    description: "Интерактивное Telegram-приложение с возможностью интеграции платежей, форм, каталогов. Полная совместимость с WebApp API Telegram.",
    form: `
      <label>🗝 Название Mini App:</label>
      <input type="text" required />

      <label>📋 Что должно быть внутри приложения:</label>
      <textarea required></textarea>

      <label>📎 Ссылки/референсы (по желанию):</label>
      <input type="url" placeholder="https://..." />
    `,
  },
};

function openSection(id) {
  hideAll();
  document.getElementById(id).classList.remove("hidden");
}

function goBack(target = "main-content") {
  hideAll();
  document.getElementById(target).classList.remove("hidden");
}

function hideAll() {
  document.querySelectorAll(".section, .menu, #main-content").forEach((el) => {
    el.classList.add("hidden");
  });
}

function openService(key) {
  const service = services[key];
  document.getElementById("service-description").innerHTML = `
    <h2>${service.title}</h2>
    <p>${service.description}</p>
  `;
  document.getElementById("service-form").innerHTML = service.form;
  document.getElementById("service-form").dataset.serviceKey = key;
  openSection("service-details");
}

function payByCard() {
  alert("Оплата картой временно недоступна. Используйте CryptoBot.");
}

function payByCryptoBot() {
  const serviceKey = document.getElementById("service-form").dataset.serviceKey;
  const price = prices[serviceKey];

  const balance = getBalance();
  if (balance >= price) {
    updateBalance(balance - price);
    alert("Оплата прошла через баланс. Спасибо за заказ!");
  } else {
    const remaining = price - balance;
    alert(`На балансе не хватает ${remaining}₽. Сейчас создадим чек через CryptoBot.`);
    // Здесь должна быть интеграция с CryptoBot API (создание чека)
  }
}

function getBalance() {
  return parseFloat(localStorage.getItem("balance") || "0");
}

function updateBalance(amount) {
  localStorage.setItem("balance", amount.toFixed(2));
  updateProfile();
}

function openProfile() {
  updateProfile();
  openSection("profile-section");
}

function updateProfile() {
  const username = "Пользователь123"; // можно заменить авторизацией
  const balance = getBalance();

  document.getElementById("profile-info").innerHTML = `
    <h2>${username}</h2>
    <p>💰 Баланс: ${balance} ₽</p>
  `;

  // Заглушка заказов
  document.getElementById("orders-list").innerHTML = `
    <div class="order">
      <p>⏰ 02.07.2025 | 🤖 Telegram Бот | Статус: Выполняется</p>
      <button class="btn back" onclick="cancelOrder()">Отменить</button>
    </div>
  `;
}

function topUp() {
  const sum = prompt("Введите сумму для пополнения:");
  if (!sum || isNaN(sum) || sum <= 0) return;

  // Тут можно создать чек, сейчас просто увеличим баланс
  updateBalance(getBalance() + parseFloat(sum));
  alert("Баланс пополнен!");
}

function cancelOrder() {
  const confirmCancel = confirm("Если заказу более 30 часов — деньги не вернутся. Отменить?");
  if (confirmCancel) {
    alert("Заказ отменён.");
    // логика отмены тут
  }
}
