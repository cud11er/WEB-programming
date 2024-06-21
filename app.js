let loadButton = document.getElementById('load');
let photoContainer = document.getElementById('photo');
let infoContainer = document.querySelector('.info');
let wrapper = document.querySelector('.wrapper');
let profileContainer = document.getElementById('profile-container');
let add_infoContainer = document.getElementById('add_info');
let backButton = document.getElementById('back');

let person = {
    name: "Константин",
    birthday: new Date(1998, 8, 3),
    age: 25,
    isMale: true,
    workDate: [
        {
            name: "PetrGU",
            startDate: new Date(2017, 8, 1),
            endDate: new Date(2020, 11, 28),
        },
        {
            name: "PGTH",
            startDate: new Date(2022, 8, 1),
            endDate: new Date(),
        },
    ],
    img: "https://pic.rutubelist.ru/user/8b/92/8b92d2eb41680b7923600988fe2ae441.jpg",
    mail: 'rikunov.kost@inbox.ru',
    telegram: 'https://t.me/cudd1er',
    vk: 'https://vk.com/cudd1er'
};

loadButton.addEventListener('click', function() {
    photoContainer.src = person.img;

    photoContainer.classList.remove('hidden');
    photoContainer.classList.remove('hide');
    photoContainer.classList.add('reveal');
    infoContainer.classList.remove('hidden');
    infoContainer.classList.remove('hide');
    infoContainer.classList.add('reveal');
    add_infoContainer.classList.remove('hidden');
    add_infoContainer.classList.remove('hide');
    add_infoContainer.classList.add('reveal');

    // Очистить контейнеры перед добавлением новых элементов
    infoContainer.innerHTML = '';
    add_infoContainer.innerHTML = '';

    // <h4> с именем person.name
    let nameContainer = document.createElement('div');
    nameContainer.className = 'name';
    let nameElement = document.createElement('h4');
    nameElement.textContent = `Имя: ${person.name}`;
    nameContainer.appendChild(nameElement);
    infoContainer.appendChild(nameContainer);

    // <p> с возрастом person.age
    let ageContainer = document.createElement('div');
    ageContainer.className = 'age';
    let ageElement = document.createElement('p');
    ageElement.textContent = `Возраст: ${person.age}`;
    ageContainer.appendChild(ageElement);
    infoContainer.appendChild(ageContainer);

    // <p> с полом person.isMale
    let genderContainer = document.createElement('div');
    genderContainer.className = 'gender';
    let genderElement = document.createElement('p');
    genderElement.textContent = `Пол: ${person.isMale ? 'Мужской' : 'Женский'}`;
    genderContainer.appendChild(genderElement);
    infoContainer.appendChild(genderContainer);

    // Работа
    let worksContainer = document.createElement('div');
    worksContainer.id = 'works';
    worksContainer.className = 'works';
    for (const work of person.workDate) {
        let workElement = document.createElement('div');
        workElement.innerHTML = `
            <div>Место работы: ${work.name}</div>
            <div>Год начала: ${work.startDate.getFullYear()}</div>
            <div>Год окончания: ${work.endDate.getFullYear()}</div>
        `;
        worksContainer.appendChild(workElement);
    }
    infoContainer.appendChild(worksContainer);

    // Дополнительная информация
    let mailContainer = document.createElement('div');
    mailContainer.className = 'mail';
    let mailElement = document.createElement('p');
    mailElement.innerHTML = `Email: <a href="mailto:${person.mail}">${person.mail}</a>`;
    mailContainer.appendChild(mailElement);
    add_infoContainer.appendChild(mailContainer);

    let telegramContainer = document.createElement('div');
    telegramContainer.className = 'telegram';
    let telegramElement = document.createElement('p');
    telegramElement.innerHTML = `Telegram: <a href="${person.telegram}" target="_blank">${person.telegram}</a>`;
    telegramContainer.appendChild(telegramElement);
    add_infoContainer.appendChild(telegramContainer);

    let vkContainer = document.createElement('div');
    vkContainer.className = 'vk';
    let vkElement = document.createElement('p');
    vkElement.innerHTML = `VK: <a href="${person.vk}" target="_blank">${person.vk}</a>`;
    vkContainer.appendChild(vkElement);
    add_infoContainer.appendChild(vkContainer);

    // Скрыть кнопку "Загрузить"
    loadButton.style.display = 'none';

    // Показать кнопку "Вернуться"
    backButton.classList.remove('hidden');
});

backButton.addEventListener('click', function() {
    // Анимация сворачивания
    photoContainer.classList.add('hide');
    infoContainer.classList.add('hide');
    add_infoContainer.classList.add('hide');

    // Удаление элементов после завершения анимации
    setTimeout(() => {
        photoContainer.classList.remove('reveal');
        photoContainer.classList.add('hidden');
        photoContainer.classList.remove('hide');
        infoContainer.classList.remove('reveal');
        infoContainer.classList.add('hidden');
        infoContainer.classList.remove('hide');
        add_infoContainer.classList.remove('reveal');
        add_infoContainer.classList.add('hidden');
        add_infoContainer.classList.remove('hide');

        // Показать кнопку "Загрузить" снова
        loadButton.style.display = 'block';

        // Скрыть кнопку "Вернуться"
        backButton.classList.add('hidden');
    }, 500); // Время должно совпадать с продолжительностью анимации
});
