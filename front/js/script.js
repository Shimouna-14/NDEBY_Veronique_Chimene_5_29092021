const item = document.querySelector(".items")
const link = document.createElement("a");
const article = document.createElement("article");
const img = document.createElement("img");
const h3 = document.createElement("h3");
const txt = document.createElement("p");


fetch("http://localhost:3000/api/products")
    .then(resp => {if (resp.ok) {return resp.json()}})              
    .then(obj1 =>{
        item.appendChild(link);
        link.href = "../html/product.html";
        link.appendChild(article);

        article.appendChild(img);
        img.src = obj1[0].imageUrl;
        img.alt = obj1[0].altTxt;
        
        article.appendChild(h3);
        h3.textContent = obj1[0].name;

        article.appendChild(txt);
        txt.textContent = obj1[0].description;
    })
