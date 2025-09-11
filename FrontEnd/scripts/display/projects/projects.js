import * as crud from "../../tools/crud.js";
import { renderGalleryContent } from "../../tools/renderGallery.js";

export function displayPageWhileConnected() {
  const logout = () => { localStorage.removeItem("token"); };
  const loginLink = document.querySelector("nav a[href='./login.html']");
  const editionContainer = document.querySelector(".edition-banner");

  if (!localStorage.getItem("token")) {
    loginLink.innerHTML = "<a href='./login.html'>login</a>";
    editionContainer.style.display = "none";
    return;
  }
    
  loginLink.innerHTML = "<a href=''>logout</a>" ;   
  loginLink.addEventListener("click", logout);

  editionContainer.style.display = "flex"; 
}

export function displayGallery(workList) {
  const gallery = document.querySelector(".gallery");

  try {
    renderGalleryContent(gallery, workList, createWorkFigure)
  } catch (error) {
    console.log(`Une erreur est survenue : ${error.message}`);
    gallery.innerHTML = "<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>";
  }
}

function createWorkFigure(gallery, work){
  const workFigure = document.createElement("figure");
  const workImg = Object.assign(document.createElement("img"), {src: work.imageUrl, alt: work.title});
  const figCaption = Object.assign(document.createElement("figcaption"), {innerText: work.title});

  workFigure.append(workImg, figCaption);
  gallery.appendChild(workFigure);
};

export function displayFilter(categoriesList){
  const filterList = ["Tous", ...(categoriesList.map(category => category.name))];
  const filterContainer = document.querySelector(".filters-container");

  filterList.forEach((filter, index) => {

    let filterRadio = Object.assign(document.createElement("input"), {
      type: "radio",
      name: "filter",
      id: filter,
      value: filter,
      checked: index === 0
      });

    let filterLabel = Object.assign(document.createElement("label"), {
			htmlFor: filter,
      innerText: filter
		});

    filterContainer.append(filterRadio, filterLabel);
  });
}

function displayGalleryAccordingToFilter(filter, workList) {
  if (filter.value === "Tous") {
    displayGallery(workList);
  } else {
    displayGallery(workList.filter(work => work.category.name === filter.value));
  }
}

export function handleFilterChange(workList) {
  const filters = document.querySelectorAll(".filters-container input");
  filters.forEach(filter => {
    if (filter._handler) {
      filter.removeEventListener("change", filter._handler);
    }
    filter._handler = () => displayGalleryAccordingToFilter(filter, workList);
    filter.removeEventListener("change", filter._handler);
    filter.addEventListener("change", filter._handler);
  });
}

export async function refreshGallery() {
  const gallery = document.querySelector(".gallery");
  
  try {
    const workList = await crud.getWorks();
    renderGalleryContent(gallery, workList, createWorkFigure)

  } catch (error) {
    console.log(`Une erreur est survenue : ${error.message}`);
    gallery.innerHTML = "<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>";
  }
}