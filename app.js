/* === 1. Лоадер 2 с === */
setTimeout(()=>{document.getElementById('preloader').style.display='none';startVideoPhase();},2000);

/* === 2. Видео 10 с, затем UI === */
function startVideoPhase(){
  const bg=document.getElementById('bg-video');
  const timer=setTimeout(showUI,10000);             // запасной таймер
  bg.addEventListener('timeupdate',()=>{if(bg.currentTime>=10){clearTimeout(timer);showUI();}});
}
function showUI(){
  // затемняем + размываем фон
  const ov=document.getElementById('overlay');
  ov.style.background='rgba(0,0,0,0.45)';
  ov.style.backdropFilter='blur(5px)';
  // показываем интерфейс
  const ui=document.getElementById('ui');
  ui.classList.remove('hidden'); ui.classList.add('fade-in');
}

/* === 3. Навигация между секциями === */
const sections={main:'main-section',create:'create-section',profile:'profile-section',help:'help-section'};
let current='main-section';
function open(id){
  if(id===current)return;
  const old=document.getElementById(current),nu=document.getElementById(id);
  old.classList.add('disappear');
  setTimeout(()=>{old.classList.remove('disappear');old.classList.remove('visible');
                  nu.classList.add('visible');nu.classList.add('fade-in');
                  setTimeout(()=>nu.classList.remove('fade-in'),700);current=id;},500);
}
document.querySelectorAll('.menu-bottom .btn').forEach(b=>b.onclick=()=>open(b.dataset.section));
document.querySelectorAll('.back').forEach(b=>b.onclick=()=>open('main-section'));

/* === 4. Логика «Создать» === */
const map={
  bot:{title:'Telegram-бот',price:4999,desc:'🧠 Кастомные команды, платежи, админ-панель.'},
  site:{title:'Сайт',price:3449,desc:'🌐 Лендинг / магазин, адаптив, формы, SEO.'},
  mini:{title:'Mini App',price:4399,desc:'📲 WebApp в Telegram, CryptoBot-оплата.'}
};
document.querySelectorAll('.service').forEach(btn=>{
  btn.onclick=()=>{
    const k=btn.dataset.service,m=map[k];
    const box=document.getElementById('service-details');
    box.innerHTML=`
      <h3>${m.title} — ${m.price} ₽</h3><p>${m.desc}</p>
      <div class="form">
        <input placeholder="🗝 Название" required>
        <textarea rows="2" placeholder="🛠 Функционал"></textarea>
        <textarea rows="3" placeholder="⚙ Подробности кнопок"></textarea>
        <textarea rows="2" placeholder="✉️ Цель проекта"></textarea>
        <input placeholder="🌐 Ссылка на пример (imgur / youtube)">
      </div>
      <div class="col">
        <button class="btn pay-card">Карта (WIP)</button>
        <button class="btn pay-crypto">CryptoBot</button>
      </div>`;
    box.querySelector('.pay-card').onclick=()=>alert('Оплата картой в разработке');
    box.querySelector('.pay-crypto').onclick=()=>alert(`CryptoBot: счёт на ${m.price}₽`);
    open('create-section');           // остаёмся в Create, просто отображаем детали
  };
});

/* === 5. Профиль (заглушка) === */
document.getElementById('top-up').onclick=()=>{
  const sum=prompt('Сумма пополнения:'); if(sum&&+sum>0) alert(`CryptoBot: счёт на ${sum}₽`);
};
