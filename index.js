let cart = [];
let totalAmount = 0;

// Fetching product data
fetch('/public/products.json')
  .then(response => response.json())
  .then(data => {
    displayProducts(data.products);
  })
  .catch(error => {
    console.error('Error when fetching products:', error);
  });

// Function to display products on cards
function displayProducts(products) {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img class="card-img" src="${product.image}" alt="${product.name}">
      <div class="card-content">
        <div class="card-title">${product.name}</div>
        <div class="card-text">${product.description}</div>
        <div class="card-price">Price: Ksh ${product.price}</div>
        <a href="#" class="btn" data-id="${product.id}" data-price="${product.price}">Add to cart</a>
      </div>
    `;
    cardContainer.appendChild(card);

    // Add event listener to add to cart
    card.querySelector('.btn').addEventListener('click', function (e) {
      e.preventDefault();
      const productId = e.target.getAttribute('data-id');
      const productPrice = parseFloat(e.target.getAttribute('data-price'));
      const productName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim();
      const productImage = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src;

      addToCart({ id: productId, name: productName, price: productPrice, image: productImage });
    });
  });
}

// Add product to cart
function addToCart(product) {
  cart.push(product);
  totalAmount += product.price;
  updateCart();
}

// Update the cart display
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  cart.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"> ${product.name} - Ksh ${product.price}`;
    cartItems.appendChild(li);
  });

  const totalLi = document.createElement('li');
  totalLi.innerHTML = `<strong>Total: Ksh ${totalAmount}</strong>`;
  cartItems.appendChild(totalLi);
}

// Toggle cart modal visibility
document.getElementById('cartIcon').addEventListener('click', function () {
  const cartMenu = document.getElementById('cartMenu');
  cartMenu.classList.toggle('visible');
});

// Close the cart modal
document.getElementById('closeCart').addEventListener('click', function () {
  document.getElementById('cartMenu').classList.remove('visible');
});

// Clear cart
document.getElementById('clearButton').addEventListener('click', function () {
  cart.length = 0;  // Clear the cart
  totalAmount = 0;  // Reset the total
  updateCart();  // Update the cart display
});


// Rating functionality
const rateButton = document.getElementById('rateButton');
const ratingStars = document.getElementById('ratingStars').querySelectorAll('.star');

rateButton.addEventListener('click', function () {
    document.getElementById('ratingStars').classList.toggle('hidden');
});

ratingStars.forEach(star => {
    star.addEventListener('click', function () {
        const ratingValue = parseInt(star.getAttribute('data-value'));
        alert('Thank you very much for rating ' + ratingValue + ' stars!');
    });
});