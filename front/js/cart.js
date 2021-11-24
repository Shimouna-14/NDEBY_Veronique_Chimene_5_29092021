fetch("http://localhost:3000/api/products")
    .then(resp => {if (resp.ok) {return resp.json()}})
    .then(obj =>{
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
                        productLocalStorage = productLocalStorage.filter(el => !(el.id == productLocalStorage[d].id && el.color == productLocalStorage[d].color) )
                        localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                        window.location.reload()
                    })
                }

                // Show the number of products
                let allQuantity = []
                for(j = 0; j < productLocalStorage.length; j++){
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
                for(j = 0; j < productLocalStorage.length; j++){
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
                        localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                        window.location.reload()
                    })
                }
            }

            // Formulaire
            const order = document.getElementById("order")
            order.addEventListener("click", event =>{
                event.preventDefault()
                const firstName = document.getElementById("firstName").value.trim()
                const lastName = document.getElementById("lastName").value.trim()
                const address = document.getElementById("address").value.trim()
                const city = document.getElementById("city").value.trim()
                const email = document.getElementById("email").value.trim()
                let form = {
                    firstName : firstName,
                    lastName : lastName,
                    address : address,
                    city : city,
                    email : email
                }

                function messagValid(params) {document.getElementById(`${params}`).textContent = ""}
                function messagError(params) {document.getElementById(`${params}`).textContent = "Veuillez bien remplir le champs"}

                function Fname() {
                    if ((/^[A-Za-z][A-Za-z '-]{2,}$/).test(firstName)) {
                        messagValid('firstNameErrorMsg')
                        return true
                    } else {
                        messagError('firstNameErrorMsg')
                        console.log("ko")
                        return false
                    }
                }

                function Lname() {
                    if ((/^[A-Za-z][A-Za-z '-]{2,}$/).test(lastName)) {
                        messagValid('lastNameErrorMsg')
                        return true
                    } else {
                        messagError('lastNameErrorMsg')
                        return false
                    }
                }

                function Address() {
                    if ((/^[\w][\w '-]+$/).test(address)) {
                        messagValid('addressErrorMsg')
                        return true
                    } else {
                        messagError('addressErrorMsg')
                        return false
                    }
                }

                function City() {
                    if ((/^[A-Za-z][A-Za-z '-]+$/).test(city)) {
                        messagValid('cityErrorMsg')
                        return true
                    } else {
                        messagError('cityErrorMsg')
                        return false
                    }
                }

                function Email() {
                    if ((/^[\w'-]+@{1}[\w'-]+\.{1}[\w]+$/).test(email)) {
                        messagValid('emailErrorMsg')
                        return true
                    } else {
                        messagError('emailErrorMsg')
                        return false
                    }
                }
                
                let command = [productLocalStorage, form]
                // let send = fetch("http://localhost:3000/api/products/", {
                //     method: "POST",
                //     body: command,
                //     headers: {
                //         "Content-Type": "application/json"
                //     }
                // })
                if (Fname() && Lname() && Address() && City() && Email()) {
                    // localStorage.setItem("command", JSON.stringify(command))
                    console.log(command);
                } else {
                    console.log("Ko");
                }
            })
        }
    })