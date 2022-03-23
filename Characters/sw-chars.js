import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
  populateDOM(people)
})

const maleCharacters = people.filter((person) => person.gender === 'male') 
const femaleCharacters = people.filter((person) => person.gender === 'female') 



const otherCharacters = people.filter((person) => {
  if (
    person.gender !== 'male' && person.gender !== 'female'
  ) {
    return person
  }
})

const maleCharsButton = document.createElement('button')
maleCharsButton.textContent = 'Male Characters'
maleCharsButton.addEventListener('click', () => populateDOM(maleCharacters))

const otherCharactersButton = document.createElement('button')
otherCharactersButton.textContent = 'Other Characters'
otherCharactersButton.addEventListener('click', () => populateDOM(otherCharacters))

const femaleCharactersButton = document.createElement('button')
femaleCharactersButton.textContent = 'Female Characters'
femaleCharactersButton.addEventListener('click', () => populateDOM(femaleCharacters))

header.appendChild(allCharsButton)
header.appendChild(maleCharsButton)
header.appendChild(femaleCharactersButton)
header.appendChild(otherCharactersButton)

function populateDOM(characters) {
  removeChildren(main)
  characters.forEach((person) => {
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')

    let charNum = getLastNumber(person.url)

    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement('figcaption')
    personCap.textContent = person.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
  })
}

populateDOM(people)