// Слайдер для Header
$(document).ready(function () {
  $(".slider").slick({
    autoplay: true,
    dots: true,
    infinite: `true`,
    speed: 1000,
    arrows: false,
    fade: true,
    cssEase: "linear",
  });
});

// Инициализация Fancybox
Fancybox.bind('[data-fancybox="gallery"]', {
  caption: function (fancybox, carousel, slide) {
    return (
      `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
    );
  },
});

// Инициализация карты Leaflet
var map = L.map("map").setView([50.45, 30.52], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Установка маркера на карте
var marker = L.marker([50.45, 30.52]).addTo(map);

//Модальное окно
document.querySelector(".modal__btn").addEventListener("click", () => {
  document.querySelector(".modal-body").classList.add("active");
});

// Меню Гамбургер

document.querySelector(".toggle").addEventListener("click", () => {
  document.querySelector(".hamburger-icon").classList.toggle("active");
  document
    .querySelector(".header__navigation-social")
    .classList.toggle("active");
  document.querySelector(".header__title-wrapper").classList.toggle("active");
  document.querySelector(".header__navigation-nav").classList.toggle("active");
});
