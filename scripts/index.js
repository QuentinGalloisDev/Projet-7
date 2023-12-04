// La class app appelle l'api ainsi que les class Recipe qui crééent un model de données pour chaque recettes et recipeCard qui créé le contenu html à remplir par les données de Recipe.
class App {
    constructor() {
        this.$recipesContainer = document.querySelector(".recipesContainer")
        this.$header = document.querySelector("header")
        this.$selects = document.querySelector(".selects")
        // Insérer le select après le header
        this.recipeApi = new RecipeApi('PetitsPlats/recipes.json')
        //Créer un tableau dans lequel il y aura les tags 
        this.tabOfTags = [];
        this.searchInputText = '';
        this.searchingByText = new Search(this.tabOfTags, this.searchInputText)
        this.noRecipeFoundMessage = document.querySelector(".noRecipeFound")
    }
    onNewTagAdded(text, type, recipes) {
        this.tabOfTags.push({ text, type })
        let results = new Search(this.tabOfTags, this.searchInputText).searchByTags(recipes)
        this.$recipesContainer.innerHTML = ""
        this.displayRecipes(results)
        this.displayRecipesNumber(results.length)
        // const results = new Search('/PetitsPlats/recipes.json', this.tabOfTags).search()
        // Relancer l'affichage selon results
    }
    onTagDeleted(textTagClose, recipes) {
        this.tabOfTags = this.tabOfTags.filter((tagClose) => tagClose.text != textTagClose)
        let textValid = document.querySelector("#inputForTextualSearch").checkValidity()
        if (this.tabOfTags.length > 0) {
            let results = new Search(this.tabOfTags, this.searchInputText).searchByTags(recipes)
            // results = result
            this.$recipesContainer.innerHTML = ""
            this.displayRecipes(results)
            this.displayTagsSelect(results)
            this.displayRecipesNumber(results.length)
        }
        else {
            if (textValid === true) {
                recipes = new Search(this.tabOfTags, this.searchInputText).searchByText(recipes)
            }
            let recipesContainerToErase = document.querySelector(".recipesContainer")
            recipesContainerToErase.innerHTML = ""
            this.displayTagsSelect(recipes)
            this.displayRecipes(recipes)
            this.displayRecipesNumber(recipes.length)
        }

    }

    //tagType en param
    displayTagsSelect(recipes) {
        // Au clic faire une recherche dans les tags pour récupérer tout les tags des recettes qu s'affichent.
        let tagToShow = new Search(this.tabOfTags, this.searchInputText).searchByTags(recipes)
        let selectTagIngredientsToErase = document.querySelector(".select-box-ingredients")
        let tagIngredientsToShow = this.recipeApi.getTagIngredients(tagToShow).then((response) => {
            tagIngredientsToShow = response
            // Enlever le tag déjà sélectionné.
            selectTagIngredientsToErase.innerHTML = ""
            // Rappeler un select avec les tags ingredients.
            let ingredientType = this.tabOfTags.filter((type) => type.type === "ingredients")
            // Transformer le tableau d'objets en liste d'ingredients comme tagIngredientsToShow
            ingredientType = ingredientType.map(ingredient => ingredient.text)
            // filtrer pour récupérer les tags qui ne correspondent pas au texte dans ingredientType. Faire une itération dans ingredientType.
            tagIngredientsToShow = tagIngredientsToShow.filter((ingredient) => {
                if (ingredientType.includes(ingredient)) {
                    return false
                }
                else {
                    return true
                }
            }
            )
            let selectTagIngredients = new Select(tagIngredientsToShow, "ingredients", this.tabOfTags)
            //  La fonction onNewTagAdded étant appelé dans le selectPattern, la portée est réduite et on perd le this.
            // On bind le this à l'éxécution de la fonction pour pouvoir le réutilisé.
            // Une autre solution serait de faire une fonction fléchée qui exécute la fonction que l'on souhaite:
            // (text, type)=> this.onNewTagAdded(text,type)
            this.$selects.appendChild(selectTagIngredients.createSelectBox(
                // this.onNewTagAdded.bind(this),
                // this.onTagDeleted.bind(this)
                (text, type, recipesData) => this.onNewTagAdded(text, type, recipes),
                (text, recipesData) => this.onTagDeleted(text, recipes),
                (recipesData) => this.displayTagsSelect(recipes)
            ))
        })

        let selectTagUstensilsToErase = document.querySelector(".select-box-ustensils")
        let tagUstensilsToShow = this.recipeApi.getTagUstensils(tagToShow).then((response) => {
            tagUstensilsToShow = response

            selectTagUstensilsToErase.innerHTML = ""
            let ustensilsType = this.tabOfTags.filter((type) => type.type === "ustensils")
            ustensilsType = ustensilsType.map(ustensil => ustensil.text)
            // filtrer pour récupérer les tags qui ne correspondent pas au texte dans ingredientType. Faire une itération dans ingredientType.
            tagUstensilsToShow = tagUstensilsToShow.filter((ustensil) => {
                if (ustensilsType.includes(ustensil)) {
                    return false
                }
                else {
                    return true
                }
            }
            )

            let selectTagUstensils = new Select(tagUstensilsToShow, "ustensils", this.tabOfTags)
            this.$selects.appendChild(selectTagUstensils.createSelectBox(
                // this.onNewTagAdded.bind(this),
                // this.onTagDeleted.bind(this)
                (text, type, recipesData) => this.onNewTagAdded(text, type, recipes),
                (text, recipesData) => this.onTagDeleted(text, recipes),
                (recipesData) => this.displayTagsSelect(recipes)

            ))
        })
        let tagApplianceToShow = this.recipeApi.getTagAppliance(tagToShow).then((response) => {
            tagApplianceToShow = response
            let selectTagApplianceToErase = document.querySelector(".select-box-appliance")
            selectTagApplianceToErase.innerHTML = ""
            let applianceType = this.tabOfTags.filter((type) => type.type === "appliance")
            applianceType = applianceType.map(appliance => appliance.text)
            // filtrer pour récupérer les tags qui ne correspondent pas au texte dans ingredientType. Faire une itération dans ingredientType.
            tagApplianceToShow = tagApplianceToShow.filter((appliance) => {
                if (applianceType.includes(appliance)) {
                    return false
                }
                else {
                    return true
                }
            }
            )
            let selectTagAppliance = new Select(tagApplianceToShow, "appliance", this.tabOfTags)
            //  La fonction onNewTagAdded étant appelé dans le selectPattern, la portée est réduite et on perd le this.
            // On bind le this à l'éxécution de la fonction pour pouvoir le réutilisé.
            // Une autre solution serait de faire une fonction fléchée qui exécute la fonction que l'on souhaite:
            // (text, type)=> this.onNewTagAdded(text,type)
            this.$selects.appendChild(selectTagAppliance.createSelectBox(
                // this.onNewTagAdded.bind(this),
                // this.onTagDeleted.bind(this)
                (text, type, recipesData) => this.onNewTagAdded(text, type, recipes),
                (text, recipesData) => this.onTagDeleted(text, recipes),
                (recipesData) => this.displayTagsSelect(recipes)
            ))
        })
    }
    displayRecipesNumber(recipesNumberToShow) {
        let recipesNumber = document.querySelector(".recipesNumber")
        recipesNumber.innerHTML = ""
        recipesNumber.innerHTML = `${recipesNumberToShow} recettes`
    }
    displayRecipes(recipesToShow) {
        let numberCardId = 1
        let cardId = `recipe${numberCardId}`
        recipesToShow.map(recipe => new Recipe(recipe)).forEach(recipe => {
            const card = new recipeCard(recipe, cardId)
            cardId = `recipe${numberCardId += 1}`
            this.$recipesContainer.appendChild(card.CreateRecipeCard())
        })
    }

    async main() {
        const recipesData = await this.recipeApi.getRecipes()
        this.displayRecipes(recipesData)
        //Créer un tableau de tout les ingrédients
        let recupTagListsIngredients = await this.recipeApi.getTagIngredients(recipesData)
        // Pour chaque ingrédients, créer un élément li dans lequel il y a un ingrédient 
        let selectTagIngredients = new Select(recupTagListsIngredients, "ingredients")

        this.displayRecipesNumber(recipesData.length)

        this.$selects.appendChild(selectTagIngredients.createSelectBox(
            // this.onNewTagAdded.bind(this),
            // this.onTagDeleted.bind(this)
            (text, type, recipes) => this.onNewTagAdded(text, type, recipesData),
            (text, recipes) => this.onTagDeleted(text, recipesData),
            (recipes) => this.displayTagsSelect(recipesData)
        ))

        // Dans le select pattern
        let recupTagListsUstensils = await this.recipeApi.getTagUstensils(recipesData)
        let selectTagUstensils = new Select(recupTagListsUstensils, "ustensils")
        this.$selects.appendChild(selectTagUstensils.createSelectBox(
            // this.onNewTagAdded.bind(this),
            // this.onTagDeleted.bind(this)
            (text, type, recipes) => this.onNewTagAdded(text, type, recipesData),
            (text, recipes) => this.onTagDeleted(text, recipesData),
            (recipes) => this.displayTagsSelect(recipesData)
        ))

        let recupTagListAppliance = await this.recipeApi.getTagAppliance(recipesData)
        let selectTagAppliance = new Select(recupTagListAppliance, "appliance")
        this.$selects.appendChild(selectTagAppliance.createSelectBox(
            // this.onNewTagAdded.bind(this),
            // this.onTagDeleted.bind(this)
            (text, type, recipes) => this.onNewTagAdded(text, type, recipesData),
            (text, recipes) => this.onTagDeleted(text, recipesData),
            (recipes) => this.displayTagsSelect(recipesData)
        ))

        // Barre de recherche

        let inputSearch = document.querySelector("#inputForTextualSearch")
        inputSearch.addEventListener("keyup", (event) => {
            event.preventDefault()
            // valid renvoie true si le pattern de la barre de recherche est valide.
            let validTextSearch = document.querySelector("#inputForTextualSearch").checkValidity();
            if (validTextSearch) {

                //Renvoie le contenu du champ
                inputSearch.style = "border-radius: 12px 12px 0px 0px;"

                //Si le pattern est valide on faite une recherche des tags qui correspondent au texte entrée par l'utilisateur dans le tableau allTags.
                let userInput = event.target.value.toLowerCase()
                // On créer une regex avec l'userInput pour rechercher ce qui correspond dans le tableau allTags
                let regexSearch = new RegExp('(?:' + userInput + ')')
                this.searchInputText = regexSearch

                let recipeToShowFilteredByText = new Search(this.tabOfTags, this.searchInputText)
                let recipeFilteredByText = []

                recipeFilteredByText = recipeToShowFilteredByText.searchByText(recipesData)

                this.$recipesContainer.innerHTML = ""
                this.displayRecipes(recipeFilteredByText)
                this.displayRecipesNumber(recipeFilteredByText.length)
                //  On efface les selecttags et on en remet avec les nouvelles données.

                // Select ingredients
                //Créer un tableau de tout les ingrédients
                let recupTagIngredients = this.recipeApi.getTagIngredients(recipeFilteredByText).then((tagsIngredient) => {
                    recupTagIngredients = tagsIngredient

                    let selectBoxIngredients = document.querySelector(".select-box-ingredients")
                    selectBoxIngredients.innerHTML = ""

                    let selectTagIngredients = new Select(recupTagIngredients, "ingredients")

                    this.$selects.appendChild(selectTagIngredients.createSelectBox(
                        // this.onNewTagAdded.bind(this),
                        // this.onTagDeleted.bind(this)
                        (text, type, recipes) => this.onNewTagAdded(text, type, recipeFilteredByText),
                        (text, recipes) => this.onTagDeleted(text, recipeFilteredByText),
                        (recipes) => this.displayTagsSelect(recipeFilteredByText)
                    ))
                })
                //Select ustensils
                let recupTagUstensils = this.recipeApi.getTagUstensils(recipeFilteredByText).then((tagUstensils) => {
                    recupTagUstensils = tagUstensils
                    let selectBoxUstensils = document.querySelector(".select-box-ustensils")
                    selectBoxUstensils.innerHTML = ""

                    let selectTagUstensils = new Select(recupTagUstensils, "ustensils")
                    this.$selects.appendChild(selectTagUstensils.createSelectBox(
                        (text, type, recipes) => this.onNewTagAdded(text, type, recipeFilteredByText),
                        (text, recipes) => this.onTagDeleted(text, recipeFilteredByText),
                        (recipes) => this.displayTagsSelect(recipeFilteredByText)
                    ))
                })
                //Select Appliance
                let recupTagAppliance = this.recipeApi.getTagAppliance(recipeFilteredByText).then((tagAppliance) => {
                    recupTagAppliance = tagAppliance
                    let selectBoxAppliance = document.querySelector(".select-box-appliance")
                    selectBoxAppliance.innerHTML = ""

                    let selectTagAppliance = new Select(recupTagAppliance, "appliance")
                    this.$selects.appendChild(selectTagAppliance.createSelectBox(
                        (text, type, recipes) => this.onNewTagAdded(text, type, recipeFilteredByText),
                        (text, recipes) => this.onTagDeleted(text, recipeFilteredByText),
                        (recipes) => this.displayTagsSelect(recipeFilteredByText)
                    ))
                })
                // Si la recherche textuelle ne donne pas de résultat, afficher le message d'erreur.

                if (recipeFilteredByText.length === 0) {
                    let errorMsg = document.querySelector(".noRecipeFound")

                    errorMsg.style.display = "block"
                    errorMsg.innerHTML = `Aucune recette ne contient ${event.target.value}. vous pouvez chercher «tarte aux pommes»,«poisson»,etc.`
                }
            }
            else {
                // Sinon vérifier si il y à des tags selectionnés et faire une recherche et un affichage avec les tags.
                if (this.tabOfTags.length > 0) {
                    this.$recipesContainer.innerHTML = ""
                    let recipeFilteredByTags = []

                    let recipeToShowFilteredByTags = new Search(this.tabOfTags, this.searchInputText)

                    recipeFilteredByTags = recipeToShowFilteredByTags.searchByTags(recipesData)


                    this.displayTagsSelect(recipeFilteredByTags)
                    this.displayRecipes(recipeFilteredByTags)
                    this.displayRecipesNumber(recipeFilteredByTags.length)

                }
                else {
                    this.$recipesContainer.innerHTML = ""
                    this.displayTagsSelect(recipesData)
                    this.displayRecipes(recipesData)
                    this.displayRecipesNumber(recipesData.length)
                }
            }
        })
    }
}
const app = new App()
app.main()
