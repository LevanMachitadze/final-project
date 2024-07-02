const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const mainImg = document.getElementById('mainImg');
const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productPrice = document.getElementById('productPrice');
const buyProduct = document.getElementById('buyProduct');
const productQuantity = document.getElementById('productQuantity');
const addToCart = document.getElementById('addToCart');
const features = document.getElementById('features');
const itemLeftIMg = document.getElementById('itemLeftIMg');
const itemRightImg = document.getElementById('itemRightImg');
const firstCurrentImg = document.createElement('img');
const secondCurrentImg = document.createElement('img');
const thirdCurrentImg = document.createElement('img');
const shoppingCartIcon = document.querySelector('.cart');
const closeBtn = document.querySelector('.close-btn');

shoppingCartIcon.addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('show');
});
closeBtn.addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('show');
});

fetch('../product.json')
  .then((response) => response.json())
  .then((data) => {
    const currentProduct = data[productId - 1];
    mainImg.src = currentProduct.img;
    productName.textContent = currentProduct.name;
    productDescription.textContent = currentProduct.description;
    productPrice.textContent = `$ ${currentProduct.price}`;
    features.textContent = currentProduct.features;

    firstCurrentImg.src = currentProduct.additionalImages[0];
    secondCurrentImg.src = currentProduct.additionalImages[1];
    thirdCurrentImg.src = currentProduct.additionalImages[2];

    itemLeftIMg.appendChild(firstCurrentImg);
    itemLeftIMg.appendChild(secondCurrentImg);
    itemRightImg.appendChild(thirdCurrentImg);

    data.forEach((product) => {});
  });
