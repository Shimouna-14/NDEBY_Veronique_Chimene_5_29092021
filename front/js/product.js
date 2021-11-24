// Get the id on the URL of the page, retrieve it and put its data
const url_id = window.location.search
const urlSearch = new URLSearchParams(url_id)
const id = urlSearch.get("id")
fetch("http://localhost:3000/api/products/" + id)
    .then(resp => {
        if (resp.ok) {return resp.json()}
    })
    .then(productSelect => {
        // // Add an image in ".item__img"
        const item_img = document.querySelector(".item__img");
        let img = `<img src="${productSelect.imageUrl}" alt="${productSelect.altTxt}">`
        item_img.innerHTML = img

        // Add the name of the product in "#title" et "title"
        const title = document.querySelector("#title")
        const titlePage = document.querySelector("title")
        let name = `<h1 id="title">${productSelect.name}</h1>`
        title.innerHTML = name
        titlePage.innerHTML = productSelect.name

        // // AAdd the price in "#price"
        const cost = document.getElementById("price")
        const price = `<span id="price">${productSelect.price}</span>`
        cost.innerHTML = price

        // // Add the description in "#description"
        const descript = document.getElementById("description")
        const description = `<p id="description">${productSelect.description}</p>`
        descript.innerHTML = description

        const button = document.getElementById("addToCart")
        const quantity = document.getElementById("quantity")
        // // Put the elements of the table "colors" by their size
        const colors = document.getElementById("colors")
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
            event.preventDefault()
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
                let productLocalStorage = JSON.parse(localStorage.getItem("product"))
                if (productLocalStorage){
                    let found = false;
                    for (let current of productLocalStorage) {
                        if (current.id == user_choice.id && current.color == user_choice.color) {
                            found = true
                            let storage_quantity = parseInt(current.quantity, 10)  
                            let user_quantity = parseInt(user_choice.quantity, 10)
                            current.quantity = storage_quantity += user_quantity
                            localStorage.setItem("product", JSON.stringify(productLocalStorage))
                            console.log(productLocalStorage)
                        } 
                    }
                    if (!found) {
                        productLocalStorage.push(user_choice)
                        localStorage.setItem("product", JSON.stringify(productLocalStorage))
                        console.log(productLocalStorage)
                    }
                }
                else {
                    productLocalStorage = []
                    productLocalStorage.push(user_choice)
                    localStorage.setItem("product", JSON.stringify(productLocalStorage))
                    console.log(productLocalStorage)
                }
            }
        })
    })