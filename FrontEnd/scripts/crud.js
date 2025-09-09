const apiUrl = `http://127.0.0.1:5678/api`;

export async function getWorks() {
    const response = await fetch(`${apiUrl}/works`);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const workList = await response.json();
    return workList;
}

export async function getCategories() {
    const response = await fetch(`${apiUrl}/categories`);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    const categoriesList = data.map(categorie => categorie.name);
    
    return categoriesList;
}

export async function deleteWorkById(workId) {
    const token = localStorage.getItem("token")
    const response = await fetch(`${apiUrl}/works/${workId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response;
}