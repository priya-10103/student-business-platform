// 🔥 PRELOAD REAL COLLEGE PRODUCTS
if(!localStorage.getItem("products")){
localStorage.setItem("products", JSON.stringify([

{name:"Engineering Maths Book", price:"300", image:"https://source.unsplash.com/200x200/?book", category:"Books", contact:"9876543210"},
{name:"Physics Record Notebook", price:"150", image:"https://source.unsplash.com/200x200/?notebook", category:"Books", contact:"9876543211"},
{name:"Scientific Calculator", price:"600", image:"https://source.unsplash.com/200x200/?calculator", category:"Electronics", contact:"9876543212"},
{name:"Laptop Stand", price:"800", image:"https://source.unsplash.com/200x200/?laptop", category:"Electronics", contact:"9876543213"},
{name:"Lab Coat", price:"250", image:"https://source.unsplash.com/200x200/?lab", category:"Uniforms", contact:"9876543214"},
{name:"ID Card Holder", price:"50", image:"https://source.unsplash.com/200x200/?id-card", category:"Accessories", contact:"9876543215"},
{name:"College Backpack", price:"700", image:"https://source.unsplash.com/200x200/?bag", category:"Accessories", contact:"9876543216"},
{name:"USB Drive 32GB", price:"400", image:"https://source.unsplash.com/200x200/?usb", category:"Electronics", contact:"9876543217"},
{name:"Drawing Sheet Set", price:"120", image:"https://source.unsplash.com/200x200/?drawing", category:"Lab Items", contact:"9876543218"},
{name:"Mini Project Kit", price:"1500", image:"https://source.unsplash.com/200x200/?electronics", category:"Lab Items", contact:"9876543219"},

{name:"C Programming Book", price:"350", image:"https://source.unsplash.com/200x200/?coding", category:"Books", contact:"9876543220"},
{name:"Keyboard", price:"500", image:"https://source.unsplash.com/200x200/?keyboard", category:"Electronics", contact:"9876543221"},
{name:"Mouse", price:"300", image:"https://source.unsplash.com/200x200/?mouse", category:"Electronics", contact:"9876543222"},
{name:"Notebook Pack", price:"200", image:"https://source.unsplash.com/200x200/?notebook", category:"Books", contact:"9876543223"},
{name:"Pen Set", price:"100", image:"https://source.unsplash.com/200x200/?pen", category:"Accessories", contact:"9876543224"},
{name:"Lab Manual", price:"180", image:"https://source.unsplash.com/200x200/?lab", category:"Lab Items", contact:"9876543225"},
{name:"College T-Shirt", price:"300", image:"https://source.unsplash.com/200x200/?tshirt", category:"Uniforms", contact:"9876543226"},
{name:"Water Bottle", price:"150", image:"https://source.unsplash.com/200x200/?bottle", category:"Accessories", contact:"9876543227"},
{name:"Power Bank", price:"900", image:"https://source.unsplash.com/200x200/?powerbank", category:"Electronics", contact:"9876543228"},
{name:"Headphones", price:"1200", image:"https://source.unsplash.com/200x200/?headphones", category:"Electronics", contact:"9876543229"},

{name:"Data Structures Book", price:"400", image:"https://source.unsplash.com/200x200/?book", category:"Books", contact:"9876543230"},
{name:"Bluetooth Speaker", price:"1100", image:"https://source.unsplash.com/200x200/?speaker", category:"Electronics", contact:"9876543231"},
{name:"Graph Notebook", price:"120", image:"https://source.unsplash.com/200x200/?notebook", category:"Books", contact:"9876543232"},
{name:"Lab Goggles", price:"220", image:"https://source.unsplash.com/200x200/?goggles", category:"Lab Items", contact:"9876543233"},
{name:"Uniform Shirt", price:"400", image:"https://source.unsplash.com/200x200/?shirt", category:"Uniforms", contact:"9876543234"},
{name:"College Shoes", price:"900", image:"https://source.unsplash.com/200x200/?shoes", category:"Uniforms", contact:"9876543235"},
{name:"Pen Drive 64GB", price:"700", image:"https://source.unsplash.com/200x200/?usb", category:"Electronics", contact:"9876543236"},
{name:"Geometry Box", price:"250", image:"https://source.unsplash.com/200x200/?geometry", category:"Books", contact:"9876543237"},
{name:"Stapler", price:"80", image:"https://source.unsplash.com/200x200/?stapler", category:"Accessories", contact:"9876543238"},
{name:"White Board Marker", price:"60", image:"https://source.unsplash.com/200x200/?marker", category:"Accessories", contact:"9876543239"},

{name:"Project File", price:"100", image:"https://source.unsplash.com/200x200/?file", category:"Books", contact:"9876543240"},
{name:"Laptop Bag", price:"850", image:"https://source.unsplash.com/200x200/?laptop-bag", category:"Accessories", contact:"9876543241"},
{name:"Printer Ink", price:"500", image:"https://source.unsplash.com/200x200/?printer", category:"Electronics", contact:"9876543242"},
{name:"Engineering Drawing Kit", price:"650", image:"https://source.unsplash.com/200x200/?drawing", category:"Lab Items", contact:"9876543243"},
{name:"College Hoodie", price:"1000", image:"https://source.unsplash.com/200x200/?hoodie", category:"Uniforms", contact:"9876543244"},
{name:"Desk Lamp", price:"600", image:"https://source.unsplash.com/200x200/?lamp", category:"Electronics", contact:"9876543245"},
{name:"Sticky Notes", price:"90", image:"https://source.unsplash.com/200x200/?notes", category:"Accessories", contact:"9876543246"},
{name:"Charger", price:"500", image:"https://source.unsplash.com/200x200/?charger", category:"Electronics", contact:"9876543247"},
{name:"Exam Pad", price:"120", image:"https://source.unsplash.com/200x200/?writing", category:"Books", contact:"9876543248"},
{name:"Mini Fan", price:"450", image:"https://source.unsplash.com/200x200/?fan", category:"Electronics", contact:"9876543249"}

]));
}

// 🔐 LOGIN CHECK
if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// باقي code same (don’t change below)
function logout(){
localStorage.removeItem("login");
location="index.html";
}

function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

function displayProducts(){
let products=getProducts();
let container=document.getElementById("products");
container.innerHTML="";

products.forEach((p,i)=>{
let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<p>${p.category}</p>
<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>
<button onclick="addCart(${i})">Cart</button>
`;

container.appendChild(div);
});
}

function addCart(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(getProducts()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

window.onload=displayProducts;