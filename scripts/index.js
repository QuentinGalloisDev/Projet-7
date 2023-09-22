// Faire une requete au fichier json pour récupérer toutes les recettes.

// Créer un design pattern pour les cards affichant les recettes.

// Le design pattern créer les éléments dans le dom avec pour paramètres les données que l'on récupérera dans la requete.

// Créer un tableau des ingrédients et les intégrer avec .map dan le ul des options
// Pareil pour les appareils et les ustensiles 

// //Le select avec la barre de recherche.
// const selectBox = document.querySelector(".select-box")
// const selectOption = document.querySelector(".select-option")
// const soValue = document.querySelector("#soValue")
// const optionSearch = document.querySelector("#optionSearch")
// const options = document.querySelector(".options")
// let optionsList = document.querySelectorAll(".options li")
// const tagsDiv = document.querySelector(".tags")

// selectOption.addEventListener("click", (e) => {
//     selectBox.classList.toggle('active')
// })
// // au clic sur une option on prend la valeur du texte cliqué qu'on stocke qu'on stocke dans text
// optionsList.forEach((optionsListStringLe) => {
//     optionsListStringLe.addEventListener("click", (e) => {
//         let text = optionsListStringLe.innerHTML;
//         soValue.value = text
//         // Au clique sur un élément on place l'élément cliqué en dessous de la barre de recherche 
//         // optionsListStringLe.remove()
//         optionsListStringLe.style.display = "none"

//         optionsList = document.querySelectorAll(".options li")
//         console.log(optionsList)
//         console.log(optionsListStringLe)

//         let tagsSelected = document.createElement("li")
//         tagsSelected.setAttribute("class", `tagSelected`)
//         tagsSelected.innerHTML = text
//         optionSearch.after(tagsSelected)
//         // On ajoute les tags en dessous des select avec la croix en dessous de select-box dans la div tags
//         let tagsParagraph = document.createElement("p")
//         tagsParagraph.innerHTML = `${text} <svg class="closeTag"></svg>`


//         tagsDiv.appendChild(tagsParagraph)
//         tagsParagraph.setAttribute("class", "tagSelected")
//         //et on supprime la classe active pour désactiver le toggle
//         selectBox.classList.remove('active')
//         //Au clic sur la croix on enlève le tags du dom et de la liste en tant que sélectionné et on le rajoute dans la liste
//         let closeTags = document.querySelectorAll(".closeTag")
//         closeTags.forEach((closeTag) => {
//             closeTag.addEventListener("click", e => {

//                 // On recherche l'élément parent (donc le paragraphe) de la croix 
//                 let elementParent = closeTag.parentNode
//                 //et on le supprime
//                 elementParent.remove()

//                 //On récupére l'élément texte du paragraphe à fermer
//                 let tagToClose = closeTag.parentNode.innerHTML
//                 toString(tagToClose)
//                 const afterTag = tagToClose.split(" ")
//                 let justTag = afterTag[0]

//                 // Exemple justTag = sauce
//                 //Supprime l'élément dans la liste qui correspond au tag que l'utilisateur souhaite supprimer
//                 let tagSelectedSearch = document.querySelectorAll(".search .tagSelected")
//                 tagSelectedSearch.forEach(tag => {
//                     if (tag.innerHTML == justTag) {
//                         tag.remove()
//                         optionsListStringLe.style.display = "block"
//                     }
//                 })
//             })
//         })

//     })

// })


// optionSearch.addEventListener("keyup", e => {
//     let filter, li, i, textvalue;

//     filter = optionSearch.value.toUpperCase()
//     li = options.getElementsByTagName("li")
//     for (i = 0; i < li.length; i++) {
//         liCount = li[i];
//         textvalue = liCount.innerHTML
//         //Si l'élément cherché n'est pas présent dans le tableau, indexOf renverra -1.
//         if (textvalue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = '';
//         }
//         else {
//             li[i].style.display = 'none';
//         }
//     }
// })

// //Le select avec la barre de recherche.

// La class app appelle l'api ainsi que les class Recipe qui créé un model de données pour chaque recettes et recipeCard qui créé le contenu html à remplir par les données de Recipe.
class App {
    constructor() {
        this.$recipesContainer = document.querySelector(".recipesContainer")
        this.$header = document.querySelector("header")
        this.$selects = document.querySelector(".selects")
        // Insérer le select après le header
        this.recipeApi = new recipeApi('/PetitsPlats/recipes.json')

    }
    async main() {
        const recipesData = await this.recipeApi.getRecipes()
        recipesData.map(recipe => new Recipe(recipe)).forEach(recipe => {
            const card = new recipeCard(recipe)
            this.$recipesContainer.appendChild(card.CreateRecipeCard())
        })
        //Créer un tableau de tout les ingrédients
        let recupTagListsIngredients = await this.recipeApi.getTagIngredients("ingredients")
        // Pour chaque ingrédients, créer un élément li dans lequel il y a un ingrédient
        const selectTagIngredients = new Select(recupTagListsIngredients)
        this.$selects.appendChild(selectTagIngredients.CreateSelectBox())
        // console.log(recupTagListsIngredients)
    }
}
const app = new App()
app.main()
