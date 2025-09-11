export function renderGalleryContent(gallery, workList, createFigureFunction) {
  if (workList.length === 0) {
    gallery.innerHTML = "<p>Aucun projet à afficher.</p>";
    return;
  }

  gallery.innerHTML = "";
  workList.forEach(work => { createFigureFunction(gallery, work); });
}