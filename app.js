/* Лоадинг */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
  }, 2000);
});

/* Быстрый помощник */
const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const sections = {
  main:  qs('#main-section'),
  create:qs('#create-section'),
  profile:qs('#profile-section'),
  help:  qs('#help-section')
};

/* Навигация по главным кнопкам */
qsa('.menu-bottom .btn').forEach(btn=>{
  btn.onclick=()=>show(btn.dataset.section);
});

/* Назад */
qsa('.back').forEach(btn=>{
  btn.onclick=()=>show('main');
});

/* Показ секции */
function show(name){
  Object.values(sections).forEach(s=>s.classList.remove('visible'));
  sections[name].classList.add('visible');
}

/* --- ЛОГИКА «СОЗДАТЬ» --- */
const serviceDetails = qs('#service-details');
qsa('.service').forEach(btn=>{
  btn.onclick=()=>renderService(btn.dataset.service);
});

function renderService(key){
  const map={
    bot:{
      title:'Telegram бот',
      price:4999,
      desc:`🧠 Кастомные команды, кнопки, оплата, админ-панель.`
    },
    site:{
      title:'Веб-сайт',
      price:3449,
      desc:`🌐 Адаптивный дизайн, формы, SEO, быстрый хостинг.`
    },
    mini:{
      title:'Mini App',
      price:4399,
      desc:`📲 WebApp в Telegram c CryptoBot-оплатой.`
    }
  }[key];

  serviceDetails.innerHTML=`
    <h3>${map.title} — ${map.price} ₽</h3>
    <p>${map.desc}</p>
    <form class="form">
      <input placeholder="🗝 Название" required>
      <textarea rows="2" placeholder="🛠 Функционал"></textarea>
      <textarea rows="3" placeholder="⚙ Подробности кнопок"></textarea>
      <textarea rows="2" placeholder="✉️ Цель проекта"></textarea>
      <input placeholder="🌐 Ссылка на пример (фото/видео)">
    </form>
    <div class="col">
      <button class="btn pay-card">Карта (WIP)</button>
      <button class="btn pay-crypto">CryptoBot</button>
    </div>
  `;

  serviceDetails.querySelector('.pay-card').onclick=()=>alert('Оплата картой в разработке');
  serviceDetails.querySelector('.pay-crypto').onclick=()=>alert(`Создаём чек CryptoBot на ${map.price}₽`);
}

/* --- ПРОФИЛЬ (заглушка) --- */
qs('#top-up').onclick=()=>{
  const sum=prompt('Введите сумму пополнения:');
  if(sum&&+sum>0) alert(`Создаём чек CryptoBot на ${sum}₽`);
};

/* Стартовая секция */
show('main');
