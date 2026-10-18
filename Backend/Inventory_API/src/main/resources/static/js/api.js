// Post

export async function createItemRequest(item) {

    const url = new URL("http://localhost:8080/items");

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            arName: item.arName,
            enName: item.enName,
            code: item.code,
            category: item.category,
            initialQuantity: item.initialQuantity
        })
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();

    return { status: response.status, item: result, res: response };

}

export async function withdrawItem(id, quantity) {

    const url = new URL(`http://localhost:8080/items/${id}/withdraw`);

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: Number(quantity)
        })
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();

    console.log(response);
    console.log(result);

    return {
        response: response,
        transaction: result
    }
}

export async function addItem(id, quantity) {
    const url = new URL(`http://localhost:8080/items/${id}/add`);

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: Number(quantity)
        })
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();

    console.log(response);
    console.log(result);

    return {
        response: response,
        transaction: result
    }
}

// Get 

export async function getItemsRequest(name) {

    const url = new URL("http://localhost:8080/items");

    if (name != null && name != "") {
        url.searchParams.set("name", name);
    }

    const response = await fetch(url);
    const result = await response.json();

    console.log(response);
    console.log(result);

    return {
        response: response,
        items: result
    }
}
