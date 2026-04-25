if(localStorage.getItem("login")!=="true" && !location.pathname.includes("index")){
location="index.html";
}

// CREATE DATA ONCE ONLY
if(!localStorage.getItem("products")){

let base = [
["Engineering Maths","1st Year"],
["Physics","1st Year"],
["Chemistry","1st Year"],
["C Programming","1st Year"],

["Data Structures","2nd Year"],
["DBMS","2nd Year"],
["OOP","2nd Year"],

["Operating Systems","3rd Year"],
["Computer Networks","3rd Year"],
["Software Engineering","3rd Year"],

["Machine Learning","4th Year"],
["Cloud Computing","4th Year"],
["IoT","4th Year"]
];

let data=[];

base.forEach(s=>{
let count = Math.floor(Math.random()*4)+1;

for(let i=0;i<count;i++){
data.push({
name:s[0],
year:s[1],
price:100+Math.floor(Math.random()*400),
contact:"98"+Math.floor(100000000+Math.random()*900000000),
available:count
});
}
});

localStorage.setItem("products",JSON.stringify(data));
}

function get(){
return JSON.parse(localStorage.getItem("products"))||[];
}

function show(){

let list=document.getElementById("list");
let search=document.getElementById("search")?.value.toLowerCase()||"";
let filter=document.getElementById("filter")?.value||"";

list.innerHTML="";

let data=get()
.filter(p=>p.name.toLowerCase().includes(search))
.filter(p=>filter===""||p.year===filter);

data.forEach((p,i)=>{
list.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>${p.year}</p>
<p>₹${p.price}</p>
<p>Available: ${p.available}</p>

<a href="https://wa.me/91${p.contact}">
<button>Contact</button></a>

<button onclick="add(${i})">Cart</button>
</div>
`;
});
}

function add(i){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(get()[i]);
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added");
}

function showCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let total=0;

cart.forEach(p=>{
document.getElementById("cart").innerHTML+=
`<p>${p.name} - ₹${p.price}</p>`;
total+=p.price;
});

document.getElementById("total").innerText="Total ₹"+total;
}

function logout(){
localStorage.removeItem("login");
location="index.html";
}

window.onload=show;