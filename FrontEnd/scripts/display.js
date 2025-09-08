import * as crud from "./crud.js"

export function displayGallery(workList) {
    const gallery = document.querySelector(".gallery");

    try {
        if (workList.length === 0) {
            gallery.innerHTML = "<p>Aucun projet à afficher.</p>";
            return;
        }

        gallery.innerHTML = ""
        workList.forEach(work => { createWorkFigure(work, gallery) });

    } catch (error) {
        console.log(`Une erreur est survenue : ${error.message}`)
        gallery.innerHTML = `<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>`;
    }
}

function createWorkFigure(work, gallery){
    const workFigure = document.createElement("figure");
    const workImg = Object.assign(document.createElement("img"), {src: work.imageUrl, alt: work.title})
    const figCaption = Object.assign(document.createElement("figcaption"), {innerText: work.title})

    workFigure.append(workImg, figCaption);
    gallery.appendChild(workFigure);
};


export async function displayFilter(){
    const filterList = ["Tous", ...(await crud.getCategories())];
    const filterContainer = document.querySelector(".filters-container")

    filterList.forEach((filter, index) => {

        let filterRadio = Object.assign(document.createElement("input"), {
            type: "radio",
            name: "filter",
            id: filter,
            value: filter,
            checked: index === 0
        })

        let filterLabel = Object.assign(document.createElement("label"), {
            htmlFor: filter,
            innerText: filter
        })

        filterContainer.append(filterRadio, filterLabel)
    })
}

export function displayGalleryAccordingToFilter(workList){
    const filters = document.querySelectorAll(".filters-container input")
        filters.forEach(filter => {
            filter.addEventListener("change", event => {
                if (event.target.value === "Tous") {
                    displayGallery(workList)
                } else {
                    displayGallery(workList.filter(work => work.category.name === event.target.value))
                }
            })
        })
};

export function displayPageWhileConnected() {
    const logout = () => { localStorage.removeItem("token") }
    const loginLink = document.querySelector(`nav a[href="./login.html"]`)

    if (!localStorage.getItem("token")) {
        loginLink.innerHTML = `<a href="./login.html">login</a>` ;   
        return;
    }
    
    loginLink.innerHTML = `<a href="">logout</a>` ;   
    loginLink.addEventListener("click", () => { logout() })
    
}

export function displayModalGallery(workList){
    const modalGallery = document.querySelector(".modal-gallery");

    try {
        if (workList.length === 0) {
            modalGallery.innerHTML = "<p>Aucun projet à afficher.</p>";
            return;
        }

        modalGallery.innerHTML = ""
        workList.forEach(work => { createWorkFigure(work, gallery) });

    } catch (error) {
        console.log(`Une erreur est survenue : ${error.message}`)
        gallery.innerHTML = `<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>`;
    }
}

function createModalWorkFigure(work, modalGallery){
    const modalWorkFigure = document.createElement("figure");
    const workImg = Object.assign(document.createElement("img"), {src: work.imageUrl, alt: work.title})

    modalWorkFigure.append(workImg);
    modalGallery.appendChild(workFigure);
}