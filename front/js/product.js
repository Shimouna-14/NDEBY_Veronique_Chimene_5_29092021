fetch("http://localhost:3000/api/products")
    .then(function (resp) {
        if (resp.ok) {return resp.json()}
    })
    .then(obj => {
        const url_id = window.location.search
        const urlSearch = new URLSearchParams(url_id)
        const _id = urlSearch.get("id")
        const productSelect = obj.find((element)=> element._id === _id)

        const item_img = document.querySelector(".item__img");
        const img = document.createElement("img")
        item_img.appendChild(img)
        img.src = productSelect.imageUrl
        img.alt = productSelect.altTxt

        const title = document.querySelector("#title")
        const name = productSelect.name
        title.innerHTML = name

        const cost = document.querySelector("#price")
        const price = productSelect.price
        cost.innerHTML = price

        const descript = document.querySelector("#description")
        const description = productSelect.description
        descript.innerHTML = description

        const colors = document.querySelector("#colors")
        let selectColor = productSelect.colors
        for(c = 0; c < selectColor.length; c++){
            const option = document.createElement("option")
            colors.appendChild(option)
            colors.add = (option)
            option.value = [c]
            option.text = selectColor[c]
        }
    })