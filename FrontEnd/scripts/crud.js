const apiUrl = `http://127.0.0.1:5678/api`;

export async function getWorks() {
    const response = await fetch(`${apiUrl}/works`);

    if (!response.ok) {
        throw new Error(`Une erreur est survenue: ${response.status}`);
    }

    const workList = await response.json();
    return workList;
}

export async function getCategories() {
    const response = await fetch(`${apiUrl}/categories`);

    if (!response.ok) {
        throw new Error(`Une erreur est survenue: ${response.status}`);
    }

    const data = await response.json();
    const categoriesList = data.map(categorie => categorie.name);
    
    return categoriesList;
}
