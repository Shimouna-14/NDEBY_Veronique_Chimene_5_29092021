// Get the link information in JSON
fetch("http://localhost:3000/api/products")
    .then(resp => {if (resp.ok) {return resp.json()}})
    
    // Display the table information with a loop
    .then(obj =>{
        for (let products of obj){
            // Select the elements of the HTML file
            const item = document.querySelector(".items")

            // Create a link, an article, an image, an H3, a paragraph and put them
            const link = document.createElement("a");
            item.appendChild(link);
            link.href = "./product.html?id=" + products._id;

            const article = document.createElement("article");
            link.appendChild(article);

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
