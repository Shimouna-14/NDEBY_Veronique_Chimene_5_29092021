const title = document.getElementById("title");
const cost = document.getElementById("price");
const descript = document.getElementById("description");
const color = document.getElementById("colors");
const opt1 = document.createElement("option");
const opt2 = document.createElement("option");
const opt3 = document.createElement("option");
const img = document.querySelector(".item__img");
const image = document.createElement("img");


fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
    .then(function (resp) {
        if (resp.ok) {return resp.json()}
    })
    .then(function (obj) {
        img.appendChild(image);
        image.src = obj.imageUrl;
        image.alt = obj.altTxt;

        const name = obj.name;
        title.innerHTML = name;

        const price = obj.price;
        cost.innerHTML = price;

        const description = obj.description;
        descript.innerHTML = description;

        color.appendChild(opt1);
        opt1.value = obj.colors[0];
        opt1.text = "Blue";
        color.add = (opt1);

        color.appendChild(opt2);
        opt2.value = obj.colors[1];
        opt2.text = "White";
        color.add = (opt2);

        color.appendChild(opt3);
        opt3.value = obj.colors[2];
        opt3.text = "Black";
        color.add = (opt3);
    })