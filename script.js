// LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 GENERATE 200+ PRODUCTS (50 PER YEAR)
if(!localStorage.getItem("products")){

let data=[];

// YEAR ITEMS (REALISTIC)
let items = {
"1st Year":["Maths Book","Physics Book","Chemistry Book","Lab Coat","Record Notebook","Calculator","Drawing Sheet","Exam Pad","Basic Toolkit","Graph Book"],
"2nd Year":["DS Book","DBMS Book","Electronics Kit","Keyboard","Mouse","Pendrive","Circuit Board","Mini Toolkit","Digital Kit","Power Supply"],
"3rd Year":["OS Book","AI Book","Web Dev Kit","Mini Project Kit","Headphones","Power Bank","Laptop Stand","Router","SSD","Arduino Kit"],
"4th Year":["Project Report","Laptop Bag","Hard Disk","Printer","Formal Dress","Portfolio File","Pen Drive Set","Presentation Clicker","Office Kit","Stationery Box"]
};

// 🔥 UNIQUE IMAGE POOL (WORKING LINKS)
let images=[
"https://images.unsplash.com/photo-1516979187457-637abb4f9353",
"https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
"https://images.unsplash.com/photo-1531297484001-80022131f5a1",
"https://images.unsplash.com/photo-1581093458791-9d09d9c2b9c2",
"https://images.unsplash.com/photo-1484417894907-623942c8ee29",
"https://images.unsplash.com/photo-1519389950473-47ba0277781c",
"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
"https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
];

let imgIndex=0;

// GENERATE
for(let year in items){

items[year].forEach(item=>{

for(let i=1;i<=5;i++){  // 10 items ×5 = 50 per year

data.push({
name:item+" "+i,
price:100+Math.floor(Math.random()*900),
image:images[imgIndex % images.length],
category:year,
seller:"Student "+(i+imgIndex),
contact:"9876543"+(100+imgIndex)
});

imgIndex++;

}

});

}

// SAVE
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
.filter(p=>filter===""||p.category===filter);

if(filtered.length===0){
container.innerHTML="<h2>No products found</h2>";
return;
}

filtered.forEach((p,i)=>{
container.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>
<p><b>${p.seller}</b></p>

<a href="https://wa.me/91${p.contact}" target="_blank">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
</div>
`;
});
}

// ADD PRODUCT
function addProduct(){
let p={
name:name.value,
price:price.value,
category:category.value,
seller:seller.value,
contact:contact.value,
image:images[Math.floor(Math.random()*images.length)]
};

let data=getProducts();
data.push(p);
localStorage.setItem("products",JSON.stringify(data));
alert("Added!");
}

// CART
function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

// CART PAGE
function displayCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

cart.forEach(p=>{
document.getElementById("cart").innerHTML+=`<p>${p.name} - ₹${p.price}</p>`;
total+=Number(p.price);
});

document.getElementById("total").innerText="Total: ₹"+total;
}

window.onload=displayProducts;