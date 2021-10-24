let carts = document.querySelectorAll(".add-cart");

let products = [
    {
        name: "black jacket",
        tag: "blackjacket",
        price: 3500,
        inCart: 0
    },
    {
        name: "black t-shirt",
        tag: "blacktshirt",
        price: 150,
        inCart: 0
    },
    {
        name: "blue t-shirt",
        tag: "bluetshirt",
        price: 250,
        inCart: 0
    },
    {
        name: "cream colored hoodie",
        tag: "creamcoloredhoodie",
        price: 2000,
        inCart: 0
    },
    {
        name: "denim shirt",
        tag: "denimshirt",
        price: 1100,
        inCart: 0
    },
    {
        name: "white sweater",
        tag: "whitesweater",
        price: 1700,
        inCart: 0
    },
    {
        name: "white t-shirt",
        tag: "whitetshirt",
        price: 130,
        inCart: 0
    },
    {
        name: "yellow hoodie",
        tag: "yellowhoodie",
        price: 2150,
        inCart: 0
    },
    {
        name: "yellow sweater",
        tag: "yellowsweater",
        price: 1800,
        inCart: 0
    }
];

for(let i=0; i<carts.length; i++)
{
    carts[i].addEventListener("click", () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
        displayCart();
    });
}
function cartNumbers(product){
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem("cartNumbers", productNumbers+1);
    }
    else{
        localStorage.setItem("cartNumbers", 1);
    }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
            cartItems[product.tag].inCart = 0;
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]:product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }
}

function deleteItem(pTag, pPrice, pItems){
    let cart = JSON.parse(localStorage.getItem("productsInCart"));
    let productNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
    let cartCost = JSON.parse(localStorage.getItem("totalCost"));
    console.log(pTag);
    localStorage.setItem("cartNumbers",productNumbers-pItems);
    localStorage.setItem("totalCost",cartCost-pPrice*pItems);
    let newCart = Object.values(cart).filter((item) => item.tag!=pTag);
    localStorage.setItem("productsInCart",JSON.stringify(newCart));
    displayCart();
}

function displayCart(){
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    if(cartItems && productContainer){
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += 
            `<div class="product">
                <div class="icon">
                    <img src="./images/${item.tag}.jpg" class="cartImg">
                    <span class="badge">${item.inCart}</span>
                </div>
                <span class="itemName">${item.name}</span>
                <span class="totalPrice">BDT${item.inCart*item.price}</span>
                <button type="button" onclick="deleteItem('${item.tag}','${item.price}','${item.inCart}')" class="delBtn">
                <ion-icon name="trash-outline"></ion-icon>
                </button>
            </div>`
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <div class="summary">
        <ul>
                <li>
                    <span>Discount</span>
                    <span>BDT 0.00</span>
                </li>
                <li>
                    <span>Subtotal</span>
                    <span>BDT ${cartCost}.00</span>
                </li>
                <li>
                    <span>Vat(0%)</span>
                    <span>BDT 0.00</span>
                </li>
                <li>
                    <span>Total</span>
                    <span>BDT ${cartCost}.00</span>
                </li>
            </ul>
            </div>
            <button type="button" class="btn">
                <span>PAY</span>
                <span>BDT ${cartCost}.00</span>
            </button>
        </div>
        
        `
    }
    // let bin = document.querySelectorAll(".delBtn");

    // for(let i=0; i<bin.length; i++){
    //     bin[i].addEventListener("click", () => {
    //         let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    //         console.log(cartItems);
    //         deleteItem(cartItems[i]);
    //         displayCart();
    //     });
    // }
}




displayCart();

