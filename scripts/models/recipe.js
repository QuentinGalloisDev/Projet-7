class Recipe {
    constructor(data) {
        this._image = data.image
        this._name = data.name
        this._description = data.description
        this._ingredients = data.ingredients
    }
    get image() {
        return `/Images/PhotosLesPetitsPlats/${this._image}`
    }
    get name() {
        return this._name
    }
    get description() {
        return this._description
    }
    get ingredients() {
        //Retourne un tableau des ingrédients
        return this._ingredients
    }
}