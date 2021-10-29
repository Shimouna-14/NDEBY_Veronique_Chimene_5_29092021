fetch("http://localhost:3000/api/products")
    .then(resp => {if (resp.ok) {return resp.json()}})
    .then(obj =>{
        // The keys and values of "user_choice" in the Local Storage
        let productLocalStorage = JSON.parse(localStorage.getItem("produit"))

        // If the cart is empty
        if (productLocalStorage == null || productLocalStorage == []) {
            const cart__items = document.querySelector("#cart__items")
            const div = document.createElement("h2")
            cart__items.appendChild(div)
            div.innerHTML = "Le panier est vide"
        }
        // If there is a product in the cart
        else {
            // Display the table information with a loop
            for(i = 0; i < productLocalStorage.length; i++){
                // ------------ Select the element "#cart__items", create and add an article
                const cart__items = document.querySelector("#cart__items")
                const article = document.createElement("article")
                article.className = "cart__item"
                cart__items.appendChild(article)

                // ------------ Create a div "item__img", append in article and add a image
                const item__img = document.createElement("div")
                item__img.className = "cart__item__img"
                article.appendChild(item__img)
                const img = document.createElement("img")
                item__img.appendChild(img)
                img.src = productLocalStorage[i].image
                img.alt = productLocalStorage[i].altTxt

                /* ------------ Create a div "item__content", append in article and create the div "item__content__titlePrice",
                "item__content__settings" and add them in the div */
                const item__content = document.createElement("div")
                item__content.className = "cart__item__content"
                article.appendChild(item__content)

                // ------------ Create a div "item__content__titlePrice", append in the div "item__content"
                const item__content__titlePrice = document.createElement("div")
                item__content__titlePrice.className = "cart__item__content__titlePrice"
                item__content.appendChild(item__content__titlePrice)
                // Create a H2 and a paragraph add in div "item__content__titlePrice"
                const h2 = document.createElement("h2")
                h2.innerHTML = productLocalStorage[i].product + " " + productLocalStorage[i].color + " "
                item__content__titlePrice.appendChild(h2)
                const price = document.createElement("p")
                price.innerHTML = productLocalStorage[i].price * productLocalStorage[i].number + " €" 
                item__content__titlePrice.appendChild(price)

                // ------------ Create a div "item__content__settings", append in the div "item__content"
                const item__content__settings = document.createElement("div")
                item__content__settings.className = "cart__item__content__settings"
                item__content.appendChild(item__content__settings)
                // Create a paragraph and a input add in div "item__content__settings"
                const item__content__settings__quantity = document.createElement("div")
                item__content__settings__quantity .className = "cart__item__content__settings__quantity"
                item__content__settings.appendChild(item__content__settings__quantity)
                const quantity = document.createElement("p")
                quantity.innerHTML = "Qté : "  
                const input = document.createElement("input")
                input.value = productLocalStorage[i].number
                input.type = "number"
                input.min = "1"
                input.max = "100"
                item__content__settings__quantity.appendChild(quantity)
                item__content__settings__quantity.appendChild(input)
                
                // ------ Create a div "item__content__settings__delete", append in the div "tem__content__settings"
                const item__content__settings__delete = document.createElement("div")
                item__content__settings__delete.className = "cart__item__content__settings__delete"
                item__content__settings.appendChild(item__content__settings__delete)
                // Create a paragraph and add in div "item__content__settings__delete"
                const deleteItem = document.createElement("p")
                deleteItem.className = "deleteItem"
                item__content__settings__delete.appendChild(deleteItem)
                deleteItem.innerHTML = "Supprimer"
                // Delete an article refresh the informations 
                let selectID = productLocalStorage[i].id
                deleteItem.addEventListener("click", event => {
                    event.preventDefault()
                    productLocalStorage = productLocalStorage.filter(el => el.id !== selectID)
                    localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                    window.location.reload()
                })

                // ------ Show the number of products
                const totalQuantity = document.querySelector("#totalQuantity")
                totalQuantity.innerHTML = productLocalStorage.length
                
                // ------ Show total price
                let allPrice = []
                for(j = 0; j < productLocalStorage.length; j++){
                    let addPrice = productLocalStorage[j].price * productLocalStorage[j].number
                    allPrice.push(addPrice)
                }
                const reducer = (previousValue, currentValue) => previousValue + currentValue
                let total = allPrice.reduce(reducer, 0)
                const totalPrice = document.querySelector("#totalPrice")
                totalPrice.innerHTML = total
            }
        }
    })