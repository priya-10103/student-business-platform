
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// CLEAN DATA BUILD (NO undefined EVER)
if(!localStorage.getItem("products")){

let syllabus = {
"CSE": {
"1st Year":["Maths I","Physics","Chemistry","Programming Basics","Engineering Graphics"],
"2nd Year":["Data Structures","DBMS","OOP","Digital Logic","Discrete Maths"],
"3rd Year":["OS","CN","Software Engineering","AI","Microprocessors"],
"4th Year":["ML","Cloud Computing","Cyber Security","Big Data","Project"]
},

"ECE": {
"1st Year":["Maths I","Physics","Chemistry","Basic Electronics","C Programming"],
"2nd Year":["Circuits","Signals","Digital Systems","Network Theory","OOP"],
"3rd Year":["Communication","Microprocessors","VLSI","Control Systems","Embedded"],
"4th Year":["IoT","Wireless","AI Electronics","Robotics","Project"]
},

"MECH": {
"1st Year":["Maths I","Physics","Chemistry","Engineering Drawing","Workshop"],
"2nd Year":["Thermodynamics","Fluid Mechanics","Strength","Manufacturing","Machine Drawing"],
"3rd Year":["Heat Transfer","Dynamics","Automobile","CAD/CAM","Mechatronics"],
"4th Year":["Robotics","Energy Systems","Industrial Engg","Advanced Manufacturing","Project"]
},

"EEE": {
"1st Year":["Maths I","Physics","Chemistry","Basic Electrical","C Programming"],
"2nd Year":["Electrical Machines","Circuits","Electromagnetics","Measurements","Digital Systems"],
"3rd Year":["Power Systems","Control Systems","Power Electronics","Microcontrollers","High Voltage"],
"4th Year":["Smart Grid","Renewable Energy","EV Systems","Automation","Project"]
},

"CIVIL": {
"1st Year":["Maths I","Physics","Chemistry","Engineering Mechanics","Drawing"],
"2nd Year":["Structural","Surveying","Materials","Fluid Mechanics","Strength"],
"3rd Year":["Concrete","Transportation","Geotechnical","Environmental","Hydrology"],
"4th Year":["Earthquake","Construction","Urban Planning","Design","Project"]
}
};

let data=[];

// build dataset
for(let dept in syllabus){
for(let year in syllabus[dept]){
syllabus[dept][year].forEach(sub=>{
data.push({
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

function get(){
let d = JSON.parse(localStorage.getItem("products"))||[];

// 🔥 FIX OLD BAD DATA (prevents undefined forever)
return d.map(p=>({
name:p.name || "Unknown Subject",
year:p.year || "1st Year",
dept:p.dept || "CSE",
price:p.price || 100,
available:p.available || 1,
contact:p.contact || "9999999999"
}));
}

// 🔥 SHOW FUNCTION (FIXED FILTER + NO EMPTY BUG)
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

// 🔥 IMPORTANT FIX: if empty → show ALL instead of blank
if(data.length===0){
data=get();
}

data.forEach((p,i)=>{
list.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>${p.year} - ${p.dept}</p>
<p>₹${p.price}</p>
<p>Available: ${p.available}</p>

<button onclick="add(${i})">Cart</button>
</div>
`;
});
}

// CART
function add(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(get()[i]);
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
alert("Processing...");
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