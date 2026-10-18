
const tbody = document.querySelector("#withdraw-items-table tbody");
const deleteButton = document.querySelector("#delete-btn");
const copyButton = document.querySelector("#copy-btn");



let withdrawnItems = localStorage.getItem("withdrawnItems");

let itemToRender = JSON.parse(withdrawnItems);

renderWithdrawTable(itemToRender);


function createItemRow(item) {
    return `
        <tr>
            <td>${item.id}</td>
            <td>${item.enName}</td>
            <td>${item.withdrawnQuantity}</td>
            <td>${getCategory(item.category)}</td>
        </tr>
    `;
}

function renderWithdrawTable(items) {
    if (items == null || items == undefined || items.length == 0) {
        tbody.innerHTML = `
             <tr><td colspan = 4> لا يوجد أصناف مسحوبة حاليا</td></tr>
        `;
        return;
    }
    items.sort((a, b) => a.enName.localeCompare(b.enName, undefined, { sensitivity: 'base' }));

    tbody.innerHTML = items.map(item => createItemRow(item)).join("");
}

function getCategory(category) {
    switch (category) {
        case "TAB":
            return "اقراص";
            break;
        case "SYRUP":
            return "شراب";
            break;
        case "CREAM":
            return "كريم";
            break;
        case "VIAL":
            return "حقن";
            break;
        case "DROP":
            return "نقط";
            break;
        case "SACHET":
            return "اكياس";
            break;
        case "SUPP":
            return "لبوس";
            break;
        case "GENERAL":
            return "عام";
            break;
    }
}


deleteButton.addEventListener("click", () => {
    localStorage.removeItem("withdrawnItems");
    renderWithdrawTable();
});

copyButton.addEventListener("click", async () => {
    const withdrawnItemsStored = localStorage.getItem("withdrawnItems");
    const withdrawnItems = JSON.parse(withdrawnItemsStored);
    try {
        if (withdrawnItems) {
            const maxNameLength = Math.max(...withdrawnItems.map(item => item.enName.length)) + 4;

            const textToCopy = withdrawnItems.map((item) => {
                const nameCol = item.enName.padEnd(maxNameLength, " ");
                const quantityCol = String(item.withdrawnQuantity).padEnd(4, " ");

                return `${nameCol}${quantityCol}${getCategory(item.category)}`;
            }).join("\n");

            await navigator.clipboard.writeText(textToCopy);
            copyButton.textContent = "تم النسخ";

            setTimeout(() => {
                copyButton.textContent = "نسخ الاصناف ";
            }, 3000);
        }
    } catch (error) {
        console.log(error);
    }
});

