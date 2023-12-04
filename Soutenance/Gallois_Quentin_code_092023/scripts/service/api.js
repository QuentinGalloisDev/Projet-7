class Api {
    constructor(url) {
        this._url = url
    }
    async get() {
        return fetch(this._url)
            .then(response => response.json())
            .then(response => response.recipes)
        // .catch(error => console.log(`une erreur est survenue : ${error}`))
    }
}
//Récupère toutes les recettes
class RecipeApi extends Api {
    constructor(url) {
        super(url)
    }
    async getRecipes() {

        return await this.get()
    }
    async getTagIngredients(recipes) {
        // Créer un tableau avec tout les ingrédients
        let ingredients = []
        recipes.map(e => {
            e.ingredients.map(element => {
                ingredients.push(element.ingredient)
            })

        })
        // Retourner un tableau sans doublon
        let uniqueIngredient = [...new Set(ingredients)]
        return uniqueIngredient
    }
    async getTagAppliance(recipes) {
        // let recipes = await this.get()
        let appliances = []
        recipes.map(e => {
            appliances.push(e.appliance)
        })
        let uniqueAppliance = [...new Set(appliances)]
        return uniqueAppliance
    }
    async getTagUstensils(recipes) {
        // let recipes = await this.get()
        let ustensils = []
        recipes.map(e => {
            e.ustensils.map(ustensil => {
                ustensils.push(ustensil)
            })

        })
        let uniqueUstensils = [...new Set(ustensils)]
        return uniqueUstensils
    }
}

