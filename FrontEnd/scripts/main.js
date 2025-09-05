const apiUrl = `http://localhost:5678/api/`

async function getWorks() {
    const gallery = document.querySelector(".gallery");
    const response = await fetch(apiUrl + "works");

    gallery.innerHTML = ""

    if (!response.ok) {
        throw new Error(`Une erreur est survenue: ${response.status}`);
    }

    const workList = await response.json();
    console.log(workList);

    workList.forEach(work => { createWorkFigure(work, gallery) });
}

function createWorkFigure(work, gallery){
    const workFigure = document.createElement("figure");
    const workImg = Object.assign(document.createElement("img"), {src: work.imageUrl, alt: work.title})
    const figCaption = Object.assign(document.createElement("figcaption"), {innerText: work.title})

    workFigure.append(workImg, figCaption);
    gallery.appendChild(workFigure);
};

function createWorkFigureFunctional(work, gallery) {
    gallery.append(
        Object.assign(document.createElement("figure", {
            append: function () {
                this.append(
                    Object.assign(document.createElement("img"), {
                        src: work.imageUrl,
                        alt: work.title
                    }),
                    Object.assign(document.createElement("figcaption"), {
                        title: work.title
                    })
                );
                return this
            } ()
            }
        ))
    );
};

getWorks()