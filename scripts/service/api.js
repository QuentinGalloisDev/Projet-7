class api {
    constructor(url) {
        this._url = url
    }
    async get() {
        return fetch(this._url)
            .then(response => response.json())
            .then(response => response.recipes)
            .catch(error => console.log(`une erreur est survenue : ${error}`))
    }
}
//Récupère toutes les recettes
class recipeApi extends api {
    constructor(url) {
        super(url)
    }
    async getRecipes() {
        console.log(await this.get())
        return await this.get()
    }
    async getTagIngredients(ingredients) {
        // Créer un tableau avec tout les ingrédients
        let recipes = await this.get()
        ingredients = []
        recipes.map(e => {
            e.ingredients.map(element => {
                ingredients.push(element.ingredient)
            })

        })
        // console.log(tag)
        let unique = [...new Set(ingredients)]
        return unique
        // Retourner un tableau sans doublon

    }
}

//Récupère les tableaux des ingrédients, ustensile et appareils
// class recupTagListElements extends recipeApi {
//     constructor(tagType) {
//         super(tagType)
//     }
//     async getTagElements() {
//         // Créer un tableau avec tout les ingrédients
//         const recipes = await getRecipes()
//         let tag =
//             recipes.map(tag => {
//                 tag.push(tag.tagType)
//             })
//         console.log(tag)
//         return tag
//         // Retourner un tableau sans doublon

//     }
// }

// Récupère les recettes suivant une recherche(ingredients,ustensiles ou autre)
// class recipeSearchApi extends api{
//     constructor(url){
//         search(url)
//     }
//     async getSearchResult(){
//         return await
//     }

// }