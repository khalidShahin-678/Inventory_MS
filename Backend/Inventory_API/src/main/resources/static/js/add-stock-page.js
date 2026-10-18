import { getItemsRequest } from '../js/api.js';

const tbody = document.querySelector("#add-items-table tbody");
const searchByNameBar = document.querySelector("#searchByName");
const searchByCodeBar = document.querySelector("#searchByCode");
const dropdownMenu = document.querySelector("#dropdownSearchList");
const deleteBtn = document.querySelector("#deleteBtn");

let addedItems = [];
const storedItems = localStorage.getItem("addedItems");

if (storedItems) {
    try {
        addedItems = JSON.parse(storedItems);
        rednerAddTable(addedItems);
    } catch (e) {
        console.error("Error parsing local storage", e);
        addedItems = [];
    }
}

let items = [];
const response = await getItemsRequest(null);

if (response && response['response']?.status === 200) {
    items = response['items'] || [];
}

function createItemRow(item) {
    return `
    <tr>
        <td data-item-id="${item.id}">${item.id}</td>
        <td>${item.enName}</td>
        <td>
            <input type="number" value="0" min="0">
            <button><img src="/assets/icons-svg/add-icon.svg" alt="withdraw-svg"></button>
        </td>
        <td>${item.quantity}</td>
        <td>${getCategory(item.category)}</td>
    </tr>
    `;
}

function rednerAddTable(itemsList) {
    if (!itemsList || itemsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">لا اصناف مضافة حاليا</td></tr>`;
        return;
    }

    tbody.innerHTML = itemsList.map(item => createItemRow(item)).join("");
}

function createDropdownMenuRow(item) {
    return `<p data-item-id="${item.id}">${item.enName}</p>`;
}

function renderDropdownMenu(itemsList) {
    if (!itemsList || itemsList.length === 0) {
        dropdownMenu.innerHTML = `<p>لا يوجد اصناف بهذا الاسم </p>`;
    } else {
        dropdownMenu.innerHTML = itemsList.map(item => createDropdownMenuRow(item)).join("");
    }
}

function getCategory(category) {
    const categories = {
        "TAB": "اقراص",
        "SYRUP": "شراب",
        "CREAM": "كريم",
        "VIAL": "حقن",
        "DROP": "نقط",
        "SACHET": "اكياس",
        "SUPP": "لبوس",
        "GENERAL": "عام"
    };
    return categories[category] || "عام";
}

document.body.addEventListener("click", (event) => {
    const closestDiv = event.target.closest("div");

    if (event.target.id !== "searchByName" && (!closestDiv || closestDiv.id !== "dropdownSearchList")) {
        dropdownMenu.style.display = "none";
    }
    else if (event.target.id === "searchByName") {
        dropdownMenu.style.display = "block";
    }
    else if (event.target.tagName === "P" && closestDiv?.id === "dropdownSearchList") {
        const targetItem = items.find(item => item.id == event.target.dataset.itemId);

        if (!targetItem) return;

        let isAlreadyExist = addedItems.find(item => item.id == targetItem.id);
        if (!isAlreadyExist) {
            addedItems.push(targetItem);
            localStorage.setItem("addedItems", JSON.stringify(addedItems));
            rednerAddTable(addedItems);
        }
    }
});

searchByNameBar.addEventListener("keyup", () => {
    if (items.length !== 0) {
        const searchByNameValue = searchByNameBar.value.toLowerCase().trim();

        let itemsToRender = items.filter((item) =>
            item.enName.toLowerCase().includes(searchByNameValue) ||
            (item.arName && item.arName.toLowerCase().includes(searchByNameValue))
        );

        itemsToRender.sort((a, b) => a.enName.toUpperCase().localeCompare(b.enName.toUpperCase(), undefined, { sensitivity: "base" }));
        renderDropdownMenu(itemsToRender);
    }
});

deleteBtn.addEventListener("click", async () => {
    localStorage.removeItem("addedItems");
    addedItems = [];
    rednerAddTable(addedItems);

    const response2 = await getItemsRequest(null);
    if (response2 && response2['response']?.status === 200) {
        items = response2['items'] || [];
    }
});
