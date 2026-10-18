import { withdrawItem } from "../js/api.js"

const tbody = document.querySelector("#items-table tbody");
const wihtdrawButton = document.querySelector("#withdrawButton");


tbody.addEventListener("change", (event) => {
    const row = event.target.closest("tr");
    const itemQuantity = row.querySelector("[data-item-quantity]").dataset.itemQuantity;
    if (Number(itemQuantity) < Number(event.target.value)) {
        row.querySelector("input").classList.add("error");
    }
    else {
        row.querySelector("input").classList.remove("error");
    }
});



wihtdrawButton.addEventListener("click", async () => {
    const rows = tbody.querySelectorAll("tr");

    rows.forEach(async (row) => {
        const reqQuantity = row.querySelector("input").value;
        const quantity = row.querySelector("[data-item-quantity]").dataset.itemQuantity;
        const itemId = row.querySelector("[data-item-id]").dataset.itemId;

        if (Number(reqQuantity) > Number(quantity)) {
            row.querySelector("button").classList.add("error");
            return;
        }
        else if (Number(reqQuantity) == 0) {
            row.querySelector("button").classList.add("serverError");
            return;
        }
        const response = await withdrawItem(itemId, reqQuantity);

        if (response && response['response'].status === 200) {
            row.querySelector("button").classList.add("success");
        }
        else {
            row.querySelector("button").classList.add("serverError");
        }
    });
});