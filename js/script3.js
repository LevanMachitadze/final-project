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

    const productContainer = document.getElementById('productContainer');

    data.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'card';

      const details = document.createElement('div');
      details.className = 'details';

      const name = document.createElement('h2');
      name.textContent = product.name;
      details.appendChild(name);

      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;
      details.appendChild(price);

      card.appendChild(details);

      const decrementButton = document.getElementById('minus');
      decrementButton.addEventListener('click', () =>
        decrementQuantity(product.id)
      );

      const quantityInput = document.getElementById('quantityInp');
      quantityInput.id = `quantity-${product.id}`;
      quantityInput.value = 1;
      quantityInput.min = 1;
      productQuantity.appendChild(quantityInput);

      const incrementButton = document.getElementById('plus');
      incrementButton.addEventListener('click', () =>
        incrementQuantity(product.id)
      );
      productQuantity.appendChild(incrementButton);

      card.appendChild(productQuantity);

      addToCart.addEventListener('click', () => {
        const quantity = parseInt(
          document.querySelector(`#quantity-${product.id}`).value
        );
        addToCart({ ...product, quantity });
      });
      productContainer.appendChild(card);
    });
  })
  .catch((error) => console.error('Error:', error));
function incrementQuantity(productId) {
  const quantityInput = document.querySelector(`#quantity-${productId}`);
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrementQuantity(productId) {
  const quantityInput = document.querySelector(`#quantity-${productId}`);
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

function addToCart(product) {
  console.log(product);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const exitingProductIndex = cart.findIndex((p) => p.id === product.id);

  if (exitingProductIndex >= 0) {
    cart[exitingProductIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  console.log(cart);

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartPopup();
}

function calculateTotalPrice(cart) {
  return cart.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0);
}
function calculateTotalQuantity(cart) {
  return cart.reduce((sum, p) => sum + Number(p.quantity), 0);
}

function updateCartPopup() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = calculateTotalPrice(cart);
  let items = calculateTotalQuantity(cart);

  const popup = document.querySelector('.popup');

  popup.textContent = '';

  cart.forEach((product, index) => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${product.name} - $${product.price} Quantity: ${product.quantity}`;
    itemElement.className = 'item';

    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.addEventListener('click', function () {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartPopup();
    });

    popup.appendChild(itemElement);
    popup.appendChild(button);
  });
  const totalPrice = document.createElement('div');
  totalPrice.textContent = `total prce: ${total}$`;
  const totalElement = document.createElement('div');
  totalElement.textContent = `total items: ${items}`;

  popup.appendChild(totalElement);
  popup.appendChild(totalPrice);
}
