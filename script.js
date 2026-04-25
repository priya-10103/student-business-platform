
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// CLEAN DATA (NO MIXED OLD DATA)
if(!localStorage.getItem("products")){

let syllabus = {
"CSE":{
"1st Year":["Maths","Physics","Chemistry","Programming","Graphics"],
"2nd Year":["DS","DBMS","OOP","Discrete Maths","Digital Logic"],
"3rd Year":["OS","CN","Software Eng","AI","Microprocessor"],
"4th Year":["ML","Cloud","Cyber Security","Big Data","Project"]
},

"ECE":{
"1st Year":["Maths","Physics","Chemistry","Basic Electronics","C Programming"],
"2nd Year":["Circuits","Signals","Digital Systems","Network Theory","OOP"],
"3rd Year":["Communication","VLSI","Embedded","Control","Microprocessor"],
"4th Year":["IoT","Wireless","AI Electronics","Robotics","Project"]
},

"MECH":{
"1st Year":["Maths","Physics","Chemistry","Engineering Drawing","Workshop"],
"2nd Year":["Thermo","Fluid","Strength","Manufacturing","Machine Drawing"],
"3rd Year":["Heat Transfer","Dynamics","Automobile","CAD/CAM","Mechatronics"],
"4th Year":["Robotics","Energy","Industrial","Advanced Manufacturing","Project"]
},

"EEE":{
"1st Year":["Maths","Physics","Chemistry","Basic Electrical","C Programming"],
"2nd Year":["Machines","Circuits","Electromagnetics","Measurements","Digital Systems"],
"3rd Year":["Power Systems","Control","Power Electronics","Microcontrollers","High Voltage"],
"4th Year":["Smart Grid","Renewable","EV","Automation","Project"]
},

"CIVIL":{
"1st Year":["Maths","Physics","Chemistry","Mechanics","Drawing"],
"2nd Year":["Structural","Surveying","Materials","Fluid","Strength"],
"3rd Year":["Concrete","Transport","GeoTech","Environment","Hydrology"],
"4th Year":["Earthquake","Construction","Urban","Design","Project"]
}
};

let data=[];

for(let dept in syllabus){
for(let year in syllabus[dept]){
syllabus[dept][year].forEach(sub=>{
data.push({
id: crypto.randomUUID(), // 🔥 IMPORTANT FIX
name:sub,
year:year,
dept:dept,
price:100+Math.floor(Math.random()*500),
available:1+Math.floor(Math.random()*5),
contact:"98"+Math.floor(100000000+Math.random()*900000000)
});
});
}
}

localStorage.setItem("products",JSON.stringify(data));
}

// SAFE GET
function get(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// 🔥 FIXED SHOW (NO INDEX BUG)
function show(){

let list=document.getElementById("list");

let search=document.getElementById("search")?.value.toLowerCase()||"";
let year=document.getElementById("year")?.value||"";
let dept=document.getElementById("dept")?.value||"";

list.innerHTML="";

let filtered=get()
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>year===""||p.year===year)
.filter(p=>dept===""||p.dept===dept);

// fallback (NEVER EMPTY PAGE)
if(filtered.length===0){
filtered=get();
}

filtered.forEach((p)=>{
list.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>${p.year} - ${p.dept}</p>
<p>₹${p.price}</p>
<p>Available: ${p.available}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="add('${p.id}')">Cart</button>
</div>
`;
});
}

// 🔥 FIXED CART (USES ID NOT INDEX)
function add(id){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let item=get().find(p=>p.id===id);

cart.push(item);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added");
}

function showCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

let box=document.getElementById("cart");
box.innerHTML="";

cart.forEach((p,i)=>{
box.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>${p.year} - ${p.dept}</p>
<p>₹${p.price}</p>

<button onclick="removeItem(${i})">Remove</button>
</div>
`;
total+=p.price;
});

document.getElementById("total").innerText="Total ₹"+total;
}

function removeItem(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
showCart();
}

function payNow(){
alert("Processing Payment...");
setTimeout(()=>{
alert("Payment Successful ✔");
localStorage.removeItem("cart");
location.reload();
},1200);
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;