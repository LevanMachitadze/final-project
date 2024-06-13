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
