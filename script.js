// Products array and DOMContentLoaded unchanged...

const products = [
    {id: 1, name: "Laptop", price: 1200000, category: "Electronics", image: "images/laptop.jpg"},
    {id: 2, name: "Phone", price: 4000000, category: "Electronics", image: "images/phone.jpg"},
    {id: 3, name: "Shoes", price: 500000, category: "Fashion", image: "images/shoe.jpg"},
    {id: 4, name: "Clothes", price: 30000, category: "Fashion", image: "images/cloth.jpg"},
    {id: 6, name: "Tablet", price: 800000, category: "Electronics", image: "images/tablet.jpg"} 
];

document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.querySelector(".home");
    if (!homeSection) {
        const cartSection = document.querySelector(".cart");
        if (cartSection) {
            loadCartItems();
            console.log("Cart loaded!");
            return;
        }
        const checkoutSection = document.querySelector(".checkout");
        if (checkoutSection) {
            renderCheckoutSummary();
            console.log("Checkout summary rendered!");
            return;
        }
        return; 
    }
    
    const productsContainer = document.querySelector(".products-container");
    if (!productsContainer) {
        console.warn("Products container not found.");
        return;
    }
    
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("products-card");

        const productImageDiv = document.createElement("div");
        productImageDiv.classList.add("product-image");
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        productImageDiv.appendChild(img);

        const productText = document.createElement("div");
        productText.classList.add("product-text");

        const nameEl = document.createElement("h3");
        nameEl.textContent = product.name;

        const priceEl = document.createElement("p");
        priceEl.textContent = `UGX ${product.price.toLocaleString()}`;

        const catEl = document.createElement("small");
        catEl.textContent = product.category;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add to Cart";
        addBtn.addEventListener("click", () => addToCart(product));

        productText.appendChild(nameEl);
        productText.appendChild(priceEl);
        productText.appendChild(catEl);
        productText.appendChild(addBtn);

        card.appendChild(productImageDiv);
        card.appendChild(productText);

        productsContainer.appendChild(card);
    });
    console.log("Products rendered!");
    
    // Category filter
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
        
        categoryFilter.addEventListener("change", (e) => {
            filterProducts(e.target.value);
        });
    }
});

// Filter function
function filterProducts(category) {
    const productsContainer = document.querySelector(".products-container");
    if (!productsContainer) return;
    
    productsContainer.innerHTML = "";
    
    const filtered = category === "" ? products : products.filter(p => p.category === category);
    
    filtered.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("products-card");

        const productImageDiv = document.createElement("div");
        productImageDiv.classList.add("product-image");
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        productImageDiv.appendChild(img);

        const productText = document.createElement("div");
        productText.classList.add("product-text");

        const nameEl = document.createElement("h3");
        nameEl.textContent = product.name;

        const priceEl = document.createElement("p");
        priceEl.textContent = `UGX ${product.price.toLocaleString()}`;

        const catEl = document.createElement("small");
        catEl.textContent = product.category;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add to Cart";
        addBtn.addEventListener("click", () => addToCart(product));

        productText.appendChild(nameEl);
        productText.appendChild(priceEl);
        productText.appendChild(catEl);
        productText.appendChild(addBtn);

        card.appendChild(productImageDiv);
        card.appendChild(productText);

        productsContainer.appendChild(card);
    });
    console.log(`Filtered to ${category || 'All'}`);
  }

function addToCart(product){
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProduct = cartItems.find(item => item.id === product.id);
    if(existingProduct){
        existingProduct.quantity += 1;
    }else{
        cartItems.push({...product, quantity: 1});
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Added to cart:", cartItems);
    alert(`${product.name} added to cart!`);
}

function loadCartItems(){
    let cartItems = [];
    try {
        const stored = localStorage.getItem("cartItems");
        cartItems = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Cart load error:", e);
        cartItems = [];
    }
    const cartContainer = document.querySelector(".cart-container");
    if(!cartContainer) return;
    cartContainer.innerHTML = "";   

    cartItems.forEach(item => {
        const cartCard = document.createElement("div");
        cartCard.classList.add("cart-card");

        const cartImageDiv = document.createElement("div");
        cartImageDiv.classList.add("cart-image");
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        cartImageDiv.appendChild(image);

        const cartText = document.createElement("div");
        cartText.classList.add("cart-text");
        const cartDetails = document.createElement("div");
        cartDetails.classList.add("cart-details");
        const h3 = document.createElement("h3");
        h3.textContent = item.name;
        const p = document.createElement("p");
        p.textContent = `UGX ${item.price.toLocaleString()}`;

        cartDetails.appendChild(h3);
        cartDetails.appendChild(p);

        const actions = document.createElement("div");
        actions.classList.add("actions");
        
        const buttonMinus = document.createElement("button");
        buttonMinus.textContent = "-";
        buttonMinus.onclick = () => changeQuantity(item.id, -1);
        
        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const buttonPlus = document.createElement("button");
        buttonPlus.textContent = "+";
        buttonPlus.onclick = () => changeQuantity(item.id, 1);

        actions.appendChild(buttonMinus);
        actions.appendChild(quantity);
        actions.appendChild(buttonPlus);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove");
        removeBtn.onclick = () => removeFromCart(item.id);

        cartText.appendChild(cartDetails);
        cartText.appendChild(actions);
        cartText.appendChild(removeBtn);

        cartCard.appendChild(cartImageDiv);
        cartCard.appendChild(cartText);

        cartContainer.appendChild(cartCard);    
    });
}

function changeQuantity(productId, change){
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.map(item => {
        if(item.id === productId){
            item.quantity += change;
        }
        return item;
    }).filter(item => item.quantity > 0);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    loadCartItems();
}

function removeFromCart(productId){
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (document.querySelector('.cart-container')) {
        loadCartItems();
    }
    if (document.querySelector('.checkout')) {
        renderCheckoutSummary();
    }
}

// NEW CHECKOUT FUNCTIONS
function calculateTotal() {
    let cartItems = [];
    try {
        const stored = localStorage.getItem("cartItems");
        cartItems = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Total calc error:", e);
        return 0;
    }
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCheckoutSummary() {
    let cartItems = [];
    try {
        const stored = localStorage.getItem("cartItems");
        cartItems = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Checkout summary load error:", e);
        cartItems = [];
    }
    const summaryContainer = document.querySelector(".summary-container");
    const totalAmountEl = document.getElementById("total-amount");

    if(!summaryContainer) return;

    summaryContainer.innerHTML = "";
    
    cartItems.forEach(item => {
        const cartCard = document.createElement("div");
        cartCard.classList.add("cart-card");

        const cartImageDiv = document.createElement("div");
        cartImageDiv.classList.add("cart-image");
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        cartImageDiv.appendChild(image);

        const cartText = document.createElement("div");
        cartText.classList.add("cart-text");
        const cartDetails = document.createElement("div");
        cartDetails.classList.add("cart-details");
        const h3 = document.createElement("h3");
        h3.textContent = item.name;

        const priceBreakdown = document.createElement("div");
        priceBreakdown.classList.add("price-breakdown");

        const unitSpan = document.createElement("span");
        unitSpan.textContent = `Unit: UGX ${item.price.toLocaleString()}`;
        const qtySpan = document.createElement("span");
        qtySpan.textContent = `Qty: ${item.quantity}`;
        const amountSpan = document.createElement("span");
        amountSpan.textContent = `Amount: UGX ${(item.price * item.quantity).toLocaleString()}`;

        priceBreakdown.appendChild(unitSpan);
        priceBreakdown.appendChild(qtySpan);
        priceBreakdown.appendChild(amountSpan);

        cartDetails.appendChild(h3);
        cartDetails.appendChild(priceBreakdown);

        cartText.appendChild(cartDetails);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove");
        removeBtn.onclick = () => removeFromCart(item.id);

        cartText.appendChild(removeBtn);

        cartCard.appendChild(cartImageDiv);
        cartCard.appendChild(cartText);

        summaryContainer.appendChild(cartCard);
    });

    // Refresh total after potential removes
    loadCartItems(); // Optional refresh if needed, but since checkout has no container

    const total = calculateTotal();
    totalAmountEl.textContent = `UGX ${total.toLocaleString()}`;
}

function checkout() {
    // Validate form
    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const city = document.getElementById('customer-city').value.trim();
    const payment = document.getElementById('payment-method').value;

    if (!name || !email || !address || !city || !payment) {
        alert('Please fill all fields.');
        return;
    }

    const total = calculateTotal();
    alert(`Order placed!\n Customer: ${name}\nEmail: ${email}\nAddress: ${address}, ${city}\nPayment: ${payment.toUpperCase()}\nTotal: UGX ${total.toLocaleString()}`);
    localStorage.removeItem("cartItems");
    window.location.href = "index.html";
}

// Init place order btn
document.addEventListener("DOMContentLoaded", () => {
    const placeOrderBtn = document.getElementById("place-order");
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", checkout);
    }
});
