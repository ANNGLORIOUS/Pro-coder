let cart = [];
let totalAmount = 0;

// Directly fetching the products.json
fetch('/products.json')  // Make sure the path is correct, e.g., '/assets/products.json'
    .then(response => response.json())
    .then(data => {
        displayProducts(data.products);  // Assuming the data structure has a 'products' key
    })
    .catch(error => {
        console.error('Error when fetching products:', error);
    });

// Function to display products on the cards
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
                <a href="#" class="btn" data-id="${product.id}" data-price="${product.price}">Add To Cart</a>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

// Event listener for adding to cart
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        event.preventDefault();
        const productId = event.target.getAttribute('data-id');
        const productPrice = parseInt(event.target.getAttribute('data-price'));

        const product = {
            id: productId,
            price: productPrice,
            // You can add name and image properties here if needed
        };

        cart.push(product);  // Add product to cart
        totalAmount += productPrice;  // Update total amount
        updateCart();  // Update the cart display
    }
});

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"> ${product.name} - Ksh ${product.price}`;
        cartItems.appendChild(li);
    });

    // Display total amount
    const totalLi = document.createElement('li');
    totalLi.innerHTML = `<strong>Total: Ksh ${totalAmount}</strong>`;
    cartItems.appendChild(totalLi);
}

// Toggle cart menu visibility
document.getElementById('cartIcon').addEventListener('click', () => {
    const cartMenu = document.getElementById('cartMenu');
    cartMenu.classList.toggle('cart-menu-hidden');
});

// Clear cart
document.getElementById('clearButton').addEventListener('click', function () {
    cart.length = 0;  // Clear cart array
    totalAmount = 0;  // Reset total amount
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