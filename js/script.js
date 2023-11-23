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

function convertMilliseconds(milliseconds) {
    // Convert milliseconds to seconds
    let seconds = Math.floor(milliseconds / 1000);

    // Calculate days, hours, minutes, and remaining seconds
    let days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let str = "";
    if (days) str += `${days} days `;
    if (hours) str += `${hours} hours `;
    if (minutes) str += `${minutes} minutes `;
    if (seconds) str += `${seconds} seconds`;
    return str;
}

async function setCategoriesData(id = 1000) {
    currentCategory = id;
    setCategories();
    const data = await getDataByCategories(id);
    categoryDataNode.innerHTML = "";
    data?.map((c) => {
        categoryDataNode.innerHTML += `
        <div id="${
            c.category_id
        }" class="card card-compact bg-base-100 shadow-xl">
                <figure class="h-52 relative">
                    <img
                        class="object-cover"
                        src="${c.thumbnail}"
                        alt="${c.title}"
                    />
                    <span class="absolute right-2 bottom-2 bg-black/50 text-white px-4 rounded-md">${convertMilliseconds(
                        c.others?.posted_date || 0
                    )}</span>
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
