//Design pattern créant les éléments du dom pour les cards de recettes.
class recipeCard {
    constructor(recipe, id) {
        this._recipe = recipe
        this._id = id
    }

    CreateRecipeCard() {
        let card = document.createElement("div")
        card.setAttribute("id", `${this._id}`)
        card.setAttribute("class", "cardRecipe")
        card.insertAdjacentHTML("afterbegin", `<img src="./${this._recipe.image}">
        <h1>${this._recipe.name}</h1>
        
        <div class="recipeDescription">
        <h2>Recette</h2>
        <p>${this._recipe.description}</p>
        </div>
        <div class="ingredients">
        <h2>Ingrédients</h2>
        <ul class="ingredientsList">
        </ul>
        </div>
        `)

        let list = card.querySelector(`.cardRecipe[id=${this._id}] .ingredientsList`)



        // list.insertAdjacentHTML("beforeend", `</div>`)
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
            // ingredientList.innerHTML = `${elementList} <span>${elementQuantity} ${elementUnit}</span>`
            // list.appendChild(ingredientList)
        })

        // card.insertAdjacentElement("beforeend", list)

        // card.insertAdjacentHTML("afterbegin", list)
        return card
    }
}
