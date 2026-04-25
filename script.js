// LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// 🔥 GENERATE 200 PRODUCTS
if(!localStorage.getItem("products")){

let data=[];

let items = {
"1st Year":["Maths","Physics","Chemistry","Lab","Notebook"],
"2nd Year":["DS","DBMS","Electronics","Keyboard","Mouse"],
"3rd Year":["OS","AI","Project","Headphones","Powerbank"],
"4th Year":["Final Report","Laptop Bag","Hard Disk","Printer","Dress"]
};

// STATIC IMAGE (ALWAYS WORK)
let img="https://via.placeholder.com/300x200";

for(let year in items){
items[year].forEach(item=>{
for(let i=1;i<=10;i++){   // 5 ×10 = 50 per year

data.push({
name:item+" "+i,
price:100+Math.floor(Math.random()*900),
image:img,
category:year,
seller:"Student "+i,
contact:"9876543"+(100+i)
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

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="addCart(${i})">Cart</button>
</div>
`;
});
}

// ADD
function addProduct(){
let p={
name:name.value,
price:price.value,
category:category.value,
seller:seller.value,
contact:contact.value,
image:"https://via.placeholder.com/300x200"
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
alert("Added");
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