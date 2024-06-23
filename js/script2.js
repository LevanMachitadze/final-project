const ProductList = document.getElementById('product-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

prevBtn.textContent = '<';
nextBtn.textContent = '>';

let currentPage = 1;
const limit = 2;
let products = [];

fetch('../product.json')
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts();
  });

function displayProducts() {
  ProductList.innerHTML = '';
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const productsToDisplay = products.slice(start, end);
  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    const productName = document.createElement('h2');
    productName.textContent = product.name;
    productDiv.appendChild(productName);
    const productType = document.createElement('h2');
    productType.textContent = product.type;
    productDiv.appendChild(productType);
    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
    productDiv.appendChild(productDescription);
    const productBtn = document.createElement('button');
    productBtn.textContent = 'Viev More';

    productBtn.addEventListener('click', function () {
      vievMore(product.id);
    });
    productDiv.appendChild(productBtn);
    ProductList.appendChild(productDiv);
  });
}

function vievMore(productId) {
  window.location.href = `product.html?id=${productId}`;
}

prevBtn.addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    displayProducts();
  }
});
nextBtn.addEventListener('click', function () {
  if (currentPage < Math.ceil(products.length / limit)) {
    currentPage++;
    displayProducts();
  }
});
