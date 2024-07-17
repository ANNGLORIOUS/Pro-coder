document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const products = [];

    // Fetch data from db.json and create product cards
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            const products = data['products'];
            products.push(...products); // Store fetched products

            displayProducts(); // Call to display products after fetching
        })
        .catch(error => {
            console.error('Error when fetching products:', error);
            alert('An error occurred while fetching products. Please try again later.');
        });

    // Function to display products
    function displayProducts() {
        const cardContainer = document.querySelector('.card-container');
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

    // Function to update the cart
    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            cartItems.appendChild(li);
            totalPrice += parseInt(item.price);
        });

        const totalLi = document.createElement('li');
        totalLi.textContent = `Total: Ksh ${totalPrice}`;
        cartItems.appendChild(totalLi);
    }

    // Event listener for adding to cart
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            event.preventDefault();
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
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
        cart.length = 0; // Clear the cart
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
});






// document.addEventListener('DOMContentLoaded', function() {
    
//     // Fetch data from db.json and create product cards
//     fetch('http://localhost:3000/products')
//         .then(response => response.json())
//         .then(data => {
//             const products = data['products'];

//             products.forEach(product => {
//                 createProductCard(product);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });

        
        
    
        
// });
// const cart = [];

//         // Function to display products
//         function displayProducts() {
//             const cardContainer = document.querySelector('.card-container');
        
//             products.forEach(product => {
//                 const card = document.createElement('div');
//                 card.className = 'card';
//                 card.innerHTML = `
//                     <img class="card-img" src="${product.image}" alt="${product.name}">
//                     <div class="card-content">
//                         <div class="card-title">${product.name}</div>
//                         <div class="card-text">${product.description}</div>
//                         <div class="card-price">Price: Ksh ${product.price}</div>
//                         <a href="#" class="btn" data-id="${product.id}">Add To Cart</a>
//                     </div>
//                 `;
//                 cardContainer.appendChild(card);
//             });
//         }
        
//         // Function to update the cart
//         function updateCart() {
//             const cartItems = document.getElementById('cartItems');
//             cartItems.innerHTML = '';
        
//             let totalPrice = 0;
        
//             cart.forEach(item => {
//                 const li = document.createElement('li');
//                 li.textContent = item.name;
//                 cartItems.appendChild(li);
//                 totalPrice += parseInt(item.price);
//             });
        
//             const totalLi = document.createElement('li');
//             totalLi.textContent = `Total: Ksh ${totalPrice}`;
//             cartItems.appendChild(totalLi);
//         }
        
//         // Event listener for adding to cart
//         document.addEventListener('click', (event) => {
//             if (event.target.classList.contains('btn')) {
//                 event.preventDefault();
//                 const productId = event.target.getAttribute('data-id');
//                 const product = products.find(p => p.id == productId);
//                 cart.push(product);
//                 updateCart();
//             }
//         });
        
//         // Toggle cart menu visibility
//         document.getElementById('cartIcon').addEventListener('click', () => {
//             const cartMenu = document.getElementById('cartMenu');
//             cartMenu.classList.toggle('hidden');
//         });
        
//         // Clear cart
//         document.getElementById('clearButton').addEventListener('click', () => {
//             cart.length = 0; // Clear the cart
//             updateCart();
//         });
        
//         // Initial call to display products
//         displayProducts();
        
        



// // the rate button
//     const rateButton = document.getElementById('rateButton');
//     const ratingStars = document.getElementById('ratingStars').querySelectorAll('.star');

//     rateButton.addEventListener('click', function () {
//         document.getElementById('ratingStars').classList.toggle('hidden');
//     });

//     ratingStars.forEach(star => {
//         star.addEventListener('click', function () {
//             const ratingValue = parseInt(star.getAttribute('data-value'));
//             alert('Thank you very much ' + ratingValue + ' stars!');
//         });
//     });

// //     const cartIcon = document.getElementById('cartIcon');
// //     const cartMenu = document.getElementById('cartMenu');
// //     const cartItems = document.getElementById('cartItems');
// //     const checkoutButton = document.getElementById('checkoutButton');
// //     const clearButton = document.getElementById('clearButton');

// //     // Toggle cart menu visibility
// //     cartIcon.addEventListener('click', function() {
// //         cartMenu.classList.toggle('visible');
// //     });

// //     // Close cart menu when clicking outside of it
// //     document.addEventListener('click', function(event) {
// //         if (!cartMenu.contains(event.target) && event.target !== cartIcon) {
// //             cartMenu.classList.remove('visible');
// //         }
// //     });

// //     // The clear button should delete items on the list
// //     clearButton.addEventListener('click', function () {
// //         alert('Are you sure you want to delete this items?');
// //     });
// // });


