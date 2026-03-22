# Js-Assignment-Group16-Final[README_1.md](https://github.com/user-attachments/files/26166710/README_1.md)
#  E-MART : Online Shopping Web Application

##  Project Description

**E-MART** is a fully client-side e-commerce shopping web application built with **HTML, CSS, and vanilla JavaScript**. It simulates a real online store experience where users can:

- Browse a catalog of products across multiple categories (Electronics, Fashion, Sports)
- Filter products by category using a dropdown
- Add items to a shopping cart with persistent state via `localStorage`
- Adjust item quantities or remove items from the cart
- Proceed to a checkout page with a shipping details form and order summary
- Place an order and receive a confirmation summary

The project uses **no frameworks or backend**, it is entirely front-end, making it easy to run directly in any modern web browser.

---

## Group Members

| no. | Name |
|---|------|
| 1 | Alibu Emmanuel |
| 2 | Akol Veronica |
| 3 | Hassan Ssemujju |
| 4 | Ninsiima Caroline |
| 5 | Jurubo Lebu Dan |
| 6 | Nanono Shama SHamirah |
| 7 | Kasozi Remegious |
| 8 | Akoth Jacqueline Ochieng |
| 9 | Nambooze Jovia |
| 10 | Ebong Newton Paul |



---

##  Project Structure

```
E_MART/
├── index.html        # Home page - product listing & category filter
├── cart.html         # Cart page - view and manage cart items
├── checkout.html     # Checkout page - order summary & shipping form
├── style.css         # Shared stylesheet for all pages
├── script.js         # All JavaScript logic (products, cart, checkout)
└── images/
    ├── laptop.jpg
    ├── phone.jpg
    ├── shoe.jpg
    ├── cloth.jpg
    ├── tablet.jpg
    └── Football.jpg
```

---

##  How to Run / View the Project

### Option 1  Open Directly in a Browser (Quickest)

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/your-username/E_MART.git
   ```

2. Navigate into the project folder:
   ```bash
   cd E_MART
   ```

3. Open `index.html` in your browser:
   - **Windows:** Double-click `index.html`, or right-click , *Open with* , your browser
   - **macOS:** Double-click `index.html`, or run:
     ```bash
     open index.html
     ```
   - **Linux:** Run:
     ```bash
     xdg-open index.html
     ```

---

### Option 2 Use VS Code Live Server (Recommended for Development)

1. Open the project folder in [Visual Studio Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel
3. Right-click `index.html` : **Open with Live Server**
4. The app will open at `http://127.0.0.1:5500/index.html`

---


##  Pages Overview

| Page | File | Description |
|------|------|-------------|
|  Home | `index.html` | Displays all products with a category filter |
|  Cart | `cart.html` | Lists cart items with quantity controls and remove option |
|  Checkout | `checkout.html` | Order summary + shipping form + place order button |

---

##  Features

-  Dynamic product rendering from a JavaScript array
-  Category filtering (Electronics, Fashion, Sports)
-  Add to cart with `localStorage` persistence
-  Quantity increment / decrement in cart
-  Remove individual items from cart
-  Checkout form validation
-  Order confirmation alert with customer details
-  Cart clears after successful order placement
-  Fully responsive layout

---

## Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No installation, no server, no dependencies required

---

## License

This project was created for academic purposes as part of a group assignment.

---


