if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// CREATE ONLY UNIQUE SUBJECTS (NO REPEAT)
if(!localStorage.getItem("products")){

let subjects = [
{n:"Engineering Mathematics",y:"1st Year"},
{n:"Engineering Physics",y:"1st Year"},
{n:"Engineering Chemistry",y:"1st Year"},
{n:"Programming in C",y:"1st Year"},

{n:"Data Structures",y:"2nd Year"},
{n:"DBMS",y:"2nd Year"},
{n:"OOP Java",y:"2nd Year"},

{n:"Operating Systems",y:"3rd Year"},
{n:"Computer Networks",y:"3rd Year"},
{n:"Software Engineering",y:"3rd Year"},

{n:"Machine Learning",y:"4th Year"},
{n:"Cloud Computing",y:"4th Year"},
{n:"IoT Systems",y:"4th Year"}
];

let data=[];

subjects.forEach(s=>{
data.push({
name:s.n,
year:s.y,
price:100+Math.floor(Math.random()*400),
contact:"98"+Math.floor(100000000+Math.random()*900000000),
available:Math.floor(Math.random()*10)+1 // DIFFERENT availability
});
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
alert("Added");
}

// CART
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

// REMOVE
function removeItem(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
showCart();
}

// PAYMENT
function payNow(){
if(confirm("Proceed to payment?")){
alert("Payment Successful ✔");
localStorage.removeItem("cart");
location.reload();
}
}

// LOGOUT
function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;