// Элементы DOM
const app = document.getElementById('app');
const loader = document.getElementById('loader');
const header = document.getElementById('header-title');
const menu = document.getElementById('menu');

const sectionMain = document.getElementById('main-section');
const sectionCreate = document.getElementById('create-section');
const sectionProfile = document.getElementById('profile-section');
const sectionHelp = document.getElementById('help-section');

const createSub = document.getElementById('create-sub');
const profileSub = document.getElementById('profile-sub');

const createBtn = document.getElementById('btn-create');
const profileBtn = document.getElementById('btn-profile');
const helpBtn = document.getElementById('btn-help');

const backBtns = document.querySelectorAll('.btn-back');

// Стартовый лоадинг и плавное появление
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.display = 'none';
    app.style.opacity = 1;

    // Замедлить фон и размыть
    const bg = document.getElementById('bg-video');
    bg.style.filter = 'blur(5px)';
  }, 2000); // 2 секунды
});

// Навигация
createBtn.addEventListener('click', () => showSection(sectionCreate));
profileBtn.addEventListener('click', () => showSection(sectionProfile));
helpBtn.addEventListener('click', () => showSection(sectionHelp));

backBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showSection(sectionMain);
  });
});

function showSection(section) {
  [sectionMain, sectionCreate, sectionProfile, sectionHelp].forEach(sec => {
    sec.classList.remove('visible');
  });
  section.classList.add('visible');
}

// Подменю для "Создать"
function showCreateOptions() {
  createSub.innerHTML = `
    <button class="btn" onclick="selectService('bot')">Создать Telegram бота</button>
    <button class="btn" onclick="selectService('site')">Создать сайт</button>
    <button class="btn" onclick="selectService('mini')">Создать Mini App</button>
    <button class="btn btn-back">Назад</button>
  `;
  attachBackButtons();
}

window.selectService = function(type) {
  let title = '', description = '', price = 0;

  switch(type) {
    case 'bot':
      title = 'Telegram Бот';
      price = 4999;
      description = `
        🧠 Умный Telegram бот с кастомной логикой, кнопками, командами и API интеграцией. <br>
        ⚙ Примеры: автоответчик, магазин, заказчик, или информационный бот. <br>
        💡 Поддержка оплаты и админ-панели.
      `;
      break;
    case 'site':
      title = 'Веб-Сайт';
      price = 3449;
      description = `
        🌐 Уникальный сайт (лендинг/портфолио/бизнес). <br>
        🧰 Адаптивный дизайн, формы, интеграции, SEO. <br>
        ⚡ Быстрая загрузка и кроссбраузерность.
      `;
      break;
    case 'mini':
      title = 'Telegram Mini App';
      price = 4399;
      description = `
        🧩 Интерфейс в Telegram через WebApp. <br>
        🔐 Интеграция оплаты, анимации, логика, работа с API. <br>
        🤝 Подходит для заказов, кабинетов и интерактива.
      `;
      break;
  }

  createSub.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <form class="form">
      <input type="text" placeholder="🗝 Название проекта" required>
      <textarea rows="2" placeholder="🛠 Функционал (кратко)"></textarea>
      <textarea rows="3" placeholder="⚙ Подробности о кнопках и логике"></textarea>
      <textarea rows="3" placeholder="✉️ Суть проекта / идея / цель"></textarea>
      <input type="text" placeholder="🌐 Ссылка на фото/видео (используйте хостинг)">
    </form>
    <div class="payment-methods">
      <button class="btn" onclick="pay('card')">Оплатить Картой</button>
      <button class="btn" onclick="pay('crypto', ${price})">CryptoBot (${price}₽)</button>
    </div>
    <button class="btn btn-back">Назад</button>
  `;
  attachBackButtons();
}

// Оплата
window.pay = function(method, price = 0) {
  if (method === 'card') {
    alert("Оплата картой временно недоступна. Попробуйте через CryptoBot.");
  } else if (method === 'crypto') {
    // Здесь логика создания чека и проверки баланса
    alert(`Создаётся чек через CryptoBot на сумму ${price}₽...`);
  }
}

// Подменю для Профиля
function showProfile() {
  const ordersHtml = `
    <div class="order-item">
      <span>🕓 01.07.2025 - Mini App - Статус: Выполняется</span>
      <button class="btn" onclick="cancelOrder()">Отменить</button>
    </div>
  `;

  profileSub.innerHTML = `
    <p>👤 @reflexuser</p>
    <p>💰 Баланс: 0₽</p>
    <h3>📦 Заказы</h3>
    <div id="orders-list">${ordersHtml}</div>
    <button class="btn" onclick="topUp()">Пополнить баланс</button>
    <div class="admin-only">
      <h3>🔐 Админ-Панель</h3>
      <button class="btn">Заказы</button>
      <button class="btn">Статистика</button>
      <button class="btn">Изменить баланс</button>
      <button class="btn">Блокировка</button>
    </div>
    <button class="btn btn-back">Назад</button>
  `;
  attachBackButtons();
}

window.cancelOrder = function() {
  alert("Если прошло более 30 часов — деньги не возвращаются.");
}

window.topUp = function() {
  const sum = prompt("Введите сумму пополнения:");
  if (sum && parseInt(sum) > 0) {
    alert(`Создаётся счёт через CryptoBot на сумму ${sum}₽...`);
  }
}

// Назначаем действия на кнопки
createBtn.addEventListener('click', showCreateOptions);
profileBtn.addEventListener('click', showProfile);

// Переинициализация кнопок "назад"
function attachBackButtons() {
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.onclick = () => showSection(sectionMain);
  });
}
