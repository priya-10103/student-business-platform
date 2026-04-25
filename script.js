if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 FIXED UNIQUE STRUCTURE (NO REPEAT SUBJECTS)
if(!localStorage.getItem("products")){

let subjects = [
{n:"Maths",y:"1st CSE"},
{n:"Physics",y:"1st ECE"},
{n:"Basic Electrical",y:"1st EEE"},
{n:"Engineering Graphics",y:"1st CIVIL"},
{n:"Mechanics",y:"1st MECH"},

{n:"Data Structures",y:"2nd CSE"},
{n:"Digital Electronics",y:"2nd ECE"},
{n:"Thermodynamics",y:"2nd MECH"},

{n:"Operating Systems",y:"3rd CSE"},
{n:"Computer Networks",y:"3rd CSE"},

{n:"Machine Learning",y:"4th CSE"},
{n:"AI Systems",y:"4th CSE"}
];

let data=[];

// UNIQUE + DIFFERENT AVAILABLE VALUES
subjects.forEach(s=>{
let available = Math.floor(Math.random()*4)+1;

data.push({
name:s.n,
year:s.y,
price:100+Math.floor(Math.random()*500),
contact:"98"+Math.floor(100000000+Math.random()*900000000),
available:available
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

<button onclick="add(${i})">Cart</button>
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

// CART SHOW
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
if(confirm("Pay Online?")){
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