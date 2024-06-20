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
let log_in = getElId('log_in');

let contentBlocks = {
  'content_main': getElId('content_main'),
  'content_contacts': getElId('content_contacts'),
  'content_news': getElId('content_news'),
  'content_products': getElId('content_products'),
  'content_resourses': getElId('content_resourses'),
  'content_about': getElId('content_about'),
  'content_personal': getElId('content_personal'),
  'content_log_in': getElId('content_log_in')
};

// Инициализация загрузки RSS ленты при первой загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  loadRSSFeed();
});

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

  // Сохранение состояния в history
  history.pushState({ id: idToShow, title: title }, title, `#${idToShow}`);
}

// Восстановление состояния при загрузке страницы
window.addEventListener('popstate', function(event) {
  if (event.state) {
    showContent(event.state.id, event.state.title);
  } else {
    showContent('content_main', 'Шапка');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  if (location.hash) {
    let idToShow = location.hash.substring(1);
    let title = document.querySelector(`a[href="#${idToShow}"]`).innerText;
    showContent(idToShow, title);
  } else {
    showContent('content_main', 'Шапка');
  }
});

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
  showContent('content_news', 'Новости (RSS-лента)');
  loadRSSFeed();
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

log_in.addEventListener('click', function(){
  showContent('content_log_in', 'Вход');
});

// Функция для загрузки и отображения RSS ленты
function loadRSSFeed() {
  //let rssUrl = 'https://rss2json.com/api.json?rss_url=http://vse.karelia.ru/news/feed.xml';
  let rssUrl = 'https://rss2json.com/api.json?rss_url=http://lenta.ru/l/r/EX/import.rss';

  fetch(rssUrl)
    .then(response => response.json())
    .then(data => {
      let container = document.getElementById('rss-feed');
      container.innerHTML = ''; // Очистка предыдущего содержимого

      data.items.forEach(function(entry) {
        let article = document.createElement('div');
        article.classList.add('rss-article');
        console.log('entry', entry);

        let title = document.createElement('h3');
        title.innerHTML = entry.title;

        // Создаем общий div для "Автор: " и имени автора с id
        let authorInfo = document.createElement('div');
        authorInfo.classList.add('author-info');
        authorInfo.id = 'author-info-' + entry.guid; // Пример привязки id

        let authorLabel = document.createElement('span');
        authorLabel.textContent = 'Автор: ';
        authorInfo.appendChild(authorLabel);

        let author = document.createElement('span');
        author.textContent = entry.author;
        authorInfo.appendChild(author);

        let link = document.createElement('a');
        link.href = entry.link;
        link.innerHTML = 'Читать далее';
        link.target = '_blank'; // Открыть ссылку в новой вкладке

        article.appendChild(title);

        // Проверка и добавление изображения, если оно есть
        if (entry.enclosure && entry.enclosure.link) {
          let image = document.createElement('img');
          image.src = entry.enclosure.link;
          image.alt = entry.title;
          article.appendChild(image);
        }

        article.appendChild(authorInfo);
        container.appendChild(article);
        article.appendChild(link);
      });
    })
    .catch(error => console.error('Error loading RSS feed:', error));
}

// Получаем ссылку на пункт меню "Контакты"
let contactsMenuItem = document.getElementById('contacts');

// Добавляем обработчик клика на пункт меню "Контакты"
contactsMenuItem.addEventListener('click', function() {
  // Переключаем видимость контактной информации
  contactInfo.style.display = contactInfo.style.display === 'block' ? 'none' : 'block';

  // После переключения видимости контактной информации
  // Проверяем, отображается ли контактная информация
  if (contactInfo.style.display === 'block') {
    // Если контактная информация отображается, переключаем видимость других блоков
    for (let key in contentBlocks) {
      if (key !== 'content_contacts') {
        contentBlocks[key].style.display = 'none'; // Скрываем остальные блоки
      }
    }
  }
});
