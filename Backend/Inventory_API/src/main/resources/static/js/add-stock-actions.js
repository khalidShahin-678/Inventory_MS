import { addItem } from "./api.js";

const saveBtn = document.querySelector("#saveBtn");
const tbody = document.querySelector("#add-items-table tbody");

saveBtn.addEventListener("click", async () => {
    let addedItems = localStorage.getItem("addedItems");
    addedItems = JSON.parse(addedItems);

    if (addedItems == null || addedItems == undefined || addedItems.length == 0) {
        return;
    }

    for (let i = 0; i < addedItems.length; i++) {
        let row = tbody.children[i];
        let itemId = row.querySelector("[data-item-id]").dataset.itemId;
        let addedQuantity = row.querySelector("input").value;

        try {
            const response = await addItem(itemId, addedQuantity);

            if (response['response'].status === 200) {
                row.querySelector("button").classList.add("added");
            }
            else if (response['response'].status === 400) {
                row.querySelector("button").classList.add("warning");
            }
            else {
                row.querySelector("button").classList.add("not-added");
            }

        } catch (error) {
            console.log(error);
        }
    }

});









