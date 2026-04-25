// LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// SAFE IMAGE FUNCTION
function getImage(text){
return "https://source.unsplash.com/300x200/?"+encodeURIComponent(text);
}

// CREATE 200+ PRODUCTS (50 EACH YEAR)
if(!localStorage.getItem("products")){

let data=[];

let items = {
"1st Year":["Maths Book","Physics Book","Chemistry Book","Lab Coat","Record Notebook"],
"2nd Year":["DS Book","DBMS Book","Electronics Kit","Keyboard","Mouse"],
"3rd Year":["OS Book","AI Book","Mini Project Kit","Headphones","Power Bank"],
"4th Year":["Project Report","Laptop Bag","Hard Disk","Printer","Formal Dress"]
};

for(let year in items){
items[year].forEach(item=>{
for(let i=1;i<=10;i++){

data.push({
name:item+" "+i,
price:100+Math.floor(Math.random()*900),
image:getImage(item),
category:year,
seller:"Student "+i,
contact:"9876543"+(100+i)
});

}
});
}

localStorage.setItem("products",JSON.stringify(data));
}

// LOGOUT
function logout(){
localStorage.removeItem("login");
location="index.html";
}

// GET PRODUCTS
function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// DISPLAY PRODUCTS
function displayProducts(){

let products=getProducts();
let container=document.getElementById("products");

let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

container.innerHTML="";

let filtered=products
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.category===filter);

if(filtered.length===0){
container.innerHTML="<h2>No products found</h2>";
return;
}

filtered.forEach((p,i)=>{
container.innerHTML+=`
<div class="card">
<img src="${p.image}" onerror="this.src='https://via.placeholder.com/300x200'">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>
<p><b>${p.seller}</b></p>

<a href="https://wa.me/91${p.contact}" target="_blank">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
</div>
`;
});
}

// ADD PRODUCT
function addProduct(){
let p={
name:name.value,
price:price.value,
category:category.value,
seller:seller.value,
contact:contact.value,
image:getImage(name.value)
};

let data=getProducts();
data.push(p);
localStorage.setItem("products",JSON.stringify(data));
alert("Product Added!");
}

// CART
function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

// CART PAGE
function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

cart.forEach(p=>{
document.getElementById("cart").innerHTML+=`<p>${p.name} - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

// LOAD
window.onload=displayProducts;