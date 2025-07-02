// Загрузка и показ контента после лоадера
window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("bg-video").style.filter = "brightness(0.5) blur(4px)";
    document.getElementById("main-content").classList.remove("hidden");
  }, 2000);
};

// Навигация между секциями с анимацией disintegrate
const sections = ["main-content", "create-menu", "service-details", "profile-section", "help-section"];
let currentSection = "main-content";

function showSection(id) {
  if (id === currentSection) return;

  const oldSec = document.getElementById(currentSection);
  const newSec = document.getElementById(id);

  // Эффект «расщепления» для старой секции
  oldSec.classList.add("disappear");
  setTimeout(() => {
    oldSec.classList.add("hidden");
    oldSec.classList.remove("disappear");

    newSec.classList.remove("hidden");
    newSec.classList.add("fade-in");

    // Убрать fade-in через время
    setTimeout(() => newSec.classList.remove("fade-in"), 700);

    currentSection = id;
  }, 500);
}

// Навигация кнопок главного меню
document.querySelectorAll(".menu-bottom .btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.dataset.section);
  });
});

// Назад
document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
