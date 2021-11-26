// The values of "user_choice" in the Local Storage
let productLocalStorage = JSON.parse(localStorage.getItem("product"))

// If the cart is empty
if (productLocalStorage == null || productLocalStorage.length == []) {
    const cart__items = document.getElementById("cart__items")
    let cartEmpty = `<h2>Le panier est vide</h2>`
    cart__items.innerHTML = cartEmpty
}
// If there is a product in the cart
else {
    // Display the table information with a loop
    for (i = 0; i < productLocalStorage.length; i++) {
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
                            <p>${productLocalStorage[i].price * productLocalStorage[i].quantity}€</p>
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
                productLocalStorage = productLocalStorage.filter(el => !(el.id == productLocalStorage[d].id && el.color == productLocalStorage[d].color))
                localStorage.setItem("product", JSON.stringify(productLocalStorage))
                window.location.reload()
            })
        }

        // Show the number of products
        let allQuantity = []
        for (j = 0; j < productLocalStorage.length; j++) {
            let quantity = productLocalStorage[j].quantity
            let addQuantity = parseInt(quantity, 10)
            allQuantity.push(addQuantity)
        }
        const reduce = (previousValue, currentValue) => previousValue + currentValue
        let Qtotal = allQuantity.reduce(reduce, 0)
        const totalQuantity = document.getElementById("totalQuantity")
        totalQuantity.innerHTML = Qtotal

        // Show total price
        let allPrice = []
        for (j = 0; j < productLocalStorage.length; j++) {
            let addPrice = productLocalStorage[j].price * productLocalStorage[j].quantity
            allPrice.push(addPrice)
        }
        const reducer = (previousValue, currentValue) => previousValue + currentValue
        let Ptotal = allPrice.reduce(reducer, 0)
        const totalPrice = document.getElementById("totalPrice")
        totalPrice.innerHTML = Ptotal

        // Add or remove the number of a product            
        const itemQuantity = document.querySelectorAll(".itemQuantity")
        for (let u = 0; u < itemQuantity.length; u++) {
            itemQuantity[u].addEventListener("change", event => {
                let udapteQuantity = event.target
                let quantity = udapteQuantity.value
                productLocalStorage[u].quantity = quantity
                localStorage.setItem("product", JSON.stringify(productLocalStorage))
                window.location.reload()
            })
        }
    }
    // Formulaire
    const order = document.querySelector("#order")
    order.addEventListener("click", event => {
        event.preventDefault()
        const firstName = document.getElementById("firstName").value.trim()
        const lastName = document.getElementById("lastName").value.trim()
        const address = document.getElementById("address").value.trim()
        const city = document.getElementById("city").value.trim()
        const email = document.getElementById("email").value.trim()

        function megError(selectID, msg) {
            document.getElementById(`${selectID}`).textContent = msg
        }

        function checkFisrtName() {
            if ((/^[A-Za-z][A-Za-z '-]{2,}$/).test(firstName)) {
                megError('firstNameErrorMsg', "")
                return true
            } else {
                megError('firstNameErrorMsg', "Bad")
                return false
            }
        }

        function checkLastname() {
            if ((/^[A-Za-z][A-Za-z '-]{2,}$/).test(lastName)) {
                megError('lastNameErrorMsg', "")
                return true
            } else {
                megError('lastNameErrorMsg', "Bad")
                return false
            }
        }

        function checkAddress() {
            if ((/^[\w][\w '-]+$/).test(address)) {
                megError('addressErrorMsg', "")
                return true
            } else {
                megError('addressErrorMsg', "Bad")
                return false
            }
        }

        function checkCity() {
            if ((/^[A-Za-z][A-Za-z '-]+$/).test(city)) {
                megError('cityErrorMsg', "")
                return true
            } else {
                megError('cityErrorMsg', "Bad")
                return false
            }
        }

        function checkEmail() {
            if ((/^[\w\.-]+@[\w\.-]+\.[\w]+$/).test(email)) {
                megError('emailErrorMsg', "")
                return true
            } else {
                megError('emailErrorMsg', "Bad")
                return false
            }
        }

        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        }
        let products = []
        for (i = 0; i < productLocalStorage.length; i++) {
            products.push(productLocalStorage[i].id)
        }

        if (checkFisrtName() && checkLastname() && checkAddress() && checkCity() && checkEmail()) {
            fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify({contact, products}),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    }
                })
                .then(command => {
                    window.location = "./confirmation.html?order=" + command.orderId
                })
        }
    })
}