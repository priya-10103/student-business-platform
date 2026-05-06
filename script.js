
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 CLEAN STRUCTURED DATA (NO MIXING EVER)
if(!localStorage.getItem("products")){

let syllabus = {
"CSE":{
"1st Year":["Maths","Physics","Chemistry","Programming","Engineering Graphics"],
"2nd Year":["DS","DBMS","OOP","Discrete Maths","Digital Logic"],
"3rd Year":["OS","CN","Software Engineering","AI","Microprocessor"],
"4th Year":["Machine Learning","Cloud Computing","Cyber Security","Big Data","Project"]
},

"ECE":{
"1st Year":["Maths","Physics","Chemistry","Basic Electronics","C Programming"],
"2nd Year":["Circuits","Signals","Digital Systems","Network Theory","OOP"],
"3rd Year":["Communication","VLSI","Embedded","Control Systems","Microprocessor"],
"4th Year":["IoT","Wireless","AI Electronics","Robotics","Project"]
},

"MECH":{
"1st Year":["Maths","Physics","Chemistry","Engineering Drawing","Workshop"],
"2nd Year":["Thermodynamics","Fluid Mechanics","Strength of Materials","Manufacturing","Machine Drawing"],
"3rd Year":["Heat Transfer","Dynamics","Automobile","CAD/CAM","Mechatronics"],
"4th Year":["Robotics","Energy Systems","Industrial Engineering","Advanced Manufacturing","Project"]
},

"EEE":{
"1st Year":["Maths","Physics","Chemistry","Basic Electrical","C Programming"],
"2nd Year":["Electrical Machines","Circuits","Electromagnetics","Measurements","Digital Systems"],
"3rd Year":["Power Systems","Control Systems","Power Electronics","Microcontrollers","High Voltage"],
"4th Year":["Smart Grid","Renewable Energy","Electric Vehicles","Automation","Project"]
},

"CIVIL":{
"1st Year":["Maths","Physics","Chemistry","Engineering Mechanics","Drawing"],
"2nd Year":["Structural Analysis","Surveying","Materials","Fluid Mechanics","Strength of Materials"],
"3rd Year":["Concrete Technology","Transportation","Geotechnical","Environmental","Hydrology"],
"4th Year":["Earthquake Engineering","Construction Management","Urban Planning","Design","Project"]
}
};

let data=[];

for(let dept in syllabus){
for(let year in syllabus[dept]){
syllabus[dept][year].forEach(sub=>{
data.push({
id: dept+"_"+year+"_"+sub,   // 🔥 STABLE UNIQUE ID
name: sub,
year: year,
dept: dept,
price: 50 + Math.floor(Math.random()*300),
available: 1 + Math.floor(Math.random()*5),
contact: "98"+Math.floor(100000000 + Math.random()*900000000)
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

// 🔥 SHOW PRODUCTS (NO undefined + NO wrong filter)
function show(){

let list=document.getElementById("list");

let search=document.getElementById("search")?.value.toLowerCase()||"";
let year=document.getElementById("year")?.value||"";
let dept=document.getElementById("dept")?.value||"";

list.innerHTML="";

let data=get()
.filter(p=>p.name && p.dept && p.year)
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>year==="" || p.year===year)
.filter(p=>dept==="" || p.dept===dept);

// 🔥 IMPORTANT: never show undefined / broken data
if(data.length===0){
list.innerHTML="<h3>No matching subjects found</h3>";
return;
}

data.forEach((p)=>{
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

// CART ADD (FIXED ID SYSTEM)
function add(id){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let item=get().find(p=>p.id===id);

if(item){
cart.push(item);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added");
}
}

// CART DISPLAY
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
function payNow() {
    let method = document.querySelector('input[name="payment"]:checked');

    if (!method) {
        alert("Please select a payment method");
        return;
    }

    switch(method.value) {
        case "gpay":
            alert("Redirecting to Google Pay...");
            // simulate redirect
            window.location.href = "https://pay.google.com/";
            break;

        case "phonepe":
            alert("Redirecting to PhonePe...");
            window.location.href = "https://www.phonepe.com/";
            break;

        case "paytm":
            alert("Redirecting to Paytm...");
            window.location.href = "https://paytm.com/";
            break;

        case "card":
            alert("Proceeding with Card Payment...");
            break;

        default:
            alert("Invalid option");
    }
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;
