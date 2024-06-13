const btn = document.querySelector('.menu-btn');
btn.addEventListener('click', function () {
  btn.classList.toggle('open');
});

AOS.init();

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },

  autoplay: {
    delay: 2653,
    displayOnInteraction: true,
  },
  speed: 2341,

  effect: 'slide',

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    750: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    1570: {
      slidesPerView: 4,
    },
  },
});

const day = document.getElementById('day');
const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

let days = 25;
let hours = 23;
let minutes = 59;
let seconds = 60;
setInterval(function () {
  seconds = seconds - 1;
  if (seconds === 0) {
    minutes = minutes - 1;
    seconds = 60;
  }
  if (minutes === 0) {
    hours = hours - 1;
    minutes = 59;
  }
  if (hours === 0) {
    days = days - 1;
    hours = 23;
  }
  day.textContent = days;
  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;
}, 1000);
