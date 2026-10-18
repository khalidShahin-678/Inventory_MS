import { createItemRequest } from './api.js';
const form = document.forms['testForm'];

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    // prevent submit 
    const submitButton = form.querySelector("button");
    submitButton.disabled = true;
    submitButton.style.opacity = "0.6";

    // Reset styles
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        input.classList.remove("invalid");
    });
    // convert form data to json 
    const formData = new FormData(form);
    const itemObject = Object.fromEntries(formData.entries());

    // clear inputs 
    itemObject.arName = itemObject.arName.trim();
    itemObject.enName = itemObject.enName.trim();
    itemObject.code = itemObject.code?.trim();
    if (itemObject.code == "") itemObject.code = null;
    itemObject.initialQuantity = Number(itemObject.initialQuantity);
    try {
        // Send the Request to the server 
        const response = await createItemRequest(itemObject);
        console.log(response.res);
        console.log(response.item);

        // Handle Status
        // Success
        if (response.status == 201) {
            form.style.animation = "successForm 3s";
            form.reset();

            setTimeout(() => {
                form.style.animation = "";
            }, 4000);
        }
        // duplication errors
        else if (response.status == 409) {
            if (response.item.message.includes("arabic name")) {
                const input = form.querySelector("#arName");
                input?.classList.add("invalid");
            }
            else if (response.item.message.includes("english name")) {
                const input = form.querySelector("#enName");
                input?.classList.add("invalid");
            }
            else if (response.item.message.includes("code")) {
                const input = form.querySelector("#code");
                input?.classList.add("invalid");
            }
        }
        // Internal server error
        else if (response.status == 500) {
            alert("مشكلة في السيرفر");
        }
        // fialed connect to server
    } catch (error) {
        console.log(error);
        alert("السيرفر لا يعمل");
    }
    finally {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
    }
});