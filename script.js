function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let contact = document.getElementById("contact").value;

    let products = getProducts();

    products.push({ name, price, contact });

    localStorage.setItem("products", JSON.stringify(products));

    alert("Product Added Successfully!");
}

function displayProducts() {
    let products = getProducts();
    let container = document.getElementById("products");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {
        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>Contact: ${p.contact}</p>
        `;
        container.appendChild(div);
    });
}

function searchProduct() {
    let input = document.getElementById("search").value.toLowerCase();
    let products = getProducts();
    let container = document.getElementById("products");

    container.innerHTML = "";

    products
        .filter(p => p.name.toLowerCase().includes(input))
        .forEach(p => {
            let div = document.createElement("div");
            div.innerHTML = `
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <p>Contact: ${p.contact}</p>
            `;
            container.appendChild(div);
        });
}

window.onload = displayProducts;