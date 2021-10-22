fetch("http://localhost:3000/api/products")
    .then(function (resp) {
        if (resp.ok) {return resp.json()}
    })
    .then(obj => {
        // Get the id on the URL of the page, retrieve it and put its data
        const url_id = window.location.search
        const urlSearch = new URLSearchParams(url_id)
        const _id = urlSearch.get("id")
        const productSelect = obj.find((element)=> element._id === _id)

        // Select the elements of the HTML file
        const item_img = document.querySelector(".item__img");
        const title = document.querySelector("#title")
        const titlePage = document.querySelector("title")
        const cost = document.querySelector("#price")
        const descript = document.querySelector("#description")

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
        const colors = document.querySelector("#colors")
        let selectColor = productSelect.colors
        for(i = 0; i < selectColor.length; i++){
            const option = document.createElement("option")
            colors.appendChild(option)
            colors.add = (option)
            option.value = [i]
            option.text = selectColor[i]
        }  

        // Select the data for the Local Storage
        const button = document.getElementById("addToCart")
        button.addEventListener("click", event => {
            event.preventDefault();
            let user_choice = {
                image : productSelect.imageUrl,
                altTxt : productSelect.altTxt,
                product : productSelect.name,
                id : productSelect._id,
                number : quantity.value,
                price : productSelect.price
            }

            if(quantity.value == 0){
                alert("Choose a number")
            }
            else{
                // Put the keys and values of "user_choice" in the Local Storage
                let productLocalStorage = JSON.parse(localStorage.getItem("produit") || "[]")
                productLocalStorage.push(user_choice)
                localStorage.setItem("produit", JSON.stringify(productLocalStorage))
                console.log(productLocalStorage)
            }
        })
    })