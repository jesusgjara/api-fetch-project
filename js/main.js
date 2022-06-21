//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const potentialPet = new Poke (
          data.name, data.height, data.weight, data.types, data.sprites.other["official-artwork"]["front_default"]
        )
        potentialPet.getTypes()
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

class Poke {
  constructor(name, height, weight, types, image) {
    this.name = name
    this.height = height
    this.weight = weight
    this.types = types
    this.image = image
    this.housepet = true
    this.reason = []
    this.typeList = []
  }

  getTypes() {
    this.types.forEach(property => {
      this.typeList.push(property.type.name)
    })
    console.log(this.typeList)
  }
}
