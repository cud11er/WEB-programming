function getElId(id) {
  return document.getElementById(id);
}

let headerMenu = getElId('headerMenu');
let menu = getElId('Menu');
let headerProfile = getElId("headerProfile");
let homeTitle = getElId('home_title');
let profile = getElId('Profile');

let newsItem = getElId('news');
let contactsItem = getElId('contacts');
let productsItem = getElId('products');
let resourses = getElId('resourses');
let about = getElId('about');
let personal = getElId('personal');
let log_out = getElId('log_out');

let content_contacts =  document.getElementById('')


let contentBlocks = {
  'content_main': getElId('content_main'),
  'content_contacts': getElId('content_contacts'),
  'content_news': getElId('content_news'),
  'content_products': getElId('content_products'),
  'content_resourses': getElId('content_resourses'),
  'content_about': getElId('content_about'),
  'content_personal': getElId('content_personal'),
  'content_log_out': getElId('content_log_out')
};

// Функция для скрытия всех контентных блоков, кроме указанного по его id
function showContent(idToShow, title) {
  for (let key in contentBlocks) {
    if (key === idToShow) {
      contentBlocks[key].style.display = 'flex'; // Показываем нужный блок
      menu.classList.remove('ShowMenu');
      profile.classList.remove('ShowMenu')
    } else {
      contentBlocks[key].style.display = 'none'; // Скрываем остальные блоки
    }
  }
  homeTitle.innerHTML = `<h2>${title}</h2>`; // Устанавливаем заголовок
  menu.classList.remove('ShowMenu'); // Скрыть меню после нажатия
}

// Закрытие меню при клике вне области
document.addEventListener('click', function(event) {
  const target = event.target;
  if (!target.closest('.header_menu') && !target.closest('#Menu') && menu.classList.contains('ShowMenu')) {
    menu.classList.remove('ShowMenu');
  }
  if (!target.closest('.header_profile') && !target.closest('#Profile') && profile.classList.contains('ShowMenu')) {
    profile.classList.remove('ShowMenu');
  }
});

//Раскрытие списков Меню и Профиля
headerMenu.addEventListener('click', function() {
  if (profile.classList.contains('ShowMenu')) {
    profile.classList.remove('ShowMenu');
  }
  menu.classList.toggle('ShowMenu');
});

headerProfile.addEventListener("click", function() {
  if (menu.classList.contains('ShowMenu')) {
    menu.classList.remove('ShowMenu');
  }
  profile.classList.toggle('ShowMenu');
});

// Обработчики для разных разделов
newsItem.addEventListener('click', function() {
  showContent('content_news', 'Новости');
});

contactsItem.addEventListener('click', function() {
  showContent('content_contacts', 'Контакты');
});

productsItem.addEventListener('click', function() {
  showContent('content_products', 'Товары');
});

resourses.addEventListener('click', function() {
  showContent('content_resourses', 'Ресурсы');
});

about.addEventListener('click', function() {
  showContent('content_about', 'О нас');
});

personal.addEventListener('click', function() {
  showContent('content_personal', 'Личный кабинет');
});