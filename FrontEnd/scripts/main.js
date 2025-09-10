import { displayGallery, displayFilter, displayGalleryAccordingToFilter, displayPageWhileConnected } from "./display.js";
import { displayModalGallery, displayEditionModal } from "./modal.js"
import { getWorks } from "./crud.js";
import { checkTokenExpiry } from "./token.js";

async function init() {
    try {
        checkTokenExpiry()
        const works = await getWorks();
        displayGallery(works);
        await displayFilter();

        displayGalleryAccordingToFilter(works)
        displayPageWhileConnected()
        displayModalGallery(works)
        displayEditionModal()
    } catch (error) {
        console.error("Error while initializing:", error.message);
    }
}


init();


