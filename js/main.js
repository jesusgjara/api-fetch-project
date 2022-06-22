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
        potentialPet.isItHousePet()
        let decision = ""
        if(potentialPet.housepet) {
          decision = 'This Pokemon is small enough, light enough, and safe enough to be a good pet!'
        }else {
          decision = `This Pokemon would not be a good pet because ${potentialPet.reason.join(', ')}.`
        }
        const height = `Height: ${potentialPet.height / 10}m`
        const weight = `Weight: ${Math.floor(potentialPet.weight / 10)}Kg`
        const types = `Types: ${potentialPet.typeList.join(', ')}`
        document.getElementById('pokeName').innerText = potentialPet.name.charAt(0).toUpperCase() + potentialPet.name.slice(1);
        document.getElementById('height').innerText = height
        document.getElementById('weight').innerText = weight
        document.getElementById('types').innerText = types
        document.querySelector('h2').innerText = decision
        document.querySelector('img').src = potentialPet.image
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

  weightToKilograms(weight) {
    return Math.floor(weight / 10)
  }

  heightToCentimeters(height) {
    return height / 10
  }

  isItHousePet() {
    let badTypes = ["fire", "electric", "fighting", "poison", "ghost"]
    let weight = this.weightToKilograms(this.weight)
    let height = this.heightToCentimeters(this.height)
    if(weight > 180) {
      this.reason.push(`It is to heavy at ${weight}Kg`)
      this.housepet = false
    }
    if(height > 2.1) {
      this.reason.push(`It is to tall at ${height}m`)
      this.housepet = false
    }
    if(badTypes.some(elem => this.typeList.indexOf(elem) >= 0)) {
      this.reason.push('Its type is too dangerous')
      this.housepet = false
    }
  }
}

