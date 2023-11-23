const categoryNode = document.querySelector("#category");

async function getCategories() {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );

    const { data } = await res.json();
    return data;
}

async function setCategories() {
    const categories = await getCategories();
    categories?.map((c) => {
        categoryNode.innerHTML += `<button id="${c.category_id}" class="btn"  >${c.category}</button>`;
    });
}

setCategories();
