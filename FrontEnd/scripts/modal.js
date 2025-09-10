import * as crud from "./crud.js"

export function displayEditionModal() {
	const editionBanner = document.querySelector(`.edition-banner`)
	const closeModalButton = document.querySelectorAll(`.modal-close-button`)
	const editionModal = document.querySelector(`.edition-modal`)

	editionBanner.addEventListener("click", () => {
		editionModal.style.display = "flex"
	})

	closeModalButton.forEach(button => button.addEventListener("click", () => {
		editionModal.style.display = "none"
	}))

	initModalReactivity()
}


function addingButtonModalStateReactivity() {
	const modalDeleteWrapper = document.querySelector(`.modal-state-1`)
	const modalAddWrapper  = document.querySelector(`.modal-state-2`)
	const modalReturnButton = document.querySelector(`.modal-return-button`)
	const modalAddButton = document.querySelector(`.add-button`)

	modalReturnButton.addEventListener("click", () => {
		modalDeleteWrapper.style.display = "flex"
		modalAddWrapper.style.display = "none"
	})

	modalAddButton.addEventListener("click", () => {
		modalDeleteWrapper.style.display = "none"
		modalAddWrapper.style.display = "flex"
	})
}

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

async function fillingCategoryOptionInFormInput() {
	const selectInput = document.querySelector(`.modal-form select`)
	const categoryList = await crud.getCategories()
		
	categoryList.forEach(category => {
		let categoryOption = Object.assign(document.createElement(`option`), {value: `${category.id}-${category.name}`})
		categoryOption.innerText = category.name
		selectInput.append(categoryOption)
	})
}

function linkAddButtonToFileInput() {
	const fileInput = document.querySelector(`.modal-form input[type="file"]`)
	const addFileButton = document.querySelector(`.add-file-button`)

	addFileButton.addEventListener("click", () => fileInput.click())
}

function injectingImagePreviewOnFileInput(){
	const fileInput = document.querySelector(`.modal-form input[type="file"]`)
	const imagePreviewContainer = document.querySelector(`.file-input-wrapper`)

	fileInput.addEventListener("change", () => {
		const tempImageUrl = URL.createObjectURL(fileInput.files[0])
		const imagePreview = Object.assign(document.createElement(`img`), {src: tempImageUrl})


		imagePreview.addEventListener("click", () => {
			document.querySelector(`.modal-form input[type="file"]`).click()
		})

		imagePreviewContainer.innerHTML = ""
		imagePreviewContainer.append(imagePreview)
	})
}

function onSendingWorkForm(){
	const form = document.querySelector(`.modal-form`)
	const fileInput = form.querySelector(`input[type="file"]`)
	const textInput = form.querySelector(`input[type="text"]`)
	const categoriesSelect = form.querySelector(`select`)


	form.addEventListener(`submit`, (event) => {
		event.preventDefault()
		const formData = new FormData();
  	formData.append("image", fileInput.files[0]);
  	formData.append("title", textInput.value);
  	formData.append("category",parseInt(categoriesSelect.value.charAt(0)));
		crud.createWork(formData)
	})
}

function addFormButtonReactivity() {
	const form = document.querySelector(`.modal-form`)
	const submitBtn = form.querySelector('input[type="submit"]');
	const returnButton = document.querySelector(`.modal-return-button`)

	form.addEventListener("input", () => {
	  if (form.checkValidity()) {
	    submitBtn.disabled = false;
	  } else {
	    submitBtn.disabled = true;
	  }
	});

	submitBtn.addEventListener("click", () => {
		returnButton.click()
		refreshModalGallery()
	})
}

function initModalReactivity(){
	addingButtonModalStateReactivity()
	fillingCategoryOptionInFormInput()
	linkAddButtonToFileInput()
	injectingImagePreviewOnFileInput()
	onSendingWorkForm()
	addFormButtonReactivity()
}