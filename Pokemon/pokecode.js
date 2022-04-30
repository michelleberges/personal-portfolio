import { removeChildren } from '../utils/index.js'
const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }

  const loadedPokemon = []
  
  async function loadPokemon(offset = 0, limit = 25) {
    const pokeData = await getAPIData(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    for (const nameAndUrl of pokeData.results) {
      const pokemon = await getAPIData(nameAndUrl.url)
      const simplifiedPokemon = {
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        name: pokemon.name,
        types: pokemon.types,
        abilities: pokemon.abilities,
        moves: pokemon.moves.slice(0, 3),//I don't know if this makes sense but for some reason the card only shows 4moves works when pokemons are filtered by type. 
      }
      loadedPokemon.push(simplifiedPokemon)
      populatePokeCard(pokemon)
    }
  }
  class Pokemon {
    constructor(name, height, weight, abilities, types, moves) {
        this.id = 9001,
        this.name = name,
        this.height = height,
        this.weight = weight,
        this.abilities = abilities,
        this.types = types,
        this.moves = moves
    }
  }

  const newButton = document.createElement('button')
  newButton.textContent = 'New Pokemon'
  const header = document.querySelector('header')
  newButton.style.position = "absolute";
  newButton.style.left = "50%";
  newButton.style.transform = "translateX(-50%)";
  header.appendChild(newButton)
  newButton.addEventListener('click', () => {
  
    const pokeName = prompt('What is the name of your new Pokemon?', 'pokemon name')
    const pokeHeight = prompt("What is the Pokemon's height?", 20)
    const pokeWeight = prompt("What is the Pokemon's weight?", 1000)
    const pokeAbilities= prompt("What are your Pokemon's abilities? (use a comman-separated list)")
    const pokeTypes = prompt("What are your Pokemon's types? (up to 2 types separated by a comma)")
    const pokeMoves = prompt("What are your Pokemon's moves? (add at least 3 moves)")
  
    const newPokemon = new Pokemon(
      pokeName,
      pokeHeight,
      pokeWeight,
      makeAbilitiesArray(pokeAbilities),
      makeTypesArray(pokeTypes),
      makeMovesArray(pokeMoves)
    )
    console.log(newPokemon)
    populatePokeCard(newPokemon)
  })
  function makeAbilitiesArray(commaString) {
    return commaString.split(',').map((abilityName) => {
      return {
        ability: { name: abilityName}
      }
    })
  }
  function makeMovesArray(spacedString) {
    return spacedString.split(',').map((movesName)=> {
           return { move: { name: movesName}}
     })
   }
  
  function makeTypesArray(commaString) {
    return commaString.split(' ').map((typeName) => {
      return {
        type: { name: typeName}
      }
    })
  }
  
  const pokeGrid = document.querySelector('.pokeGrid')
  
  
  function populatePokeCard(pokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
  
    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
  }
  
  function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace front'
    const pokeType1 = pokemon.types[0].type.name
    pokeFront.style.setProperty('background', getPokeTypeColor(pokeType1))
    const pokeImg = document.createElement('img')
    if (pokemon.id > 9000) {
      pokeImg.src = '../images/pokeball.png'
    } else {   
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    }
    const pokeCaption = document.createElement('figcaption')
    pokeCaption.textContent = pokemon.name
  
    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
  }
  
  function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    
    const pokeType1 = pokemon.types[0].type.name
    pokeBack.style.setProperty('background', getPokeTypeColor(pokeType1))
    
    const typeLabel = document.createElement("h4");
    typeLabel.textContent = "Type";
    pokeBack.appendChild(typeLabel);
    const typesList = document.createElement('dl')
    pokemon.types.forEach((pokeType) => {
      const typeItem = document.createElement('dt')
      typeItem.textContent = pokeType.type.name 
      typesList.appendChild(typeItem)
    })
    pokeBack.appendChild(typesList)

    const label = document.createElement('h4')
    label.textContent = 'Abilities'
    pokeBack.appendChild(label)
    const abilityList = document.createElement('ul')
    pokemon.abilities.forEach((abilityItem) => {
      const listItem = document.createElement('li')
      listItem.textContent = abilityItem.ability.name
      abilityList.appendChild(listItem)
    })
    pokeBack.appendChild(abilityList)

    const moveslabel = document.createElement('h4')
    moveslabel.textContent = 'Moves'
    pokeBack.appendChild(moveslabel)
    const movesList = document.createElement('ul')
    pokemon.moves.forEach((movesItem) => {
      const pokeMovesItem = document.createElement('li');
      pokeMovesItem.textContent = movesItem.move.name;
      movesList.appendChild(pokeMovesItem);
    })
    pokeBack.appendChild(movesList)
    return pokeBack
  
  }

  function filterPokemonByType(type) {
    return loadedPokemon.filter((pokemon) => {
      if(pokemon.types[0].type.name === type) return pokemon
      if((pokemon.types[1]?.type.name) && (pokemon.types[1].type.name === type)) {
        return pokemon
      } 
    })
  }
  const selectType = document.querySelector('.type-selector');
  selectType.addEventListener('change', (event) => {
    const filterByType = filterPokemonByType(event.target.value)
    removeChildren(pokeGrid) 
    filterByType.forEach(pokemon => populatePokeCard(pokemon))
  })

  function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
      case 'grass':
        color = '#A7DB8D'
        break
      case 'fire':
        color = '#F5AC78'
        break
      case 'water':
        color = '#9DB7F5'
        break
      case 'bug':
        color = '#C6D16E'
        break
      case 'normal':
        color = '#C6C6A7'
        break
      case 'flying':
        color = '#C6B7F5'
        break
      case 'poison':
        color = '#C183C1'
        break
      case 'electric':
        color = '#FAE078'
        break
      case 'psychic':
        color = '#FA92B2'
        break
      case 'ground':
        color = '#EBD69D'
        break
        case 'rock':
          color = '#D1C17D'
      default:
        color = '#888888'
    }
    return color
  }

  await loadPokemon(0, 250)