fetch("http://localhost:3000/api/products")
    .then(resp => {if (resp.ok) {return resp.json()}})
    .then(obj =>{
        // The keys and values of "user_choice" in the Local Storage
        let productLocalStorage = JSON.parse(localStorage.getItem("produit"))

        // If the cart is empty
        if (productLocalStorage == null || productLocalStorage.length == []) {
            const cart__items = document.getElementById("cart__items")
            let cartEmpty = `<h2>Le panier est vide</h2>`
            cart__items.innerHTML = cartEmpty
        }
        // If there is a product in the cart
        else {
            // Display the table information with a loop
            for(i = 0; i < productLocalStorage.length; i++){
                // Select the id "cart__items", create and add
                const cart__items = document.getElementById("cart__items")
                let cart = `
                <article class="cart__item">
                    <div class="cart__item__img">
                        <img src="${productLocalStorage[i].image}" alt="${productLocalStorage[i].altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${productLocalStorage[i].product}</h2>
                            <p>${productLocalStorage[i].color}</p>
                            <p>${productLocalStorage[i].price}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[i].quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Delete</p>
                            </div>
                        </div>
                    </div>
                </article>`
                cart__items.innerHTML += cart

                const deleteItem = document.querySelectorAll(".deleteItem")
                for (let d = 0; d < deleteItem.length; d++) {
                    deleteItem[d].addEventListener("click", event => {
                        event.preventDefault()
                        // Delete the product selected and updated the informations
                        productLocalStorage = productLocalStorage.filter(el => !(el.id == productLocalStorage[d].id && el.color == productLocalStorage[d].color) )
                        localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                        window.location.reload()
                    })
                }

                // Show the number of products
                const totalQuantity = document.getElementById("totalQuantity")
                totalQuantity.innerHTML = productLocalStorage.length
                // Show total price
                let allPrice = []
                for(j = 0; j < productLocalStorage.length; j++){
                    let addPrice = productLocalStorage[j].price * productLocalStorage[j].quantity
                    allPrice.push(addPrice)
                }
                const reducer = (previousValue, currentValue) => previousValue + currentValue
                let total = allPrice.reduce(reducer, 0)
                const totalPrice = document.getElementById("totalPrice")
                totalPrice.innerHTML = total

                // Add or remove the number of a product*                
                const itemQuantity = document.querySelectorAll(".itemQuantity")
                for (let u = 0; u < itemQuantity.length; u++) {
                    itemQuantity[u].addEventListener("change", event => {
                        let udapteQuantity = event.target
                        let quantity = udapteQuantity.value
                        let price = productLocalStorage[u].price
                        productLocalStorage[u].quantity = quantity
                        price = productLocalStorage[u].price * quantity
                        // localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                        // window.location.reload()
                    })
                }


                // Formulaire
                const order = document.getElementById("order")
                order.addEventListener("click", event =>{
                    event.preventDefault()
                    const firstName = document.getElementById("firstName").value // ^[A-Za-z-']{3,20}+$
                    const lastName = document.getElementById("lastName").value // ^[A-Za-z-']{2,20}+$
                    const address = document.getElementById("address").value // ^[A-Za-z0-9-']+$
                    const city = document.getElementById("city").value // ^([0-9]{5}) ([A-Za-z-']+)$
                    const email = document.getElementById("email").value //

                    let form = {
                        firstName : firstName,
                        lastName : lastName,
                        address : address,
                        city : city,
                        email : email,
                    }
                })
                
            }
        }
    })