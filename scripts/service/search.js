class Search extends Api {
    constructor(url, tags, textSearch) {
        super(url)
        this.tags = tags;
        this.textSearch = textSearch
        // this.recipes = recipes
    }
    async getRecipes() {

        return await this.get()
    }
    // async 
    searchByTags(recipes) {
        // let recipes = await this.get()
        // recipes = await this.getRecipes()

        // recipes = await this.searchByText(recipes)

        const recipesFilteredByTags = recipes.filter((recipe) => {
            let isRecipeValid = true;

            const selectedIngredients = this.tags.filter(tag => tag.type === "ingredients")
            const selectedUstensils = this.tags.filter(tag => tag.type === "ustensils")
            const selectedAppliance = this.tags.filter(tag => tag.type === "appliance")

            selectedIngredients.forEach(tagIngredient => {
                const isRecipeHasIngredients = recipe.ingredients.some((ingredient) => ingredient.ingredient === tagIngredient.text)
                //Si on ne trouve pas d'ingredients on passe le flag à false
                if (!isRecipeHasIngredients) {
                    isRecipeValid = false
                }
            });

            selectedUstensils.forEach(tagUstensil => {
                const isRecipeHasUstensils = recipe.ustensils.some((ustensil) => ustensil === tagUstensil.text)
                //Si on ne trouve pas d'ustensils on passe le flag à false
                if (!isRecipeHasUstensils) {
                    isRecipeValid = false
                }
            })

            selectedAppliance.forEach(tagAppliance => {
                const isRecipeHasAppliance = recipe.appliance.includes(tagAppliance.text)
                //Si on ne trouve pas d'appliance on passe le flag à false
                if (!isRecipeHasAppliance) {
                    isRecipeValid = false
                }
            })

            return isRecipeValid
        })
        console.log(recipesFilteredByTags)
        return recipesFilteredByTags




        // Recherche textuelle

        //Le système recherche des recettes correspondant à l’entrée utilisateur dans :
        //le titre de la recette,
        //la liste des ingrédients de la recette,
        //la description de la recette.

        // L'entrée utilisateur peut être en majuscules ou en minuscule donc faire en sorte de comparer les entréer utilisateur et les données avec des .lowercase()

    }
    // async
    searchByText(recipes) {
        // recipes = await this.getRecipes()
        // let recipeByTag = this.searchByTags(recipes)
        // if (this.tags.length > 0) {
        //     // recipes = await this.searchByTags(recipes)
        //     recipes = this.searchByTags(recipes)
        //     console.log(recipes)
        // }

        let textvalid = document.querySelector("#inputForTextualSearch").checkValidity()
        if (textvalid == true) {

            recipes = this.searchByTags(recipes)

        }
        else {
            console.log(textvalid)
        }


        const recipesFilteredByText = recipes.filter((recipe) => {
            let isRecipeHasText = true;

            const isRecipeHasTextInName = this.textSearch.test(recipe.name.toLowerCase())


            const isRecipeHasTextInIngredients = recipe.ingredients.some((ingredient) => this.textSearch.test(ingredient.ingredient.toLowerCase()))
            //Si on ne trouve pas d'ingredients on passe le flag à false

            const isRecipeHasTextInDescription = this.textSearch.test(recipe.description.toLowerCase())

            if (!isRecipeHasTextInName && !isRecipeHasTextInIngredients && !isRecipeHasTextInDescription) {
                isRecipeHasText = false
            }
            return isRecipeHasText
        });

        console.log(recipesFilteredByText)
        return recipesFilteredByText
    }
}

/*  1. Recherche par texte => recipes total => recipes par tags => recherche texte
     Si valid === false ===> recipes tags
    2. Recherche par tags => recipes total => recipes par texte (soit > 3 soit tout) => recherche par tags
    3. La liste => tags des recettes - tags selectionnés
    4. Vérifier le delete de tags sur les appliances et ustensils 
*/ 