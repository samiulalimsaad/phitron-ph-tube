let currentCategory = 1000;
const categoryNode = document.querySelector("#category");
const categoryDataNode = document.querySelector("#data");

async function getCategories() {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );

    const { data } = await res.json();
    return data;
}

async function getDataByCategories(id) {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${id}`
    );

    const { data } = await res.json();
    console.log(data);
    return data;
}

async function setCategories() {
    const categories = await getCategories();
    categoryNode.innerHTML = "";
    categories?.map((c) => {
        categoryNode.innerHTML += `
            <button 
                id="${c.category_id}" 
                class="btn ${
                    c.category_id == currentCategory ? "btn-error" : ""
                }" 
                onclick="setCategoriesData('${c.category_id}')" 
            >
                ${c.category}
            </button>
        `;
    });
}

async function setCategoriesData(id = 1000) {
    currentCategory = id;
    setCategories();
    const data = await getDataByCategories(id);
    categoryDataNode.innerHTML = "";
    data?.map((c) => {
        categoryDataNode.innerHTML += `
        <div id="${c.category_id}" class="card card-compact bg-base-100 shadow-xl">
                <figure class="h-52">
                    <img
                        class="object-cover"
                        src="${c.thumbnail}"
                        alt="${c.title}"
                    />
                </figure>
                <div class="card-body">
                    <div class="flex items-center gap-2">
                        <div class="avatar">
                            <div class="w-8 rounded-full">
                                <img
                                    src="${c.authors?.[0]?.profile_picture}"
                                />
                            </div>
                        </div>

                        <h2 class="card-title">${c.title}</h2>
                    </div>
                    <div class="pl-10">
                        <h3 class="">${c.authors?.[0]?.profile_name}</h3>
                        <p class="card-actions">${c.others?.views}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

setCategories();
setCategoriesData();
