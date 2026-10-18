import { getItemsRequest } from "./api.js";

const searchAndFilterWrapper = document.querySelector("#search-filter-wrapper");
const categoryFilter = document.querySelector("#category-search-field");
const stateFilter = document.querySelector("#filter-state-field");
const tbody = document.querySelector("#items-table-body");


let items = [];
function createItemRow(item) {
    return `
        <tr>
            <td data-item-id="${item.id}">${item.id}</td>
            <td data-item-en-name="${item.enName}">${item.enName}</td>
            <td data-required-quantity="0">
                    <input type="number" value="0" min="0" max="${item.quantity}">
                    <button><img src="/assets/icons-svg/chevron_left.svg" alt="wihtdraw-svg"></button>
            </td>
            <td data-item-quantity="${item.quantity}">${item.quantity}</td>
            <td data-item-category="${item.category}" data-item-state="${(item.quantity == 0) ? "not-av" : "av"}"><span></span>${getCategory(item.category)}</td>
        </tr>
    `;
}

function getCategory(category) {
    switch (category) {
        case "TAB":
            return "اقراص";
        case "SYRUP":
            return "شراب";
        case "CREAM":
            return "كريم";
        case "VIAL":
            return "حقن";
        case "DROP":
            return "نقط";
        case "SACHET":
            return "اكياس";
        case "SUPP":
            return "لبوس";
        case "GENERAL":
            return "عام";
    }
}


function renderTable(items) {


    if (!tbody) return;

    if (items == null || items == undefined || items.length === 0) {

        tbody.innerHTML = ` 
            <tr><td colspan = 5> لا يوجد أصناف بهذا التصنيف</td></tr>
        `;

        return;
    }

    tbody.innerHTML = items.map(item => createItemRow(item)).join("");
}


searchAndFilterWrapper.addEventListener("keydown", async (event) => {

    if (event.target.id == "text-search-field" && event.key == "Enter") {
        try {

            let input = event.target.value.trim();

            tbody.innerHTML = `
                <tr><td colspan = 5>جاري البحث ...</td></tr>
            `;
            const response = await getItemsRequest(input);

            if (response['response'].status === 200) {
                // render the table body
                items = response['items'];

                items.sort((a, b) => a.enName.localeCompare(b.enName, undefined, { sensitivity: 'base' }));

                applyCurrentFilters();
            }
            if (response['response'].status === 404) {
                tbody.innerHTML = ` 
                    <tr><td colspan = 5> لا يوجد أصناف بهذا الاسم</td></tr>
                `;
                return;
            }
            if (response['response'].status === 500) {
                alert("مشكلة في السيرفر");
            }

        } catch (error) {
            alert("السيرفر لا يعمل");
            console.log(error);
        }
    }
});


categoryFilter.addEventListener("change", applyCurrentFilters);

stateFilter.addEventListener("change", applyCurrentFilters);

function filterItems(category, state) {
    if (!items || items.length === 0) return [];

    return items.filter((item) => {
        const matchCategory = category === "ALL" || item.category === category;
        const itemState = item.quantity > 0 ? "av" : "not-av";
        const matchState = state === "all" || itemState === state;

        return matchCategory && matchState;
    });
}

function applyCurrentFilters() {
    const filteredItems = filterItems(categoryFilter.value, stateFilter.value);

    renderTable(filteredItems);
}
