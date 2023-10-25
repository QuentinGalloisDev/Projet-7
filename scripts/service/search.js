class Search extends Api {
    constructor(url, tags, textSearch) {
        super(url)
        this.tags = tags;
        this.textSearch = textSearch

    }
    async getRecipes() {

        return await this.get()
    }
    async searchByTags() {
        let recipes = await this.get()

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
    async searchByText() {
        let recipes = await this.get()
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