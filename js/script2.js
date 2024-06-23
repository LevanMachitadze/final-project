const ProductList = document.getElementById('productList');
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
    const productsContent = document.createElement('div');
    productsContent.classList.add('products_description');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    const productImg = document.createElement('img');
    productImg.src = product.img;
    const imgDiv = document.createElement('div');
    imgDiv.appendChild(productImg);
    const productName = document.createElement('h2');
    productName.textContent = product.name;
    productsContent.appendChild(productName);
    const productType = document.createElement('h2');
    productType.textContent = product.type;
    productsContent.appendChild(productType);
    const productDescription = document.createElement('p');
    productDescription.textContent = product.description;
    productsContent.appendChild(productDescription);
    const productBtn = document.createElement('button');
    productBtn.textContent = 'See Products';

    productBtn.addEventListener('click', function () {
      vievMore(product.id);
    });
    productsContent.appendChild(productBtn);
    ProductList.appendChild(productDiv);
    productDiv.appendChild(productsContent);
    productDiv.appendChild(imgDiv);
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
