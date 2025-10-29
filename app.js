// Produits
const products = [
  {
    id: 1,
    name: "Peluche Grommy",
    price: 30,
    image: "images/IMG_9184.jpg",
    reviews: ["Grommy sent un peu le putois – Bougzer", "Incroyable qualité – Dazzle"]
  },
  {
    id: 2,
    name: "Sticker Naymax",
    price: 5,
    image: "images/IMG_9182.jpg",
    reviews: ["Pas cher et drôle – KarimRouen"]
  },
  {
    id: 3,
    name: "Sweat Cotorepe",
    price: 55,
    image: "images/Screenshot_220654.jpg",
    reviews: ["Il pue mais j’aime – Depos"]
  }
];


// --- Gestion affichage ---
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  document.querySelectorAll("#cartCount")
    .forEach(el => el.textContent = cart.length);
}

// --- Page Accueil ---
if (document.getElementById("productList")) {
  const list = document.getElementById("productList");
  products.forEach(p => {
    list.innerHTML += `
      <div class="product-card" onclick="location.href='product.html?id=${p.id}'">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price}€</p>
      </div>`;
  });
}


// --- Page Produit ---
if (document.getElementById("productDetails")) {
  const id = new URLSearchParams(location.search).get('id');
  const p = products.find(x => x.id == id);

  document.getElementById("productDetails").innerHTML = `
    <img src="${p.image}" style="width:250px;">
    <h1>${p.name}</h1>
    <p><strong>${p.price}€</strong></p>
    <button class="btn" onclick="addToCart(${p.id})">Ajouter au panier</button>
    <h3>Avis :</h3>
    <ul>${p.reviews.map(r => `<li>${r}</li>`).join("")}</ul>
  `;
}


// --- Panier ---
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Ajouté au panier ✅");
}

if (document.getElementById("cartItems")) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const zone = document.getElementById("cartItems");
  let total = 0;

  cart.forEach(id => {
    const p = products.find(x => x.id == id);
    zone.innerHTML += `<p>${p.name} — ${p.price}€</p>`;
    total += p.price;
  });

  document.getElementById("cartTotal").textContent = total + "€";
}

updateCartCount();


// Cookies
document.getElementById("acceptCookies")?.addEventListener("click", () => {
  document.getElementById("cookieBanner").style.display = "none";
});
