class Search {
    constructor(tags, textSearch) {

        this.tags = tags;
        this.textSearch = textSearch

    }

    searchByTags(recipes) {


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


        let tagSelected = document.querySelector(".tags")

        if (tagSelected.innerHTML !== "") {
            recipes = this.searchByTags(recipes)
        }
        // Version avec méthode de l'objet array filter
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

        return recipesFilteredByText

        // Version avec boucles natives
        // let recipeByTextNative = []
        // for (let i of recipes) {
        //     if (this.textSearch.test(i.name.toLowerCase())) {
        //         recipeByTextNative.push(i)
        //     }
        //     for (let ingredient of i.ingredients) {
        //         if (this.textSearch.test(ingredient.ingredient.toLowerCase())) {
        //             recipeByTextNative.push(i)
        //         }
        //     }
        //     if (this.textSearch.test(i.description.toLowerCase())) {
        //         recipeByTextNative.push(i)
        //     }

        // }
        // recipeByTextNative = [...new Set(recipeByTextNative)]
        // console.log(recipeByTextNative)
        // return recipeByTextNative
    }
}

/*  1. Recherche par texte => recipes total => recipes par tags => recherche texte
     Si valid === false ===> recipes tags
    2. Recherche par tags => recipes total => recipes par texte (soit > 3 soit tout) => recherche par tags
    3. La liste => tags des recettes - tags selectionnés
    4. Vérifier le delete de tags sur les appliances et ustensils 
*/ 