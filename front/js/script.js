fetch("http://localhost:3000/api/products")
    .then(resp => {if (resp.ok) {return resp.json()}})              
    .then(obj =>{
        for (let products of obj){
            const item = document.querySelector(".items")
            const link = document.createElement("a");
            item.appendChild(link);
            link.href = "./product.html?id=" + products._id;
            link.appendChild(article);

            const article = document.createElement("article");
            const img = document.createElement("img");
            article.appendChild(img);
            img.src = products.imageUrl;
            img.alt = products.altTxt;

            const h3 = document.createElement("h3");
            article.appendChild(h3);
            h3.textContent = products.name;

            const p = document.createElement("p");
            article.appendChild(p);
            p.textContent = products.description;
        }
    })
