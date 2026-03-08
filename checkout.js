// ====== CHECKOUT.JS ======

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get DOM elements
let checkoutCartItems = document.getElementById("checkout-cart-items");
let checkoutTotalPrice = document.getElementById("checkout-total-price");
let checkoutForm = document.getElementById("checkout-form");

// ====== DISPLAY CART ON CHECKOUT PAGE ======
function displayCheckoutCart() {
  checkoutCartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let li = document.createElement("li");
    let qty = item.quantity || 1; // default quantity 1
    li.textContent = `${item.name} - ₹${item.price} x ${qty}`;
    checkoutCartItems.appendChild(li);

    total += item.price * qty; // calculate total properly
  });

  checkoutTotalPrice.textContent = total;
}

// Call the function on page load
displayCheckoutCart();

// ====== HANDLE FORM SUBMISSION ======
checkoutForm.addEventListener("submit", function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Calculate total properly
  let total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // Display success message
  alert(`Your order is successfully placed!\nTotal Amount: ₹${total}`);

  // Clear cart after order
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to home page
  window.location.href = "index.html";
});