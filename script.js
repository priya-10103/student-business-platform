if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// CREATE DATA (NO REPEATS + MULTI DEPT + MULTI YEAR)
if(!localStorage.getItem("products")){

let years = ["1st Year","2nd Year","3rd Year","4th Year"];
let depts = ["CSE","MECH","ECE","EEE","CIVIL"];

let baseSubjects = [
"Mathematics","Physics","Chemistry","Programming","Engineering Drawing",
"Data Structures","DBMS","Operating Systems","Computer Networks","AI",
"Machine Learning","Cloud Computing","IoT","Software Engineering","Digital Logic"
];

let data=[];

// CREATE UNIQUE COMBINATION (NO DUPLICATES)
years.forEach(y=>{
depts.forEach(d=>{
baseSubjects.forEach(sub=>{

data.push({
name: sub,
year: y,
dept: d,
price: 100 + Math.floor(Math.random()*500),
available: Math.floor(Math.random()*6)+1,
contact:"98"+Math.floor(100000000+Math.random()*900000000)
});

});
});
});

localStorage.setItem("products",JSON.stringify(data));
}

function get(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// SHOW PRODUCTS (NEVER EMPTY)
function show(){

let list=document.getElementById("list");

let search=document.getElementById("search")?.value.toLowerCase()||"";
let year=document.getElementById("year")?.value||"";
let dept=document.getElementById("dept")?.value||"";

list.innerHTML="";

let data=get()
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>year===""||p.year===year)
.filter(p=>dept===""||p.dept===dept);

// ALWAYS SHOW SOMETHING
if(data.length===0){
data=get().slice(0,10);
}

data.forEach((p,i)=>{
list.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>${p.year} | ${p.dept}</p>
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
<p>${p.year} | ${p.dept}</p>
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
alert("Redirecting to UPI...");
setTimeout(()=>{
alert("Payment Successful ✔");
localStorage.removeItem("cart");
location.reload();
},1500);
}

// LOGOUT
function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;