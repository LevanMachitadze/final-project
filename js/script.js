const btn = document.querySelector('.menu-btn');
btn.addEventListener('click', function () {
  btn.classList.toggle('open');
});

AOS.init();
