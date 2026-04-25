if(localStorage.getItem("login") !== "true" && !location.pathname.includes("login")){
    window.location = "login.html";
}

function logout(){
    localStorage.removeItem("login");
    location.reload();
}

function getProducts(){
    return JSON.parse(localStorage.getItem("products")) || [];
}

function addProduct(){
    let product = {
        name: name.value,
        price: price.value,
        image: image.value,
        category: category.value,
        contact: contact.value
    };

    let products = getProducts();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    notify("Product Added!");
}

function displayProducts(){
    let products = getProducts();
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    let container = document.getElementById("products");
    container.innerHTML = "";

    if(products.length === 0){
        container.innerHTML = "<h2>No products</h2>";
        return;
    }

    products
    .filter(p => p.name.toLowerCase().includes(search))
    .filter(p => filter === "" || p.category === filter)
    .forEach((p, i) => {

        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>${p.category}</p>

            <a href="https://wa.me/91${p.contact}">
                <button>Contact</button>
            </a>

            <button onclick="addCart(${i})">Cart</button>
            <button onclick="addWishlist(${i})">❤️</button>
            <button onclick="deleteProduct(${i})">Delete</button>
        `;

        container.appendChild(div);
    });

    showStats();
}

function addCart(i){
    let products = getProducts();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(products[i]);
    localStorage.setItem("cart", JSON.stringify(cart));
    notify("Added to Cart");
}

function addWishlist(i){
    let products = getProducts();
    let w = JSON.parse(localStorage.getItem("wishlist")) || [];
    w.push(products[i]);
    localStorage.setItem("wishlist", JSON.stringify(w));
    notify("Added to Wishlist");
}

function deleteProduct(i){
    let products = getProducts();
    products.splice(i,1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function displayCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart");
    let total = 0;

    cart.forEach(p=>{
        container.innerHTML += `<p>${p.name} - ₹${p.price}</p>`;
        total += Number(p.price);
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function toggleMode(){
    document.body.classList.toggle("dark");
}

function showStats(){
    let products = getProducts().length;
    let cart = (JSON.parse(localStorage.getItem("cart"))||[]).length;
    let w = (JSON.parse(localStorage.getItem("wishlist"))||[]).length;

    let stats = document.getElementById("stats");
    if(stats){
        stats.innerHTML = `
        <p>Products: ${products} | Cart: ${cart} | Wishlist: ${w}</p>
        `;
    }
}

function notify(msg){
    let div = document.createElement("div");
    div.innerText = msg;
    div.style.background="green";
    div.style.color="white";
    div.style.padding="10px";
    document.body.appendChild(div);

    setTimeout(()=>div.remove(),2000);
}

window.onload = displayProducts;