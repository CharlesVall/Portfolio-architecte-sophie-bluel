import { displayGallery, displayFilter, displayGalleryAccordingToFilter } from "./display.js";
import { getWorks } from "./crud.js";

async function init() {
    try {
        const works = await getWorks();
        displayGallery(works);
        await displayFilter();

        displayGalleryAccordingToFilter(works)
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error.message);
    }
}


init();
