if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// FULL ENGINEERING SUBJECT STRUCTURE
if(!localStorage.getItem("products")){

let syllabus = {
"CSE":{
"1st Year":["Engineering Maths","Physics","Chemistry","Programming in C","Basic Electrical"],
"2nd Year":["Data Structures","OOP Java","DBMS","Discrete Maths","Digital Logic"],
"3rd Year":["Operating Systems","Computer Networks","Software Engineering","AI Basics","Microprocessors"],
"4th Year":["Machine Learning","Cloud Computing","Cyber Security","Big Data","Project Work"]
},

"ECE":{
"1st Year":["Engineering Maths","Physics","Chemistry","Basic Electronics","Programming C"],
"2nd Year":["Electronic Circuits","Signals & Systems","Digital Electronics","Network Theory","OOP"],
"3rd Year":["Communication Systems","Microprocessors","VLSI Design","Control Systems","Embedded Systems"],
"4th Year":["IoT","Wireless Networks","AI in Electronics","Robotics","Project Work"]
},

"MECH":{
"1st Year":["Maths","Physics","Engineering Graphics","Workshop","C Programming"],
"2nd Year":["Thermodynamics","Fluid Mechanics","Strength of Materials","Manufacturing","Machine Drawing"],
"3rd Year":["Heat Transfer","Automobile Engineering","Dynamics","CAD/CAM","Mechatronics"],
"4th Year":["Robotics","Industrial Engineering","Energy Systems","Project Work","Advanced Manufacturing"]
},

"EEE":{
"1st Year":["Maths","Physics","Chemistry","Basic Electrical","Programming"],
"2nd Year":["Electrical Machines","Circuit Theory","Electromagnetics","Digital Systems","Measurements"],
"3rd Year":["Power Systems","Control Systems","Power Electronics","Microcontrollers","High Voltage"],
"4th Year":["Smart Grids","Renewable Energy","Electric Vehicles","Project Work","Automation"]
},

"CIVIL":{
"1st Year":["Maths","Physics","Chemistry","Engineering Mechanics","Drawing"],
"2nd Year":["Structural Analysis","Surveying","Building Materials","Fluid Mechanics","Strength of Materials"],
"3rd Year":["Concrete Technology","Transportation Engineering","Geotechnical","Environmental","Hydrology"],
"4th Year":["Earthquake Engineering","Construction Management","Design Projects","Urban Planning","Final Project"]
}
};

let data=[];
let imgAvailable = "NO IMAGE MODE";

for(let dept in syllabus){
for(let year in syllabus[dept]){
syllabus[dept][year].forEach(sub=>{
data.push({
name:sub,
dept:dept,
year:year,
price:100+Math.floor(Math.random()*500),
available:Math.floor(Math.random()*5)+1,
contact:"98"+Math.floor(100000000+Math.random()*900000000)
});
});
}
}

localStorage.setItem("products",JSON.stringify(data));
}

function get(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// SHOW PRODUCTS
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

// REMOVE
function removeItem(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
showCart();
}

// PAY
function payNow(){
alert("Processing Payment...");
setTimeout(()=>{
alert("Payment Successful ✔");
localStorage.removeItem("cart");
location.reload();
},1500);
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;