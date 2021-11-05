const url_id = window.location.search
const urlSearch = new URLSearchParams(url_id)
fetch("http://localhost:3000/api/products/")
    .then(function (resp) {
        if (resp.ok) {return resp.json()}
    })
    .then(obj => {
        // Get the id on the URL of the page, retrieve it and put its data
        const _id = urlSearch.get("id")
        const productSelect = obj.find((element)=> element._id === _id)

        // Select the elements of the HTML file
        const item_img = document.querySelector(".item__img");
        const title = document.querySelector("#title")
        const titlePage = document.querySelector("title")
        const cost = document.querySelector("#price")
        const descript = document.querySelector("#description")
        const colors = document.querySelector("#colors")
        const button = document.querySelector("#addToCart")

        // Add an image in ".item__img"
        const img = document.createElement("img")
        item_img.appendChild(img)
        img.src = productSelect.imageUrl
        img.alt = productSelect.altTxt

        // Add the name of the product in "#title" et "title"
        const name = productSelect.name
        title.innerHTML = name
        titlePage.innerHTML = name

        // AAdd the price in "#price"
        const price = productSelect.price
        cost.innerHTML = price

        // Add the description in "#description"
        const description = productSelect.description
        descript.innerHTML = description

        // Put the elements of the table "colors" by their size
        let selectColor = productSelect.colors
        for(i = 0; i < selectColor.length; i++){
            const option = document.createElement("option")
            colors.appendChild(option)
            colors.add = (option)
            option.value = [i]
            option.text = selectColor[i]
        }

        // Select the data for the Local Storage
        button.addEventListener("click", event => {
            event.preventDefault();
            let user_choice = {
                image : productSelect.imageUrl,
                altTxt : productSelect.altTxt,
                product : productSelect.name,
                id : productSelect._id,
                color : colors.options[colors.selectedIndex].text,
                quantity : quantity.value,
                price : productSelect.price
            }

            if(quantity.value < 1 || quantity.value > 100 || colors.value === ""){
                alert("Choisissez une couleur et un nombre 1 entre 100")
            }
            else{
                // Put the keys and values of "user_choice" in the Local Storage
                let productLocalStorage = JSON.parse(localStorage.getItem("produit"))
                if (productLocalStorage){
                    for (let current of productLocalStorage) {
                        let count = false;
                        if (current.id == user_choice.id && current.color == user_choice.color) {
                            count = true
                            let storage_quantity = parseInt(current.quantity, 10)  
                            let user_quantity = parseInt(user_choice.quantity, 10)
                            let addQuantity = storage_quantity += user_quantity
                            localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                            console.log(productLocalStorage)
                            console.log(addQuantity)

                        } 
                        else {
                            productLocalStorage.push(user_choice)
                            localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                            console.log(productLocalStorage)
                        }
                    }
                }
                else {
                    productLocalStorage = []
                    productLocalStorage.push(user_choice)
                    localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                    console.log(productLocalStorage)
                }
            }
        })
    })