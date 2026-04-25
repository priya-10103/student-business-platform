// LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 GENERATE 200+ PRODUCTS
if(!localStorage.getItem("products")){

let data=[];

let items = {
"1st Year":["Maths Book","Physics Book","Chemistry Book","Lab Coat","Record Notebook","Calculator"],
"2nd Year":["DS Book","DBMS Book","Electronics Kit","Keyboard","Mouse","Pendrive"],
"3rd Year":["OS Book","AI Book","Mini Project Kit","Laptop Stand","Headphones","Power Bank"],
"4th Year":["Project Report","Laptop Bag","Hard Disk","Printer","Formal Dress","Stationery"]
};

let imgId=10;

for(let year in items){
items[year].forEach(item=>{
for(let i=1;i<=10;i++){ // 6 items ×10 = 60 per year

data.push({
name:item+" "+i,
price:100+Math.floor(Math.random()*1000),
image:"https://picsum.photos/id/"+(imgId++)+"/200",
category:year,
seller:"Student "+i,
contact:"9876543"+(100+i)
});

}
});
}

localStorage.setItem("products",JSON.stringify(data));
}

// FUNCTIONS
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

let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

container.innerHTML="";

products
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.category===filter)
.forEach((p,i)=>{

container.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>
<p>${p.seller}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
</div>
`;

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
alert("Added!");
}

function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

cart.forEach(p=>{
document.getElementById("cart").innerHTML+=`<p>${p.name} - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

window.onload=displayProducts;