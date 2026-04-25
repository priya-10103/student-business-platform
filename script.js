// 🔐 LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 PRELOAD 50 PRODUCTS
if(!localStorage.getItem("products")){
let sample=[];
let categories=["Books","Electronics","Lab Items","Accessories","Uniforms"];

for(let i=1;i<=50;i++){
sample.push({
name:"College Item "+i,
price:100+i*10,
image:"https://picsum.photos/200?random="+i,
category:categories[i%5],
contact:"98765432"+(10+i)
});
}

localStorage.setItem("products",JSON.stringify(sample));
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// ✅ FIXED DISPLAY
function displayProducts(){

let products=getProducts();
let container=document.getElementById("products");
if(!container) return;

let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

container.innerHTML="";

let filtered=products
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.category===filter);

if(filtered.length===0){
container.innerHTML="<h2>No matching products</h2>";
return;
}

filtered.forEach((p,i)=>{

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<img src="${p.image}" onerror="this.src='https://via.placeholder.com/150'">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>

<a href="https://wa.me/91${p.contact}" target="_blank">
<button>Contact</button>
</a>

<button onclick="addCart(${i})">Cart</button>
<button onclick="deleteProduct(${i})">Delete</button>
`;

container.appendChild(div);
});

showStats();
}

// CART
function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

// DELETE
function deleteProduct(i){
let data=getProducts();
data.splice(i,1);
localStorage.setItem("products",JSON.stringify(data));
displayProducts();
}

// CART PAGE
function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let c=document.getElementById("cart");
let total=0;

if(!c) return;

c.innerHTML="";

cart.forEach(p=>{
c.innerHTML+=`<p>${p.name} - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

// DARK MODE
function toggleMode(){
document.body.classList.toggle("dark");
}

// STATS
function showStats(){
let p=getProducts().length;
let c=(JSON.parse(localStorage.getItem("cart"))||[]).length;

let stats=document.getElementById("stats");
if(stats){
stats.innerHTML=`Products: ${p} | Cart: ${c}`;
}
}

// LOAD
window.onload=function(){
displayProducts();
displayCart();
}