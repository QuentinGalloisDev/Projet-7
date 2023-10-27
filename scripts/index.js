// Faire une requete au fichier json pour récupérer toutes les recettes.

// Créer un design pattern pour les cards affichant les recettes.

// Le design pattern créer les éléments dans le dom avec pour paramètres les données que l'on récupérera dans la requete.

// Créer un tableau des ingrédients et les intégrer avec .map dan le ul des options
// Pareil pour les appareils et les ustensiles 

// //Le select avec la barre de recherche.

// La class app appelle l'api ainsi que les class Recipe qui crééent un model de données pour chaque recettes et recipeCard qui créé le contenu html à remplir par les données de Recipe.
class App {
    constructor() {
        this.$recipesContainer = document.querySelector(".recipesContainer")
        this.$header = document.querySelector("header")
        this.$selects = document.querySelector(".selects")
        // Insérer le select après le header
        this.recipeApi = new RecipeApi('/PetitsPlats/recipes.json')
        //Créer un tableau dans lequel il y aura les tags 
        this.tabOfTags = [];
        this.searchInputText = "";
        // console.log(this.tabOfTags)
        this.searchingByText = new Search('/PetitsPlats/recipes.json', this.tabOfTags, this.searchInputText)
        this.noRecipeFoundMessage = document.querySelector(".noRecipeFound")
    }
    onNewTagAdded(text, type, recipes) {
        this.tabOfTags.push({ text, type })
        console.log(this.tabOfTags)
        let results = new Search('/PetitsPlats/recipes.json', this.tabOfTags, this.searchInputText, recipes).searchByTags().then((result) => {
            results = result
            console.log(results)
            this.$recipesContainer.innerHTML = ""
            this.displayRecipes(results)
        })
        // const results = new Search('/PetitsPlats/recipes.json', this.tabOfTags).search()
        // Relancer l'affichage selon results
    }
    onTagDeleted(textTagClose, recipes) {
        this.tabOfTags = this.tabOfTags.filter((tagClose) => tagClose.text != textTagClose)
        console.log(this.tabOfTags)
        let results = new Search('/PetitsPlats/recipes.json', this.tabOfTags, this.searchInputText, recipes).searchByTags().then((result) => {
            results = result
            console.log(results)
            this.$recipesContainer.innerHTML = ""
            this.displayRecipes(results)

        })
    }

    displayRecipes(recipesToShow) {
        recipesToShow.map(recipe => new Recipe(recipe)).forEach(recipe => {
            const card = new recipeCard(recipe)
            this.$recipesContainer.appendChild(card.CreateRecipeCard())
        })
    }

    async main() {
        const recipesData = await this.recipeApi.getRecipes()
        // recipesData.map(recipe => new Recipe(recipe)).forEach(recipe => {
        //     const card = new recipeCard(recipe)
        //     this.$recipesContainer.appendChild(card.CreateRecipeCard())
        // })
        this.displayRecipes(recipesData)
        // console.log(recipesData)
        //Créer un tableau de tout les ingrédients
        let recupTagListsIngredients = await this.recipeApi.getTagIngredients(recipesData)
        // Pour chaque ingrédients, créer un élément li dans lequel il y a un ingrédient 
        let selectTagIngredients = new Select(recupTagListsIngredients, "ingredients")
        // console.log(selectTagIngredients._tags)

        //  La fonction onNewTagAdded étant appelé dans le selectPattern, la portée est réduite et on perd le this.
        // On bind le this à l'éxécution de la fonction pour pouvoir le réutilisé.
        // Une autre solution serait de faire une fonction fléchée qui exécute la fonction que l'on souhaite:
        // (text, type)=> this.onNewTagAdded(text,type)
        this.$selects.appendChild(selectTagIngredients.createSelectBox(
            // this.onNewTagAdded.bind(this),
            // this.onTagDeleted.bind(this)
            (text, type, recipes) => this.onNewTagAdded(text, type, recipesData),
            (text, recipes) => this.onTagDeleted(text, recipesData)
        ))

        // Dans le select pattern
        let recupTagUstensils = await this.recipeApi.getTagUstensils(recipesData)
        let selectTagUstensils = new Select(recupTagUstensils, "ustensils")
        this.$selects.appendChild(selectTagUstensils.createSelectBox(
            // this.onNewTagAdded.bind(this),
            // this.onTagDeleted.bind(this)
            (text, type, recipes) => this.onNewTagAdded(text, type, recipesData),
            (text, type, recipes) => this.onTagDeleted(text, type, recipesData)
        ))

        let recupTagAppliance = await this.recipeApi.getTagAppliance(recipesData)
        let selectTagAppliance = new Select(recupTagAppliance, "appliance")
        this.$selects.appendChild(selectTagAppliance.createSelectBox(
            // this.onNewTagAdded.bind(this),
            // this.onTagDeleted.bind(this)
            (text, type, recipes) => this.onNewTagAdded(text, type, recipesData),
            (text, type, recipes) => this.onTagDeleted(text, type, recipesData)
        ))

        // Barre de recherche

        let inputSearch = document.querySelector("#inputForTextualSearch")
        inputSearch.addEventListener("keyup", (event) => {
            event.preventDefault()
            // valid renvoie true si le pattern de la barre de recherche est valide.
            let valid = document.querySelector("#inputForTextualSearch").checkValidity();

            if (valid === true) {
                //Renvoie le contenu du champ
                console.log(event.target.value)
                // dropResult()
                inputSearch.style = "border-radius: 12px 12px 0px 0px;"

                //Si le pattern est valide on faite une recherche des tags qui correspondent au texte entrée par l'utilisateur dans le tableau allTags.
                let userInput = event.target.value.toLowerCase()
                // On créer une regex avec l'userInput pour rechercher ce qui correspond dans le tableau allTags
                let regexSearch = new RegExp('(?:' + userInput + ')')
                this.searchInputText = regexSearch

                let recipeToShowFilteredByText = new Search('/PetitsPlats/recipes.json', this.tabOfTags, this.searchInputText)
                console.log(this.searchInputText)
                console.log(recipeToShowFilteredByText.searchByText())
                let recipeFilteredByText = []
                recipeToShowFilteredByText.searchByText().then((recipe) => {
                    recipeFilteredByText = recipe
                    console.log(recipeFilteredByText)
                    this.$recipesContainer.innerHTML = ""
                    this.displayRecipes(recipeFilteredByText)

                    //  On efface les selecttags et on en remet avec les nouvelles données.

                    // Select ingredients
                    //Créer un tableau de tout les ingrédients
                    recupTagListsIngredients = this.recipeApi.getTagIngredients(recipeFilteredByText).then((tagsIngredient) => {
                        recupTagListsIngredients = tagsIngredient
                        console.log(recupTagListsIngredients)
                        let selectBoxIngredients = document.querySelector(".select-box-ingredients")
                        selectBoxIngredients.innerHTML = ""

                        let selectTagIngredients = new Select(recupTagListsIngredients, "ingredients")
                        //Fonctionne mais le selectTags se déplace à la fin des tags sans doute a cause du insertadjacenthtml afterbegin.
                        this.$selects.appendChild(selectTagIngredients.createSelectBox(
                            // this.onNewTagAdded.bind(this),
                            // this.onTagDeleted.bind(this)
                            (text, type, recipes) => this.onNewTagAdded(text, type, recipeFilteredByText),
                            (text, recipes) => this.onTagDeleted(text, recipeFilteredByText)
                        ))
                    })
                    //Select ustensils
                    recupTagUstensils = this.recipeApi.getTagUstensils(recipeFilteredByText).then((tagUstensils) => {
                        recupTagUstensils = tagUstensils
                        console.log(recupTagUstensils)
                        let selectBoxUstensils = document.querySelector(".select-box-ustensils")
                        selectBoxUstensils.innerHTML = ""

                        let selectTagUstensils = new Select(recupTagUstensils, "ustensils")
                        this.$selects.appendChild(selectTagUstensils.createSelectBox(
                            (text, type, recipes) => this.onNewTagAdded(text, type, recipeFilteredByText),
                            (text, recipes) => this.onTagDeleted(text, recipeFilteredByText)
                        ))
                    })
                    //Select Appliance
                    recupTagAppliance = this.recipeApi.getTagAppliance(recipeFilteredByText).then((tagAppliance) => {
                        recupTagAppliance = tagAppliance
                        console.log(recupTagAppliance)
                        let selectBoxAppliance = document.querySelector(".select-box-appliance")
                        selectBoxAppliance.innerHTML = ""

                        let selectTagAppliance = new Select(recupTagAppliance, "appliance")
                        this.$selects.appendChild(selectTagAppliance.createSelectBox(
                            (text, type, recipes) => this.onNewTagAdded(text, type, recipeFilteredByText),
                            (text, recipes) => this.onTagDeleted(text, recipeFilteredByText)
                        ))
                    })
                    if (recipeFilteredByText == []) {

                    }
                })


            }

            else {
                // hideResult()
                this.$recipesContainer.innerHTML = ""
                this.displayRecipes(recipesData)
            }

            //Si l'utilisateur clique ailleurs, fermer le dropdown
            window.addEventListener("click", e => {
                // hideResult()
            })

        })
    }
}
const app = new App()
app.main()
