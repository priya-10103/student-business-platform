// LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 GENERATE 200 UNIQUE ENGINEERING PRODUCTS
if(!localStorage.getItem("products")){

let subjects = {
"1st Year":[
"Engineering Mathematics I",
"Engineering Physics",
"Engineering Chemistry",
"Basic Electrical Engineering",
"Programming in C"
],

"2nd Year":[
"Data Structures",
"Digital Electronics",
"Object Oriented Programming",
"Database Management Systems",
"Discrete Mathematics"
],

"3rd Year":[
"Operating Systems",
"Computer Networks",
"Artificial Intelligence",
"Software Engineering",
"Microprocessors"
],

"4th Year":[
"Machine Learning",
"Cloud Computing",
"IoT Systems",
"Big Data Analytics",
"Final Year Project"
]
};

let data=[];
let img="https://via.placeholder.com/300x200";

// 50 products per year = 10 repeats per subject (NO SAME NAME BLINDLY — we vary index)
for(let year in subjects){
subjects[year].forEach(sub=>{
for(let i=1;i<=10;i++){

data.push({
name: sub + " - Module " + i,
price: 50 + Math.floor(Math.random()*450),
year: year,
contact: "98" + Math.floor(10000000 + Math.random()*90000000),
image: img
});

}
});
}

localStorage.setItem("products",JSON.stringify(data));
}

// LOGOUT
function logout(){
localStorage.removeItem("login");
location="index.html";
}

// GET
function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

// DISPLAY
function displayProducts(){

let products=getProducts();
let container=document.getElementById("products");

let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

container.innerHTML="";

let filtered=products
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.year===filter);

if(filtered.length===0){
container.innerHTML="<h2>No products found</h2>";
return;
}

filtered.forEach((p,i)=>{
container.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p><b>${p.year}</b></p>
<p>₹${p.price}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
</div>
`;
});
}

// CART
function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

// CART DISPLAY
function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

cart.forEach(p=>{
document.getElementById("cart").innerHTML+=
`<p>${p.name} (${p.year}) - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

window.onload=displayProducts;