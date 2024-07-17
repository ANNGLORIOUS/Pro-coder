document.addEventListener('DOMContentLoaded', function() {
    fetchProducts(); // Call to fetch products after DOM content is loaded
});

// Function to fetch products from the server
function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products); // Call to display products after fetching
        })
        .catch(error => {
            console.error('Error when fetching products:', error);
        });
}

// Function to display products on the cards
function displayProducts(products) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img class="card-img" src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <div class="card-title">${product.name}</div>
                <div class="card-text">${product.description}</div>
                <div class="card-price">Price: Ksh ${product.price}</div>
                <a href="#" class="btn" data-id="${product.id}">Add To Cart</a>
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
        const product = products.find(p => p.id == productId); // Fix typo here
        cart.push(product);
        updateCart();
    }
});

// Toggle cart menu visibility
document.getElementById('cartIcon').addEventListener('click', () => {
    const cartMenu = document.getElementById('cartMenu');
    cartMenu.classList.toggle('hidden');
});

// Clear cart
document.getElementById('clearButton').addEventListener('click', () => {
    cart.length = 0; // Clear cart array
    updateCart();
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

// Toggle switch functionality (Dark/Light mode)
document.getElementById("toggle").addEventListener("click", function() {
    if (this.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});
