import * as crud from "./crud.js"

export function displayModalGallery(workList){
    const modalGallery = document.querySelector(".modal-gallery");

    try {
        if (workList.length === 0) {
            modalGallery.innerHTML = "<p>Aucun projet à afficher.</p>";
            return;
        }

        modalGallery.innerHTML = ""
        workList.forEach(work => { createModalWorkFigure(work, modalGallery) });

    } catch (error) {
        console.log(`Error : ${error.message}`)
        modalGallery.innerHTML = `<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>`;
    }
}

function createModalWorkFigure(work, modalGallery){
    const modalWorkFigure = document.createElement("figure");
    const workImg = Object.assign(document.createElement("img"), {src: work.imageUrl, alt: work.title})
    const deleteButton = Object.assign(document.createElement("button"), {className: "delete-button"})
    const trashIcon = Object.assign(document.createElement("img"), {src: "./assets/icons/trash.svg", alt: "bouton suppression"})
    
    deleteButton.addEventListener("click", () => {
        crud.deleteWorkById(work.id)
        refreshModalGallery()
    })

    deleteButton.append(trashIcon)
    modalWorkFigure.append(workImg, deleteButton);
    modalGallery.append(modalWorkFigure);
}

export function displayEditionModal() {
    const editionBanner = document.querySelector(`.edition-banner`)
    const closeModalButton = document.querySelector(`.modal-close-button`)
    const editionModal = document.querySelector(`.edition-modal`)

    editionBanner.addEventListener("click", () => {
        editionModal.style.display = "flex"
    })

    closeModalButton.addEventListener("click", () => {
        editionModal.style.display = "none"
    })
}

async function refreshModalGallery() {
    const modalGallery = document.querySelector(".modal-gallery");

    try {
        const workList = await crud.getWorks();
        if (workList.length === 0) {
            modalGallery.innerHTML = "<p>Plus aucun projet à afficher.</p>";
            return;
        }

        modalGallery.innerHTML = ""
        workList.forEach(work => { createModalWorkFigure(work, modalGallery) });

    } catch (error) {
        console.log(`Error : ${error.message}`)
        modalGallery.innerHTML = `<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>`;
    }

}