import { displayGallery, displayFilter, displayGalleryAccordingToFilter, displayPageWhileConnected } from "./display.js";
import { getWorks } from "./crud.js";

async function init() {
    try {
        const works = await getWorks();
        displayGallery(works);
        await displayFilter();

        displayGalleryAccordingToFilter(works)
        displayPageWhileConnected()
    } catch (error) {
        console.error("Error while initializing:", error.message);
    }
}


init();
