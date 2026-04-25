// LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 PRELOAD 50 PRODUCTS WITH REAL IMAGES
if(!localStorage.getItem("products")){
let data=[
{name:"Engineering Maths Book",price:300,image:"https://picsum.photos/id/24/200",category:"Books",seller:"Arun",contact:"9876543210"},
{name:"Physics Notebook",price:150,image:"https://picsum.photos/id/25/200",category:"Books",seller:"Kumar",contact:"9876543211"},
{name:"Calculator",price:600,image:"https://picsum.photos/id/26/200",category:"Electronics",seller:"Rahul",contact:"9876543212"},
{name:"Laptop Stand",price:800,image:"https://picsum.photos/id/27/200",category:"Electronics",seller:"Vijay",contact:"9876543213"},
{name:"Lab Coat",price:250,image:"https://picsum.photos/id/28/200",category:"Uniforms",seller:"Priya",contact:"9876543214"},
{name:"Backpack",price:700,image:"https://picsum.photos/id/29/200",category:"Accessories",seller:"Anu",contact:"9876543215"},
{name:"USB Drive",price:400,image:"https://picsum.photos/id/30/200",category:"Electronics",seller:"Ravi",contact:"9876543216"},
{name:"Drawing Kit",price:500,image:"https://picsum.photos/id/31/200",category:"Lab Items",seller:"Siva",contact:"9876543217"},
{name:"Pen Set",price:100,image:"https://picsum.photos/id/32/200",category:"Accessories",seller:"Meena",contact:"9876543218"},
{name:"College Shoes",price:900,image:"https://picsum.photos/id/33/200",category:"Uniforms",seller:"Karthik",contact:"9876543219"}
];

// duplicate to reach 50
for(let i=0;i<40;i++){
data.push({
name:"College Item "+(i+11),
price:200+i*10,
image:"https://picsum.photos/200?random="+i,
category:["Books","Electronics","Lab Items","Accessories","Uniforms"][i%5],
seller:"Student "+i,
contact:"9876543"+(200+i)
});
}

localStorage.setItem("products",JSON.stringify(data));
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

function displayProducts(){
let products=getProducts();
let container=document.getElementById("products");
if(!container) return;

let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")||{value:""};

container.innerHTML="";

products
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter.value===""||p.category===filter.value)
.forEach((p,i)=>{

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>
<p>${p.seller}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
`;

container.appendChild(div);
});
}

function addProduct(){
let p={
name:name.value,
price:price.value,
category:category.value,
seller:seller.value,
contact:contact.value,
image:"https://picsum.photos/200?random="+Math.random()
};

let data=getProducts();
data.push(p);
localStorage.setItem("products",JSON.stringify(data));
alert("Product Added!");
}

function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let c=document.getElementById("cart");
let total=0;

if(!c) return;

cart.forEach(p=>{
c.innerHTML+=`<p>${p.name} - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

function toggleMode(){
document.body.classList.toggle("dark");
}

window.onload=displayProducts;