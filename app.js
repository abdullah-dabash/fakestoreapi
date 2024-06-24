function Product(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
}

async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data.map(product => new Product(product.title, product.price, product.description, product.image));
}

function renderProducts(products) {
    const mainSection = document.getElementById("main-section");

    const cards = products.map(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = `Price: $${product.price}`;

        const description = document.createElement("p");
        description.textContent = product.description;

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(image);

        return card; 
    });

    mainSection.append(...cards);
}
async function initializeApp() {
    try {
        const products = await fetchProducts();
        renderProducts(products);
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

initializeApp();
