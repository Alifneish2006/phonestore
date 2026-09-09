"use strict";

const products=[
    {
    id: 1, 
    name: "iphone 14" ,
    price:350 ,
    category:"smart phone" ,
    desc:"apple smartphone" 
},

{
    id: 2, 
    name: "lenovo thinkpad 11" ,
    price:"600" ,
    category:"laptops" ,
    desc:"lenovo laptops" 

},

{
     id: 3, 
    name: "Ipad pro" ,
    price: 1500 ,
    category:"apple ipads" ,
    desc:"original apple products" 
},

{
    id: 4, 
    name: "airpods 2" ,
    price: 80 ,
    category:"apple earphones " ,
    desc:"original apple products" 
},

{
     id: 5, 
    name: "samsung galaxy S26" ,
    price:"600" ,
    category:"samsung smart phones" ,
    desc:"bbbbbbbbbbbbbbbb" 
}];

const title = document.getElementById("main-title");
const productname = document.getElementById("productName");
const productprice = document.getElementById("productPrice");
const productcat = document.getElementById("productCategory");
const result = document.getElementById("result");

let counter=0;

title.innerHTML="products Management";
title.style.color="BLUE";
title.style.backgroundColor="GRAY";
title.style.padding="10px 30px";

function drawProducts(){
    result.innerHTML="";
    products.forEach(product=>{
       
       console.log("Product: "+"id:" + product.id + "name:" + product.name + " Price: " + product.price + "Category:"+ product.category +"Description:"+ product.desc);
       result.innerHTML += `<div class="myproducts"> id: ${product.id}<br>name: ${product.name} <br>price: $${product.price} 
                            <br>category: ${product.category}<br>description:${product.desc}<br></div>`;
    });

    // part 22
    const productelements = document.querySelectorAll(".myproducts");

    for(let i=0;i<productelements.length; i++){

        productelements[i].style.backgroundColor="blue";
        productelements[i].style.color="white";
        productelements[i].style.padding= "10px 30px";
        productelements[i].style.margin="10px";
   
    }
}

function addProduct() {

    try {
        const name = productname.value.trim();
        const price = productprice.value.trim();
        const cat = productcat.value.trim();

        if (!name || !price || !cat) {
            throw new Error("All fields are required");
        }

        products.push({
            id: products.length + 1,
            name: name,
            price: Number(price),
            category: cat
        });

        drawProducts();

    } catch (error) {
        result.innerHTML = error.message;
        result.style.color = "red";
    }
}

function deleteLastProduct(){
    if (products.length > 0){
        products.pop();
    }

    drawProducts();
}

function calculateTotal(){
    let total=0;
    result.innerHTML="";
    products.forEach(product=>{
        total += Number(product.price);
        result.innerHTML = " Total price: "+ total;
    });
}

const onlynames= products.map(product=>{
    return product.name;
});
result.innerHTML="product names :" + onlynames ;
console.log(onlynames);


function showExpensiveProducts(){

    const pricefilter = products.filter(product=>{
        return product.price >100;
    });

    result.innerHTML="";
    pricefilter.forEach(product=>{
        result.innerHTML += `id:${product.id}<br> product name: ${product.name} <br> price: $${product.price}<br><br>`; 
    });
}


function findbyid(){

    const find = products.find(product=>{
        return product.id == 2;
    });

    console.log(find);


}

findbyid(2);

function checkProducts(){

    const check = products.some(product=>{
        return product.price > 500;
    });

    const check2= products.every(product=>{
        return product.price > 0;
    });

    result.innerHTML="";
    if(check && check2){
        result.innerHTML="true";
        console.log("true");
        return;
    }else{
        console.log("true");
        result.innerHTML="false";
    }
}


function sortProductsByPrice(){

     products.sort((a,b)=>{
        return a.price - b.price;
    });

    result.innerHTML="";

    products.forEach(product=>{
        result.innerHTML += `${product.name} - $${product.price}<br>`;
    });
}

var fruits = ["banana", "apple", "orange", "mango"];
fruits.sort((a,b)=>{
    return a.localeCompare(b);
});

console.log(fruits);


function oddEven(){

    let arrayofnbs=[1,2,15,6,9,10,22,4,8];

    for(let i=0;i<arrayofnbs.length;i++){
    
        if(arrayofnbs[i] % 2 ==0){
            console.log("even nb:" + arrayofnbs[i]);
        }else{
            console.log("odd nb:" + arrayofnbs[i]);
        }
    }
}

oddEven();



// part 15

const text = "   Hello JavaScript World   ";

const splitText = text.split(" ");
console.log(splitText);

const slicedText = text.slice(3, 8);
console.log(slicedText);

const lowerText = text.toLowerCase();
console.log(lowerText);

const upperText = text.toUpperCase();
console.log(upperText);

const trimmedText = text.trim();
console.log(trimmedText);

const position = text.indexOf("JavaScript");
console.log(position);

if (text.indexOf("JavaScript") !== -1) {
    console.log("The word exists");
} else {
    console.log("The word does not exist");
}


// part 16
const number = 7.6;

console.log("Round:", Math.round(number));
console.log("Power:", Math.pow(2, 3));
console.log("Square root:", Math.sqrt(25));
console.log("Ceil:", Math.ceil(number));
console.log("Floor:", Math.floor(number));
console.log("Random:", Math.random());

const randomNumber = Math.floor(Math.random() * 1000) + 1;

console.log("Random number from 1 to 1000:", randomNumber);



// part 17

const student = {
    name: "Hasan",
    age: 22,
    course: "Full Stack Development",

    showInfo: function() {
        return `Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`;
    }
};

console.log(student.showInfo());

console.log(Object.keys(student));
console.log(Object.values(student));
console.log(Object.entries(student));


// part 18

// object literal

const car={
    id: 1,
    name: "BMW",
    color: "black"
};

const person = {
    name: "hasan",
    age: 22,
    city: "beirut"
};


// 'new object()'

// const person = new Object();
// person.name("Hasan");
// person.age(21);
// person.city("jieh");


// constructor function

function player(name, age, team){
    this.name=name;
    this.age=age;
    this.team=team;
}

const player1=new player(
    "hasan",
    22,
    "Barcalona"
);

const player2 = new player(
    "ali",
    25,
    "Real madrid"
);


function pers(name,age,city){
    this.name=name;
    this.age=age;
    this.city=city;
}

const person1=new pers(
    "hasan",
    22,
    "Beirut"
);

const person2=new pers(
    "ali",
    16,
    "beirut"
);


// part 16

// const cart={
//     products:["phone","laptop","airpods","charger"]
// };

// const showproducts = cart.forEach(product=>{
//     const pro= product.products;
//     console.log(pro);
// });

// const total=0;


// part 17

// reassignment
let x=4;
x=3;
console.log(x);

var y=3;
y=2;
console.log(y);

const z=7;
// z=9;
console.log(z);

// Redeclaration
var b= 5;
var b = 10;
console.log(b);

let c= 9;
// let c= 10;
console.log(c);

const a= 6;
// const a=0;
console.log(a);

// Block scope

if (true){
    let nameblock= "hasan";
    const ageblock= 22;

    console.log(nameblock);
    console.log(ageblock);
}

// console.log(nameblock);
// console.log(ageblock);

if (true){
    var d=7;
}
console.log(d);

// function scope

function testscope(){
    let xnb=9;
    let yname="hasan";

    console.log(yname+xnb);
}

testscope();
// console.log(yname + xnb);

function testvarscope(){
    if(true){
        var vtsco="hhhhh";
    }
    console.log(vtsco);
}

testvarscope();

// Hoisting

sayhi();
function sayhi(){
    console.log("hi");
}

console.log(hvar);
var hvar=17;

// console.log(hlet);
let hlet=29;



// part 21


const thirdproduct = document.querySelector("#product_set");
thirdproduct.setAttribute("data-price","1000");

console.log(thirdproduct.getAttribute("data-price"));



// part 23
let closeopen;
function openFacebook(){
    closeopen = window.open("https://www.facebook.com/","_blank");
}

function closeFacebook(){
    closeopen.window.close("https://www.facebook.com/","_blank");
}


// part 24

function showScreenInfo(){
    result.innerHTML+=`<br><br><h3>Screen Info :</h3>Screen width: ${screen.width}px<br>screen height: ${screen.height}px<br>screen avilawidth: ${screen.availWidth}px<br>screen avilheight: ${screen.availHeight}px`;
}

// part 25

function goToGoogle(){
    location.href="https://www.google.com/"
}


// part 26

var timeout;
var interval;

function startTimeout(){
    timeout= setTimeout(function(){
        alert("hi")
    },3000);
}

function stopTimeout(){
    clearTimeout(timeout);
}

var counterr=0;
var sc;
function startCounter(){
    sc = setInterval(function(){
        counterr++
        document.querySelector("#counter").innerHTML= counterr;
    },3000);
}

function stopCounter(){
    clearInterval(sc);
}



// part 27

function loadPosts() {
    const load = new XMLHttpRequest();

    load.onreadystatechange = function () {

        if (load.readyState === 4) {

            if (load.status === 200) {

                const posts = JSON.parse(load.responseText);

                result.innerHTML = "";

                for (let i = 0; i < 5; i++) {
                    result.innerHTML += `
                        <h3>${posts[i].title}</h3>
                        <p>${posts[i].body}</p>
                        <hr>
                    `;
                }

            } else if (load.status === 404) {
                result.innerHTML = "Error 404: Page not found";

            } else if (load.status === 500) {
                result.innerHTML = "Error 500: Server error";
            }
        }
    };

    load.open(
        "GET",
        "https://jsonplaceholder.typicode.com/posts",
        true
    );

    load.send();
}


// part 28
function parseData() {
    try {
        const data = JSON.parse('{"name":"Hasan"}');

        result.innerHTML = data.name;

    } catch (error) {
        result.innerHTML = "Error: Invalid JSON";
    }
}





// bonus

const extraproducts = [
    {
        id: 1,
        name: "iPhone 14",
        price: 350,
        category: "electronics"
    },
    {
        id: 2,
        name: "Laptop",
        price: 600,
        category: "electronics"
    },
    {
        id: 3,
        name: "AirPods",
        price: 150,
        category: "accessories"
    }
];

function filterByCategory(category) {

    const filteredProducts = extraproducts.filter(product => {
        return product.category === category;
    });

    result.innerHTML = "";

    filteredProducts.forEach(product => {
        result.innerHTML += `
            <div class="myproducts">
                id: ${product.id}<br>
                name: ${product.name}<br>
                price: $${product.price}<br>
                category: ${product.category}<br>
            </div>
        `;
    });
}


