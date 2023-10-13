//Le select avec la barre de recherche.
class Select {
    constructor(tags, classe, TagSelectedByUser) {
        this._tags = tags
        this._class = classe
        this._tagSelected = TagSelectedByUser
    }

    // TagSelectedByUser(testText, tableau) {
    //     // tableau = []
    //     tableau.push(testText)
    //     console.log(tableau)
    //     return tableau
    // }
    createSelectBox(handleTagCliked, tagDeleted) {

        const selectBox = document.querySelector(`.select-box-${this._class}`)
        // selectBox.setAttribute("class", `select-box`)
        selectBox.insertAdjacentHTML("afterbegin",
            `<div class="select-option">
        <input type="text" placeholder="Select" id="soValue" readonly="" name="">
        </div>
        <div class="content">
            <div class="search">
                <input type="text" id="optionSearch" placeholder="Search">
            </div>
            <ul class="options">
            </ul>
        </div>
        `)
        //    const selectBox = document.querySelector(".select-box")
        const selectOption = document.querySelector(`.select-box-${this._class} .select-option`)
        const soValue = document.querySelector(`.select-box-${this._class} #soValue`)
        const optionSearch = document.querySelector(`.select-box-${this._class} #optionSearch`)
        const options = document.querySelector(`.select-box-${this._class} .options`)
        // this._tags va renvoyer un tableau des ingrédients.
        this._tags.map(tagIngredient => {

            options.insertAdjacentHTML("afterbegin", `<li>${tagIngredient}</li>`)

        })

        let optionsList = document.querySelectorAll(`.select-box-${this._class} .options li`)
        const tagsDiv = document.querySelector(".tags")

        selectOption.addEventListener("click", (e) => {
            e.preventDefault()
            selectBox.classList.toggle('active')
        })

        // let tabOfTags = []


        // au clic sur une option on prend la valeur du texte cliqué qu'on stocke qu'on stocke dans text
        optionsList.forEach((optionsListStringLe) => {
            optionsListStringLe.addEventListener("click", (e) => {
                let text = optionsListStringLe.innerHTML;
                soValue.value = text
                handleTagCliked(text)

                // On utilise une fonction de rappel pour récupérer les tags.
                // tabOfTags.push(text)
                // this._tagSelected = tab


                // Au clique sur un élément on place l'élément cliqué en dessous de la barre de recherche 
                // optionsListStringLe.remove()
                optionsListStringLe.style.display = "none"

                optionsList = document.querySelectorAll(`.select-box-${this._class} .options li`)
                // console.log(optionsList)
                // console.log(optionsListStringLe)

                let tagsSelected = document.createElement("li")
                tagsSelected.setAttribute("class", `tagSelected`)
                tagsSelected.innerHTML = text
                optionSearch.after(tagsSelected)
                // On ajoute les tags en dessous des select avec la croix en dessous de select-box dans la div tags
                let tagsParagraph = document.createElement("p")
                tagsParagraph.innerHTML = `${text} <svg class="closeTag"></svg>`


                tagsDiv.appendChild(tagsParagraph)
                tagsParagraph.setAttribute("class", "tagSelected")
                //et on supprime la classe active pour désactiver le toggle
                selectBox.classList.remove('active')
                //Au clic sur la croix on enlève le tags du dom et de la liste en tant que sélectionné et on le rajoute dans la liste
                let closeTags = document.querySelectorAll(".closeTag")
                closeTags.forEach((closeTag) => {
                    closeTag.addEventListener("click", e => {

                        // On recherche l'élément parent (donc le paragraphe) de la croix 
                        let elementParent = closeTag.parentNode
                        //et on le supprime
                        elementParent.remove()

                        //On récupére l'élément texte du paragraphe à fermer
                        let tagToClose = closeTag.parentNode.innerText
                        toString(tagToClose)
                        // console.log(tagToClose)
                        // On supprime le dernier espace du innerText pour que justTag corresponde bien au innerText du tag recherché dans la liste des tag déjà sélectionné
                        let justTag = tagToClose.slice(0, tagToClose.length - 1)
                        // console.log(justTag)

                        // Exemple justTag = sauce
                        // supprime l'élément tag du tableau
                        // tab = tab.filter((word) => word !== justTag)
                        // this._tagSelected = tab
                        tagDeleted(justTag)


                        //Supprime l'élément dans la liste qui correspond au tag que l'utilisateur souhaite supprimer
                        let tagSelectedSearch = document.querySelectorAll(".search .tagSelected")
                        // console.log(tagSelectedSearch)
                        tagSelectedSearch.forEach(tag => {
                            if (tag.innerText == justTag) {
                                tag.remove()
                                optionsListStringLe.style.display = "block"
                            }
                        })
                    })
                })

            })

        })


        optionSearch.addEventListener("keyup", e => {
            let filter, li, i, textvalue;

            filter = optionSearch.value.toUpperCase()
            li = options.getElementsByTagName("li")
            for (i = 0; i < li.length; i++) {
                let liCount = li[i];
                textvalue = liCount.innerHTML
                //Si l'élément cherché n'est pas présent dans le tableau, indexOf renverra -1.
                if (textvalue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = '';
                }
                else {
                    li[i].style.display = 'none';
                }
            }
        })
        return selectBox
    }
}



//Le select avec la barre de recherche.
