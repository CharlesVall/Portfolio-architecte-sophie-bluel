import { displayGallery, displayFilter, handleFilterChange, displayPageWhileConnected } from "./display/projects/projects.js";
import { displayModalGallery, displayEditionModal } from "./display/projects/modal.js";
import * as crud from "./tools/crud.js";
import { checkTokenExpiry } from "./tools/token.js";

async function init() {
	try {
    const works = await crud.getWorks();
    const categories = await crud.getCategories();

    checkTokenExpiry();
    displayPageWhileConnected();

    displayGallery(works);
    displayFilter(categories);
    handleFilterChange(works);

    displayEditionModal();
    displayModalGallery(works);
  } catch (error) {
    console.error("Error while initializing:", error.message);
  }
}


init();


