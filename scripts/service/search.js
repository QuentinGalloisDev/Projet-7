class Search extends Api {
    constructor(url, tags, textSearch) {
        super(url)
        this.tags = tags;
        this.textSearch = textSearch

    }
    async getRecipes() {

        return await this.get()
    }
    async search() {
        let recipes = await this.get()
        let recipesTrieByIngredient = recipes.filter(recipe =>
            recipe.ingredients.some(ingredient => this.tags.includes(ingredient.ingredient))
        )
        let recipeTrieByUstensils = recipes.filter(recipe =>
            recipe.ustensils.some(ustensil => this.tags.includes(ustensil))
        )
        let recipeTrieByAppliance = recipes.filter(recipe =>
            this.tags.includes(recipe.appliance)
        )
        let tableauTotal = recipesTrieByIngredient.concat(recipeTrieByUstensils, recipeTrieByAppliance)
        console.log(tableauTotal)
    }
}