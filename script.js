if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// CREATE DATA ONLY ONCE
if(!localStorage.getItem("products")){

let subjects = [
["Engineering Mathematics","1st Year"],
["Engineering Physics","1st Year"],
["Engineering Chemistry","1st Year"],
["Programming in C","1st Year"],

["Data Structures","2nd Year"],
["DBMS","2nd Year"],
["OOP Java","2nd Year"],

["Operating Systems","3rd Year"],
["Computer Networks","3rd Year"],
["Software Engineering","3rd Year"],

["Machine Learning","4th Year"],
["Cloud Computing","4th Year"],
["IoT Systems","4th Year"]
];

let img="https://via.placeholder.com/300x200";

let data=[];

subjects.forEach(s=>{
let available = Math.floor(Math.random()*5)+1;

for(let i=0;i<available;i++){
data.push({
name:s[0],
year:s[1],
price:100+Math.floor(Math.random()*400),
contact:"98"+Math.floor(100000000+Math.random()*900000000),
available:available,
image:img
});
}
});

localStorage.setItem("products",JSON.stringify(data));
}

function get(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// SHOW PRODUCTS
function show(){

let list=document.getElementById("list");
let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

list.innerHTML="";

let data=get()
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.year===filter);

data.forEach((p,i)=>{
list.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${p.year}</p>
<p>₹${p.price}</p>
<p>Available: ${p.available}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="add(${i})">Add Cart</button>
</div>
`;
});
}

// ADD CART
function add(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(get()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

// SHOW CART
function showCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

let box=document.getElementById("cart");
box.innerHTML="";

cart.forEach((p,i)=>{
box.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>${p.year}</p>
<p>₹${p.price}</p>

<button onclick="removeItem(${i})">Remove</button>
</div>
`;
total+=p.price;
});

document.getElementById("total").innerText="Total ₹"+total;
}

// REMOVE ITEM
function removeItem(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
showCart();
}

// ONLINE PAYMENT (FAKE)
function payNow(){
if(confirm("Proceed to pay?")){
setTimeout(()=>{
alert("Payment Successful ✔");
localStorage.removeItem("cart");
location.reload();
},1500);
}
}

// LOGOUT
function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;