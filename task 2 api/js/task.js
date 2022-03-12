// api key a8c3234e03f4448f8097caf7bce06f4e

const api = (apiUrl, callback) => {
    fetch(apiUrl).then((res) => {
        res.json().then((reselt => callback(reselt, false))).catch((e) => { callback(false, e.message) })
    }).catch((e) => {
        callback(false , e.message)
    })
}

const creatMyOwnElements = (parent, htmlElement, txt, classes, attr) => {
    const myEle = document.createElement(htmlElement)
    parent.appendChild(myEle)
    if (txt) myEle.innerText = txt
    if (classes) myEle.className = classes
    if (attr) {
        myEle.setAttribute(attr.key, attr.val)
    }
    return myEle
};

const article = document.getElementById("article");
api("https://newsapi.org/v2/top-headlines?country=EG&apiKey=a8c3234e03f4448f8097caf7bce06f4e", (result, error) => {
    // console.log(result, error);
    if (result) {
        // console.log(result.articles);
        result.articles.forEach(art => {
            const card = creatMyOwnElements(article, "div", null, "card", { key: "style", val: "width:80vw;" })
            const author = creatMyOwnElements(card, "h6", art.author ?? "no author", "card-body", null)
            const img = creatMyOwnElements(card, "img", null, "card-img-top w-75", { key: "src", val: art.urlToImage ?? "https://image.shutterstock.com/z/stock-photo-api-application-programming-interface-software-development-tool-information-technology-and-1232339545.jpg" })
            const cardBody = creatMyOwnElements(card, "div", null, "card-body", null)
            const h5 = creatMyOwnElements(cardBody, "h5", art.title, "card-title", null)
            const p = creatMyOwnElements(cardBody, "p", art.description, "card-text", null)
            const a = creatMyOwnElements(cardBody, "a", "المصدر", "btn btn-primary", { key: "href", val: art.url })
            a.setAttribute("target", "_blank")
            const p2 = creatMyOwnElements(cardBody, "p", art.publishedAt, "card-text", null)

        });
    }
    else if (error) {
        console.log(error);
    }
})
