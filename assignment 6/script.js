

const title = document.getElementById("main-title");
const products = document.querySelectorAll(".product");
const result= document.getElementById("result");


title.innerText="Assignment 6";
title.style.color = "GREEN"; 
title.style.backgroundColor = "black";
title.style.padding="10px 30px";

products[2].setAttribute("data-price", "700");

for(let i=0;i<products.length;i++){
    products[i].style.backgroundColor="GREEN";
    products[i].style.color="white";
    products[i].style.padding="10px 30px";
    products[i].style.margin="10px";
}

function showProducts(){
    result.innerHTML = "";
    for(let i=0;i<products.length;i++){
        

        const name= products[i].textContent;
        const price = products[i].getAttribute("data-price");

        result.innerHTML += `${name} - $${price} <br>`;
        
    }
}

function calculateTotal(){
    result.innerHTML="";
    let total=0;
    products.forEach(product =>{ 
        const price =Number(product.getAttribute("data-price"));
        const name = product.textContent;
        result.innerHTML += `${name} - $${price} <br>`;
        total += price;
    });
    result.innerHTML += `<hr>Total price: $${total}`;
}

function randomDiscount(){
    result.innerHTML = "";
    let percent = Math.min(20, 50);

    products.forEach(product => {
        let price = Number(product.getAttribute("data-price"));

        let newPrice = price - (price * percent / 100);

        newPrice = Math.round(newPrice);
        newPrice = Math.max(newPrice, 0);
        product.setAttribute("data-price", newPrice);
        result.innerHTML += `${product.textContent} - $${newPrice}<br>`;
    });
    
}


// part 8

var x="hasan al ammar";
var y="HASAN";
console.log(x.split(0,4));
console.log(x.trim());
console.log(y.toLocaleLowerCase());
console.log(x.toLocaleUpperCase());
if(x.indexOf("hasan") != 10){
    console.log("found");

}
else{
    console.log("not found");

}


// part 9


var array1=["hasan", "ali", "sara" ];
console.log(array1.pop());
console.log(array1.push("rhea"));
console.log(array1.unshift());
console.log(array1.shift());

array1.forEach(function (a) {
    console.log(a);

});


// part 10

var obj={
    name: "hasan",
    age: 21,
    code: function (){
       console.log(`my name is` + this.name +" and i am" + this.age +"years old. ")
    }
}

obj.code();
    
// part 11





// part 12
function loadPosts() {
    const load = new XMLHttpRequest();

    load.onreadystatechange = function () {

        if (load.readyState === 4) {

            if (load.status === 200) {

                const posts = JSON.parse(load.responseText);

                let output = "";

                for (let i = 0; i < 5; i++) {
                    output += `
                        <h3>${posts[i].title}</h3>
                        <p>${posts[i].body}</p>
                        <hr>
                    `;
                }

                document.getElementById("result").innerHTML = output;

            } else if (load.status === 404) {
                document.getElementById("result").innerHTML = "Error 404: Page Not Found";

            } else if (load.status === 500) {
                document.getElementById("result").innerHTML = "Error 500: Internal Server Error";
            }
        }
    };

    load.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    load.send();
}


// bounus

products.forEach(product => {
    product.addEventListener("click", function () {
        product.style.backgroundColor = "orange";
    });
});