var skyButton = document.getElementById('fillSky');
var wrapper = document.querySelector('.wrapper');
var finalMessage = document.getElementById('finalMessage');
var planetContainer = wrapper === null || wrapper === void 0 ? void 0 : wrapper.querySelector('.planets');
var starsContainer = wrapper === null || wrapper === void 0 ? void 0 : wrapper.querySelector('.stars');
if (skyButton && wrapper) {
    skyButton.onclick = function () {
        fillSky(0, 0); // Начальный вызов fillSky без звезд и планет
        var interval = setInterval(function () {
            fillSky(50, 2); // Добавление 5 звезд и 1 планеты каждый интервал
            if ((starsContainer && starsContainer.children.length >= 600) ||
                (planetContainer && planetContainer.children.length >= 20)) {
                clearInterval(interval);
                if (finalMessage) {
                    finalMessage.classList.add('show');
                }
                skyButton.classList.add('disappear'); // Добавляем класс анимации исчезания
            }
        }, 100);
    };
}
function fillSky(starQuantity, planetQuantity) {
    if (!starsContainer) {
        starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        wrapper.appendChild(starsContainer);
    }
    if (!planetContainer) {
        planetContainer = document.createElement('div');
        planetContainer.className = 'planets';
        wrapper.appendChild(planetContainer);
    }
    for (var i = 0; i < starQuantity; i++) {
        createStar();
    }
    for (var i = 0; i < planetQuantity; i++) {
        createPlanet();
    }
}
function createStar() {
    var newStar = document.createElement('div');
    newStar.innerHTML = "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"white\">\n            <path d=\"M12 1.69l2.76 5.61 6.16.89-4.47 4.36 1.06 6.19-5.51-2.89-5.51 2.89 1.06-6.19L3.08 8.19l6.16-.89L12 1.69z\"/>\n        </svg>\n    ";
    var size = Math.floor(Math.random() * 5) + 10;
    var left = Math.random() * 100;
    var top = Math.random() * 100;
    newStar.style.width = "".concat(size, "px");
    newStar.style.height = "".concat(size, "px");
    newStar.style.left = "".concat(left, "%");
    newStar.style.top = "".concat(top, "%");
    starsContainer.appendChild(newStar);
}
function createPlanet() {
    var newPlanet = document.createElement('div');
    newPlanet.innerHTML = "\n        <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" \n        xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.008 512.008\" \n        style=\"enable-background:new 0 0 512.008 512.008;\" \n        xml:space=\"preserve\"><circle style=\"fill:#FFD83B;\" \n        cx=\"259.273\" cy=\"256.004\" r=\"195.76\"/><g>\n        <path style=\"fill:#F3C432;\" \n        d=\"M454.969,256.052c0,4.272-0.144,8.416-0.416,12.544c-39.984,31.984-98.16,62.448-165.984,84.368 c-65.616,21.232-128.752,30.736-179.072,29.088c-14.064-16.544-25.232-35.424-33.088-56.112 c36.944,21.088,115.936,19.024,200.72-8.272c89.184-28.944,156.736-76.928,169.84-117.04 C452.217,218.132,454.969,236.74,454.969,256.052z\"/><circle style=\"fill:#F3C432;\" \n        cx=\"190.729\" cy=\"144.484\" r=\"36.736\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"359.145\" cy=\"160.964\" r=\"27.264\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"212.905\" cy=\"272.164\" r=\"24\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"190.729\" cy=\"381.14\" r=\"20\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"408.777\" cy=\"276.5\" r=\"20\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"359.145\" cy=\"373.684\" r=\"15.968\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"304.169\" cy=\"322.404\" r=\"10.08\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"304.169\" cy=\"217.38\" r=\"10.08\"/>\n        <circle style=\"fill:#F3C432;\" cx=\"127.673\" cy=\"242.084\" r=\"10.08\"/></g><path style=\"fill:#5B5F63;\" \n        d=\"M509.865,169.956c-9.648-29.632-50.448-45.904-107.808-47.84c8.816,9.376,16.672,19.568,23.44,30.608 c11.312,5.936,19.024,13.792,22.192,23.712c2.48,7.584,2.064,15.584-0.688,24.128c-13.104,40.112-80.64,88.096-169.84,117.04 c-84.784,27.296-163.776,29.36-200.72,8.272c-10.208-5.792-17.088-13.376-20.128-22.752c-3.728-11.584-0.96-24.816,7.44-38.32 c-0.272-2.896-0.272-5.936-0.272-8.816c0-8.96,0.544-17.776,1.792-26.336c-47.84,35.84-73.056,74.16-63.136,104.64 c9.52,29.632,50.32,45.76,107.392,47.696c50.32,1.648,113.456-7.856,179.072-29.088c67.824-21.92,126-52.384,165.984-84.368 C497.321,234.468,519.241,198.772,509.865,169.956z\"/>\n        </svg>";
    var randomColor = getRandomColor();
    var circles = newPlanet.querySelectorAll('circle');
    circles.forEach(function (circle) {
        circle.style.fill = randomColor;
    });
    var size = Math.floor(Math.random() * 80) + 20;
    var left = Math.random() * 100;
    var top = Math.random() * 100;
    newPlanet.style.width = "".concat(size, "px");
    newPlanet.style.height = "".concat(size, "px");
    newPlanet.style.left = "".concat(left, "%");
    newPlanet.style.top = "".concat(top, "%");
    planetContainer.appendChild(newPlanet);
}
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
}
