let cart = [];
let wishlist = [];

// Load from localStorage
let savedCart = localStorage.getItem("cart");
let savedWishlist = localStorage.getItem("wishlist");
if (savedCart) cart = JSON.parse(savedCart);
if (savedWishlist) wishlist = JSON.parse(savedWishlist);

// Products
let products = [
  {id:1,name:"Laptop",price:50000,image:"images/laptop.jpg"},
  {id:2,name:"Mobile",price:20000,image:"images/Smart Phone.jpg"},
  {id:3,name:"Headphones",price:2000,image:"images/headphone.jpg"},
  {id:4,name:"Shoes",price:3000,image:"images/shoe.jpg"},
  {id:5,name:"Smart Watch",price:4000,image:"images/Smart watch.jpg"},
  {id:6,name:"Backpack",price:1500,image:"images/backbag.jpg"},
  {id:7,name:"Keyboard",price:1200,image:"images/Keyboard.jpg"},
  {id:8,name:"Mouse",price:700,image:"images/mouse.jpg"},
  {id:9,name:"Tablet",price:15000,image:"images/Tab.jpg"},
  {id:10,name:"Camera",price:25000,image:"images/Camera.jpg"}
];

// DOM Elements
let productList = document.getElementById("product-list");
let cartItems = document.getElementById("cart-items");
let totalPrice = document.getElementById("total-price");
let cartCount = document.getElementById("cart-count");
let wishlistCount = document.getElementById("wishlist-count");
let wishlistItems = document.getElementById("wishlist-items");

// Display Products
function displayProducts() {
  productList.innerHTML = "";
  products.forEach(p => {
    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="toggleToWishlist(${p.id})">
        ${wishlist.some(w => w.id===p.id) ? '💖' : '🤍'}
      </button>
    `;
    productList.appendChild(div);
  });
}

// Cart functions
function addToCart(id){
  let item = products.find(p => p.id===id);
  let cartItem = cart.find(c => c.id===id);
  if(cartItem) cartItem.quantity +=1;
  else { item.quantity=1; cart.push(item);}
  updateCart();
}

function removeItem(index){
  if(cart[index].quantity>1) cart[index].quantity -=1;
  else cart.splice(index,1);
  updateCart();
}

function updateCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity} <button onclick="removeItem(${index})">Remove</button>`;
    cartItems.appendChild(li);
    total += item.price*item.quantity;
  });
  totalPrice.textContent = total;
  cartCount.textContent = cart.length;
  localStorage.setItem("cart",JSON.stringify(cart));
}

// Wishlist toggle
function toggleToWishlist(id){
  let index = wishlist.findIndex(w => w.id===id);
  if(index===-1){
    wishlist.push(products.find(p=>p.id===id));
  } else {
    wishlist.splice(index,1);
  }
  updateWishlist();
  displayProducts(); // update heart icons
}

function updateWishlist(){
  wishlistItems.innerHTML="";
  wishlist.forEach((item,index)=>{
    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="toggleToWishlist(${item.id})">Remove</button>`;
    wishlistItems.appendChild(li);
  });
  wishlistCount.textContent = wishlist.length;
  localStorage.setItem("wishlist",JSON.stringify(wishlist));
}

// Toggle sections
function toggleCart(){
  let cartSection = document.getElementById("cart-section");
  cartSection.style.display = cartSection.style.display==="block" ? "none":"block";
}

function toggleWishlist(){
  let wishSection = document.getElementById("wishlist-section");
  wishSection.style.display = wishSection.style.display==="block" ? "none":"block";
}

// Search
function searchProduct(){
  let value = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(value));
  productList.innerHTML="";
  filtered.forEach(p=>{
    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="toggleToWishlist(${p.id})">
        ${wishlist.some(w => w.id===p.id) ? '💖' : '🤍'}
      </button>
    `;
    productList.appendChild(div);
  });
}

// Initial load
displayProducts();
updateCart();
updateWishlist();