let cart = []; // Array to hold cart items
let totalAmount = 0; // Variable to hold total amount

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts(); // Fetch products when the DOM content is loaded
});

// Function to fetch products from the server
function fetchProducts() {
    fetch('http://localhost:3000/products') 
        .then(response => response.json())
        .then(products => {
            displayProducts(products); // Display products after fetching
        })
        .catch(error => {
            console.error('Error when fetching products:', error);
        });
}

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
        
        // Find product in the fetched data
        const product = {
            id: productId,
            price: productPrice,
            name: event.target.parentElement.querySelector('.card-title').innerText,
            image: event.target.parentElement.parentElement.querySelector('img').src
        };
        
        cart.push(product); // Add product to cart
        totalAmount += productPrice; // Update total amount
        updateCart(); // Update the cart display
    }
});

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; 

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"> ${item.name} - Ksh ${item.price}`;
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
    cartMenu.classList.toggle('hidden');
});

// Clear cart
document.getElementById('clearButton').addEventListener('click', () => {
    cart.length = 0; // Clear cart array
    totalAmount = 0; // Reset total amount
    updateCart(); // Update the cart display
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
