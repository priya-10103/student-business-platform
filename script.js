if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 CREATE DATA ONLY ONCE
if(!localStorage.getItem("products")){

let baseSubjects = [
{subject:"Engineering Mathematics",year:"1st Year"},
{subject:"Engineering Physics",year:"1st Year"},
{subject:"Engineering Chemistry",year:"1st Year"},
{subject:"Basic Electrical Engineering",year:"1st Year"},
{subject:"Programming in C",year:"1st Year"},

{subject:"Data Structures",year:"2nd Year"},
{subject:"Digital Electronics",year:"2nd Year"},
{subject:"OOP in Java",year:"2nd Year"},
{subject:"DBMS",year:"2nd Year"},
{subject:"Discrete Mathematics",year:"2nd Year"},

{subject:"Operating Systems",year:"3rd Year"},
{subject:"Computer Networks",year:"3rd Year"},
{subject:"Software Engineering",year:"3rd Year"},
{subject:"Artificial Intelligence",year:"3rd Year"},
{subject:"Microprocessors",year:"3rd Year"},

{subject:"Machine Learning",year:"4th Year"},
{subject:"Cloud Computing",year:"4th Year"},
{subject:"IoT Systems",year:"4th Year"},
{subject:"Big Data Analytics",year:"4th Year"},
{subject:"Final Year Project",year:"4th Year"}
];

let data=[];

// Each subject has random availability count
baseSubjects.forEach(s=>{
let count = Math.floor(Math.random()*6)+1; // 1 to 6 available

for(let i=1;i<=count;i++){
data.push({
subject:s.subject,
year:s.year,
price:100 + Math.floor(Math.random()*500),
contact:"98"+Math.floor(100000000+Math.random()*900000000),
available:count
});
}
});

localStorage.setItem("products",JSON.stringify(data));
}

// GET PRODUCTS
function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// DISPLAY PRODUCTS
function displayProducts(){

let products=getProducts();
let container=document.getElementById("products");

let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

container.innerHTML="";

let filtered = products
.filter(p=>p.subject.toLowerCase().includes(search))
.filter(p=>filter===""||p.year===filter);

if(filtered.length===0){
container.innerHTML="<h2>No products found</h2>";
return;
}

filtered.forEach((p,i)=>{
container.innerHTML+=`
<div class="card">
<h3>${p.subject}</h3>
<p><b>${p.year}</b></p>
<p>₹${p.price}</p>
<p>Available: ${p.available}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
</div>
`;
});
}

// ADD CART
function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

// CART
function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

cart.forEach(p=>{
document.getElementById("cart").innerHTML+=
`<p>${p.subject} (${p.year}) - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

// LOGOUT
function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=displayProducts;