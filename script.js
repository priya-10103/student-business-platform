if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

// 🔥 AUTO LOAD 50 PRODUCTS
if(!localStorage.getItem("products")){
let sample=[];

let categories=["Books","Electronics","Lab Items","Accessories","Uniforms"];

for(let i=1;i<=50;i++){
sample.push({
name:"College Item "+i,
price:(100+i*10),
image:"https://source.unsplash.com/200x200/?college",
category:categories[i%5],
contact:"98765432"+(10+i)
});
}

localStorage.setItem("products",JSON.stringify(sample));
}

function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

function addProduct(){
let p={
name:name.value,
price:price.value,
image:image.value,
category:category.value,
contact:contact.value
};
let data=getProducts();
data.push(p);
localStorage.setItem("products",JSON.stringify(data));
alert("Added!");
}

function displayProducts(){
let products=getProducts();
let search=document.getElementById("search").value.toLowerCase();
let filter=document.getElementById("filter").value;

let container=document.getElementById("products");
container.innerHTML="";

products
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.category===filter)
.forEach((p,i)=>{

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button>
</a>

<button onclick="addCart(${i})">Cart</button>
<button onclick="deleteProduct(${i})">Delete</button>
`;

container.appendChild(div);
});

showStats();
}

function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

function deleteProduct(i){
let data=getProducts();
data.splice(i,1);
localStorage.setItem("products",JSON.stringify(data));
displayProducts();
}

function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;
let c=document.getElementById("cart");

cart.forEach(p=>{
c.innerHTML+=`<p>${p.name} - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

function toggleMode(){
document.body.classList.toggle("dark");
}

function showStats(){
let p=getProducts().length;
let c=(JSON.parse(localStorage.getItem("cart"))||[]).length;

document.getElementById("stats").innerHTML=
`Products: ${p} | Cart: ${c}`;
}

window.onload=displayProducts;