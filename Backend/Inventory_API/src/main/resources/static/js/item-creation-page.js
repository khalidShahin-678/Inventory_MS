import { createItemRequest } from './api.js';

const addItemBtn = document.querySelector("#add-item-btn");

addItemBtn.addEventListener("click", async (event) => {
    // Take the inpus from fields
    const ar_name = document.querySelector("#ar-name-input-field");
    const en_name = document.querySelector("#en-name-input-field");
    const barcode = document.querySelector("#barcode-input-field");
    const category = document.querySelector("#category-input-field");
    const initial_quantity = document.querySelector("#initial-quantity-input-field");
    // 

    // Check fields
    if (ar_name.value.trim().length < 4) {
        showWarningOnInputfield(ar_name, "لا تترك الاسم فارغ");
        return;
    }
    if (en_name.value.trim().length < 4) {
        showWarningOnInputfield(en_name, "لا تترك الاسم فارغ");
        return;
    }
    if (initial_quantity.value > 200 || initial_quantity.value < 0 || initial_quantity.value == "") {
        showWarningOnInputfield(initial_quantity, "تأكد من الكمية");
        return;
    }

    const barcodeV = (barcode.value.trim() == "") ? null : barcode.value.trim();

    let item = {
        ar_name: ar_name.value.trim(),
        en_name: en_name.value.trim(),
        barcode: barcodeV,
        category: category.value.trim(),
        initial_quantity: Number(initial_quantity.value)
    };

    try {
        addItemBtn.disabled = true;

        const request = await createItemRequest(item);

        if (request['response'].status === 201) {
            const form_wrapper = document.querySelector("#add-item-form-wrapper");
            showSuccessForm(form_wrapper);
        }
        else if (request['response'].status === 409) {
            if (request['result'].message.includes("arabic name")) {
                showInputFieldError("هذا الاسم مستخدم بالفعل ", ar_name.previousElementSibling);
                showWarningOnInputfield(ar_name, "");
            }
            if (request['result'].message.includes("english name")) {
                showInputFieldError("هذا الاسم مستخدم بالفعل ", en_name.previousElementSibling);
                showWarningOnInputfield(en_name, "");
            }
            if (request['result'].message.includes("code")) {
                showInputFieldError("هذا الكود مستخدم بالفعل ", barcode.previousElementSibling);
                showWarningOnInputfield(barcode, "");
            }
        }
        else if (request['response'].status === 500) {
            alert("مشكلة في السيرفر");
        }
    } catch (error) {
        console.log(error);
        alert("السيرفر لا يعمل")
    }
    finally {
        addItemBtn.disabled = false;
    }
});










function showWarningOnInputfield(field, message) {
    field.style.animationName = "warningFieldAnimation";
    field.style.animationDuration = "10s";
    field.style.animationTimingFunction = "linear";
    field.placeholder = message;

    setTimeout(() => {
        field.style.animationName = "";
        field.style.animationDuration = "";
        field.style.animationTimingFunction = "";
        field.placeholder = "";
    }, 5000);
}

function showSuccessForm(field) {
    field.style.animationName = "successFormAnimation";
    field.style.animationDuration = "5s";
    field.style.animationTimingFunction = "linear";

    setTimeout(() => {
        field.style.animationName = "";
        field.style.animationDuration = "";
        field.style.animationTimingFunction = "";
    }, 5000);
}

function showInputFieldError(message, field) {
    const span = document.createElement("span");
    span.classList.add("error");
    span.textContent = message;

    field.appendChild(span);

    setTimeout(() => {
        span.remove();
    }, 5000);
}

