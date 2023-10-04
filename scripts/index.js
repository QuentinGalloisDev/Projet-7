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
        this.recipeApi = new RecipeApi('/PetitsPlats/recipes.json')

    }
    async main() {
        const recipesData = await this.recipeApi.getRecipes()
        recipesData.map(recipe => new Recipe(recipe)).forEach(recipe => {
            const card = new recipeCard(recipe)
            this.$recipesContainer.appendChild(card.CreateRecipeCard())
        })
        console.log(recipesData)
        //Créer un tableau de tout les ingrédients
        let recupTagListsIngredients = await this.recipeApi.getTagIngredients(recipesData)
        // Pour chaque ingrédients, créer un élément li dans lequel il y a un ingrédient 
        let selectTagIngredients = new Select(recupTagListsIngredients, "ingredients")

        this.$selects.appendChild(selectTagIngredients.createSelectBox())
        // Lorsque l'utilisateur clique sur un tag des ingrédients, on récupère un tableau avec les tag selectionnés.
        let tagInList = document.querySelectorAll(".select-box-ingredients li")
        tagInList.forEach(elem => {
            elem.addEventListener("click", e => {
                let tagsSelect = selectTagIngredients._tagSelected
                console.log(tagsSelect)
                // Quand l'utilisateur clique sur un tag dans la liste, on effectue une recherche dans les recettes suivant les données du tableau des tag sélectionné

                // Pour le trie des recettes selon les tags: on vérifie si le tableau tagSelect contient un des ingredients contenu dans le tableau ingredients d'une des recettes.
                // Si il y en à un la méthode some renvoie true et créer un nouveau tableau avec la méthode filter.
                let recipesTrie = recipesData.filter(recipe =>
                    recipe.ingredients.some(ingredient => tagsSelect.includes(ingredient.ingredient))
                )
                console.log(recipesTrie)
                this.$recipesContainer.innerHTML = ""
                recipesTrie.map(recipe => new Recipe(recipe)).forEach(recipe => {
                    const card = new recipeCard(recipe)
                    this.$recipesContainer.appendChild(card.CreateRecipeCard())
                })
                // Lier l'affichage des tags restant au recettes qui s'affichent
                recupTagListsIngredients = this.recipeApi.getTagIngredients(recipesTrie).then((sort) => {
                    // Les tags qui sont dans les recettes qui s'affichent = sort
                    console.log(sort)
                    let tagIngredient = document.querySelector(".select-box-ingredients")
                    tagIngredient.innerHTML = ""
                    let newselectTagIngredients = new Select(sort, "ingredients")
                    // et on affiche les recettes qui correspondent dans le DOM.
                    this.$selects.insertAdjacentElement("afterbegin", newselectTagIngredients.createSelectBox())
                })

                //Lorsque les tag s'affiche dans le dom, on a la possibilité de les fermer en cliquant sur la crois .closeTag
                let closeTag = document.querySelectorAll(".closeTag")
                closeTag.forEach(close => {
                    // Lorsqu'on clique sur la croix, le tableau des tags est actualisé.
                    close.addEventListener("click", e => {
                        let tagsSelect = selectTagIngredients._tagSelected
                        console.log(tagsSelect)
                        recipesTrie = recipesTrie.filter(recipe => recipe.ingredients.some(ingredient => tagsSelect.includes(ingredient.ingredient)))
                        console.log(recipesTrie)
                        this.$recipesContainer.innerHTML = ""
                        recipesTrie.map(recipe => new Recipe(recipe)).forEach(recipe => {
                            const card = new recipeCard(recipe)
                            this.$recipesContainer.appendChild(card.CreateRecipeCard())
                            // // Lier l'affichage des tags restant au recettes qui s'affichent
                            // recupTagListsIngredients = this.recipeApi.getTagIngredients(recipesTrie)
                            // console.log(recupTagListsIngredients)
                            // selectTagIngredients = new Select(recupTagListsIngredients, "ingredients")
                            // this.$selects.innerHTML = ""
                            // this.$selects.appendChild(selectTagIngredients.createSelectBox())
                        })
                        //Si aucun tag alors afficher toutes les recettes
                        if (tagsSelect.length === 0) {
                            recipesData.map(recipe => new Recipe(recipe)).forEach(recipe => {
                                const card = new recipeCard(recipe)
                                this.$recipesContainer.appendChild(card.CreateRecipeCard())
                                // Si aucun tag afficher tout les tags

                                let tagIngredient = document.querySelector(".select-box-ingredients")
                                tagIngredient.innerHTML = ""
                                this.$selects.insertAdjacentElement("afterbegin", selectTagIngredients.createSelectBox())
                            })
                        }
                    })
                })

            })
        })


        let recupTagUstensils = await this.recipeApi.getTagUstensils()
        const selectTagUstensils = new Select(recupTagUstensils, "ustensils")
        this.$selects.appendChild(selectTagUstensils.createSelectBox())

        let recupTagAppliance = await this.recipeApi.getTagAppliance()
        const selectTagAppliance = new Select(recupTagAppliance, "appliance")
        this.$selects.appendChild(selectTagAppliance.createSelectBox())


        //la barre de recherche et le dropdown

        let allTags = recupTagListsIngredients.concat(recupTagUstensils, recupTagAppliance)


        //la barre de recherche et le dropdown
    }
}
const app = new App()
app.main()
