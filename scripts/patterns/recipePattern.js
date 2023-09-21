//Design pattern créant les éléments du dom pour les cards de recettes.
class recipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }
    CreateRecipeCard() {
        let card = document.createElement("div")
        card.setAttribute("class", "cardRecipe")
        card.insertAdjacentHTML("afterbegin", `<img src="${this._recipe.image}">
        <h1>${this._recipe.name}</h1>
        <h2>Recette</h2>
        <p>${this._recipe.description}</p>
        <h2>Ingrédients</h2>
        `)
        let list = document.createElement("ul")
        card.appendChild(list)
        this._recipe.ingredients.map((ingredient) => {

            let elementList = ingredient.ingredient
            let elementQuantity = ""
            let elementUnit = ""
            if (ingredient.quantity) {
                elementQuantity = ingredient.quantity
            }
            else {
                elementQuantity = ""
            }
            if (ingredient.unit) {
                elementUnit = ingredient.unit
            }
            else {
                elementUnit = ""
            }

            list.insertAdjacentHTML("beforeend", `<li>${elementList} <span>${elementQuantity} ${elementUnit}</span></li>`)
        })

        // card.insertAdjacentHTML("afterbegin", list)
        return card
    }
}
