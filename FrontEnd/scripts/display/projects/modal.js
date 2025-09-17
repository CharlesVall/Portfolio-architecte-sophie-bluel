import * as crud from "../../tools/crud.js";
import { renderGalleryContent } from "../../tools/renderGallery.js";
import { handleFilterChange, refreshGallery } from "./projects.js";

export function displayEditionModal() {
	const editionBanner = document.querySelector(".edition-banner");
	const closeModalButton = document.querySelectorAll(".modal-close-button");
	const editionModal = document.querySelector(".edition-modal");

	editionBanner.addEventListener("click", () => {
		editionModal.style.display = "flex";
	});

	closeModalButton.forEach(button => button.addEventListener("click", () => {
		editionModal.style.display = "none";
	}));

	initModalReactivity();
}

export function displayModalGallery(workList){
	const modalGallery = document.querySelector(".modal-gallery");
		
	try {
		renderGalleryContent(modalGallery, workList, createModalWorkFigure)
				
	} catch (error) {
		console.log(`Error : ${error.message}`);
		modalGallery.innerHTML = "<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>";
	}
}

function addButtonModalStateReactivity() {
	const modalDeleteWrapper = document.querySelector(".modal-state-1");
	const modalAddWrapper  = document.querySelector(".modal-state-2");
	const modalReturnButton = document.querySelector(".modal-return-button");
	const modalAddButton = document.querySelector(".add-button");

	modalReturnButton.addEventListener("click", () => {
		modalDeleteWrapper.style.display = "flex";
		modalAddWrapper.style.display = "none";
	});

	modalAddButton.addEventListener("click", () => {
		modalDeleteWrapper.style.display = "none";
		modalAddWrapper.style.display = "flex";
	});
}


async function createModalWorkFigure(modalGallery, work){
	const modalWorkFigure = document.createElement("figure");
	const workImg = Object.assign(document.createElement("img"), {src: work.imageUrl, alt: work.title});
	const deleteButton = Object.assign(document.createElement("button"), {className: "delete-button"});
	const trashIcon = Object.assign(document.createElement("img"), {src: "./assets/icons/trash.svg", alt: "bouton suppression"});
		
	deleteButton.addEventListener("click", async () => {
		await crud.deleteWorkById(work.id);
		await refreshModalGallery();
		await refreshGallery();
	});

	deleteButton.append(trashIcon);
	modalWorkFigure.append(workImg, deleteButton);
	modalGallery.append(modalWorkFigure);
}


async function refreshModalGallery() {
	const modalGallery = document.querySelector(".modal-gallery");

	try {
		const workList = await crud.getWorks();
		renderGalleryContent(modalGallery, workList, createModalWorkFigure)

	} catch (error) {
		console.log(`Error : ${error.message}`);
		modalGallery.innerHTML = "<p>Impossible de charger la galerie. Veuillez réessayer plus tard.</p>";
	}
}

async function fillingCategoryOptionInFormInput() {
	const selectInput = document.querySelector(".modal-form select");
	const categoryList = await crud.getCategories();
		
	categoryList.forEach(category => {
		let categoryOption = Object.assign(document.createElement("option"), {value: `${category.id}-${category.name}`});
		categoryOption.innerText = category.name;
		selectInput.append(categoryOption);
	});
}

function injectingImagePreviewOnFileInput(){
	const fileInput = document.querySelector(".modal-form input[type='file']");
	const imagePreviewContainer = document.querySelector(".file-input-wrapper");

	fileInput.addEventListener("change", () => {
		const tempImageUrl = URL.createObjectURL(fileInput.files[0]);
		const imagePreview = Object.assign(document.createElement("img"), {src: tempImageUrl});


		imagePreview.addEventListener("click", () => {
			document.querySelector(".modal-form input[type='file']").click();
		});

		imagePreviewContainer.innerHTML = "";
		imagePreviewContainer.append(imagePreview);
	});
}

function addWorkFormReactivity(){
	const form = document.querySelector(".modal-form");
	const submitButton = form.querySelector("input[type='submit']");
	const returnButton = document.querySelector(".modal-return-button");

	form.addEventListener("input", () => {
	  if (form.checkValidity()) {
	    submitButton.disabled = false;
	  } else {
	    submitButton.disabled = true;
	  }
	});

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const fileInput = form.querySelector("input[type='file']");
		const textInput = form.querySelector("input[type='text']");
		const categoriesSelect = form.querySelector("select");

		const formData = new FormData();
  	formData.append("image", fileInput.files[0]);
  	formData.append("title", textInput.value);
  	formData.append("category",parseInt(categoriesSelect.value.split("-")));
		
		await crud.createWork(formData);
		const workList = await crud.getWorks();
		await refreshModalGallery();
		await refreshGallery();
		handleFilterChange(workList)
		returnButton.click();
	});
}

function initModalReactivity(){
	addButtonModalStateReactivity();
	addWorkFormReactivity();
	fillingCategoryOptionInFormInput();
	injectingImagePreviewOnFileInput();
}