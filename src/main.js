
//SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import functions from './data.js';

//SEÇÃO 2: IMPORTAÇÃO DO .JSON
const getPokemonData = await fetch("data/pokemon/pokemon.json");
const pokemonData = await getPokemonData.json();
const pokemon = pokemonData.pokemon

const order = document.getElementById("order")
const option = document.getElementById("option")
const orderButton = document.getElementById("order-button")

//SEÇÃO 3: MANIPULAÇÃO/ALTERAÇÃO dos atributos

// Alteração do sexo dos Pokemons. Fêmea (para female) e Macho (para male):
pokemon[28].name = "Nidoran (Fêmea)"
pokemon[31].name = "Nidoran (Macho)"


// Alteração da coluna "generation" para aparecer somente o número da geração:
for (let i=0; i < pokemon.length; i++) {
  if (pokemon[i].generation.num === "generation i") {
    pokemon[i].generation.num = "I"
  } else {
    pokemon[i].generation.num = "II"
  }
}

// Primeira letra do nome do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].name = pokemon[i].name.charAt(0).toUpperCase() + pokemon[i].name.substr(1)
}

// Primeira letra do nome da geração do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].generation.name = pokemon[i].generation.name.charAt(0).toUpperCase() + pokemon[i].generation.name.substr(1)
}

// Primeira letra do tipo do Pokemon em maiúsculo:
for (let i=0; i < pokemon.length; i++) {
  for (let j=0; j <pokemon[i].type.length; j++)
    pokemon[i].type[j] = pokemon[i].type[j].charAt(0).toUpperCase() + pokemon[i].type[j].substr(1)
}

//Transformando o valor da propriedade egg: 
for (let i=0; i < pokemon.length; i++) {

  if(pokemon[i].egg === "not in eggs"){
    pokemon[i].egg = "Não possui ovos"
  } else if (pokemon[i].egg === "2 km"){
    pokemon[i].egg = "02 km"
  } else if (pokemon[i].egg === "5 km"){
    pokemon[i].egg = "05 km"
  } else if (pokemon[i].egg === "7 km"){
    pokemon[i].egg = "07 km"
  } 
}

// Transformando undefined de tipo em vazio:
for (let i=0; i<pokemon.length; i++) {
  if(pokemon[i].type.length === 1) {
    pokemon[i].type[1] = ""
  }
}

// Criar segunda coluna de objectos para pegar a imagem (alguns ids começam com 0):
for (let i=0; i<pokemon.length; i++) {
pokemon[i].num2 = i + 1
}

// Criar segunda coluna de tipo para transformar os tipos em português:
for (let i=0; i < pokemon.length; i++) {
  pokemon[i].type2 = [];
  switch (pokemon[i].type[0]) {
    case "Bug":
      pokemon[i].type2[0] = "Inseto"
      break
    case "Dark":
      pokemon[i].type2[0] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].type2[0] = "Dragão" 
      break
    case "Electric":
      pokemon[i].type2[0] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].type2[0] = "Fada"  
      break
    case "Fighting":
      pokemon[i].type2[0] = "Lutador"  
      break
    case "Fire":
      pokemon[i].type2[0] = "Fogo"  
      break
    case "Flying":
      pokemon[i].type2[0] = "Voador"  
      break
    case "Ghost":
      pokemon[i].type2[0] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].type2[0] = "Planta"
      break
    case "Ground":
      pokemon[i].type2[0] = "Terrestre"
      break
    case "Ice":
      pokemon[i].type2[0] = "Gelo"
      break
    case "Normal":
      pokemon[i].type2[0] = "Normal"
      break
    case "Poison":
      pokemon[i].type2[0] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].type2[0] = "Psíquico"
      break
    case "Rock":
      pokemon[i].type2[0] = "Pedra"
      break
    case "Steel":
      pokemon[i].type2[0] = "Aço"
      break
    case "Water":
      pokemon[i].type2[0] = "Água"
      break
    default:
      pokemon[i].type2[0] = ""
      break
  }
  switch (pokemon[i].type[1]) {
    case "Bug":
      pokemon[i].type2[1] = "Inseto"
      break
    case "Dark":
      pokemon[i].type2[1] = "Sombrio" 
      break
    case "Dragon":
      pokemon[i].type2[1] = "Dragão" 
      break
    case "Electric":
      pokemon[i].type2[1] = "Elétrico"
      break  
    case "Fairy":
      pokemon[i].type2[1] = "Fada"  
      break
    case "Fighting":
      pokemon[i].type2[1] = "Lutador"  
      break
    case "Fire":
      pokemon[i].type2[1] = "Fogo"  
      break
    case "Flying":
      pokemon[i].type2[1] = "Voador"  
      break
    case "Ghost":
      pokemon[i].type2[1] = "Fantasma" 
      break 
    case "Grass":
      pokemon[i].type2[1] = "Planta"
      break
    case "Ground":
      pokemon[i].type2[1] = "Terrestre"
      break
    case "Ice":
      pokemon[i].type2[1] = "Gelo"
      break
    case "Normal":
      pokemon[i].type2[1] = "Normal"
      break
    case "Poison":
      pokemon[i].type2[1] = "Venenoso"
      break
    case "Psychic":
      pokemon[i].type2[1] = "Psíquico"
      break
    case "Rock":
      pokemon[i].type2[1] = "Pedra"
      break
    case "Steel":
      pokemon[i].type2[1] = "Aço"
      break
    case "Water":
      pokemon[i].type2[1] = "Água"
      break
    default:
      pokemon[i].type2[1] = ""
      break
  }
}
console.log(pokemon)
 

// Transformar variável "spawn-chance" em número:
/*for (let i=0; i<pokemon.length; i++) {
  let po = ""
  po = pokemon[i]["stats"]["base-attack"] = parseInt(pokemon[i]["stats"]["base-attack"], 10)
  console.log(po)
}*/

//Criação de listas de pokemons
function listPokemons (dataset) {
    const listOfPokemons = dataset.reduce((accumulator, dataset) => {
      accumulator += `
      <div class="pokemon-card"> 
        <li class="lista-de-pokemons"> 
          <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="id-do-pokemon">#${dataset["num"]} </p> 
          <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
        </li>
      </div> `
      return accumulator
    },[])
    
    const printList= document.getElementById("lista-impressa")
    printList .innerHTML = listOfPokemons
    
  }





// SEÇÃO: ORDENAÇÃO POR RARIDADE, NOME e DISTÂNCIA DOS OVOS
  //Chamando função de ordenar
  orderButton.addEventListener("click", (event) => {
    event.preventDefault()

    const sortedData =  functions.sortData (pokemon, order.value, option.value)
    listPokemons(sortedData)
  })


//SEÇÃO : FILTRO PELO TECLADO (KEYUP) 
const filterInput = document.getElementById("pokemon-search");
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  const filterValue = document.getElementById("pokemon-search").value.toUpperCase();
  const pokemonPrintedList = document.getElementById("lista-impressa");
  const pokemonList = pokemonPrintedList.getElementsByClassName("lista-de-pokemons");
  const pokemonCard = document.getElementsByClassName("pokemon-card");

  for (let i=0; i<pokemonList.length; i++){
    let filteredPokemonCard = pokemonList[i].getElementsByClassName("nome-do-pokemon")[0];
    if (filteredPokemonCard.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      pokemonList[i].style.display="";
      pokemonCard[i].style.display="";
    } else {
      pokemonList[i].style.display="none";
      pokemonCard[i].style.display="none";
    }
  }
}



// HIDE ADVANCED SEARCH
function showAndHideFilters (section) {
  const divSection = document.getElementById(section) 
  if (divSection.style.display === "none") {
    divSection.style.display="block"
  } else {
    divSection.style.display="none"
  }
}
function hideOtherFilterDivs (showingDiv, hidingDiv) {
  const divSectionShowed = document.getElementById(showingDiv) 
  const divSectionHidden = document.getElementById(hidingDiv) 
  if (divSectionShowed.style.display !== "none") {
    divSectionHidden.style.display="none"
  } else {
    divSectionHidden.style.display="none"
  }
}

//Main Filter
document.getElementById("filters-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("filters-section")
})

//Generation Filter
document.getElementById("filter-by-generation-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-generation")
  hideOtherFilterDivs("buttons-generation", "buttons-type")
})

//Type Filter
document.getElementById("filter-by-type-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-type")
  hideOtherFilterDivs("buttons-type", "buttons-generation")
})

// SEÇÃO: FILTRAGEM DA GERAÇÃO DO POKEMON (NÚMERO E NOME)

//1. Criação de listas de pokemons:
function listPokemonsByGeneration (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <div class="pokemon-card"> 
    <li class="lista-de-pokemons"> 
      <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
      <p class="id-do-pokemon">#${dataset["num"]} </p> 
      <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
      <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
      <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
    </li>
  </div> `
    return accumulator
  },[])
  
  const printList= document.getElementById("lista-impressa")
  printList .innerHTML = listOfPokemons
  
}

//2. Impressão da lista de pokemon completa:
listPokemons(pokemon)

//3. Manipulação do DOM
let functionGenerationResult = "";
let generationButton = "";

//3.a) Criação da função geral dos botões (primeira e segunda geração):
function generationButtonsFunction (generationInput) {
document.getElementById(generationInput).addEventListener("click", function (event) {
    event.preventDefault()
    generationButton = event.target.value;
    functionGenerationResult = functions.filterData(pokemon, ["generation"],["num"], generationButton);
    listPokemonsByGeneration(functionGenerationResult)
    filterNames()
  })
}
  
//3.b) Criação de um array com o nome dos botões:
const pokemonGenerations = ["first-generation-button","second-generation-button"] 

//3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
pokemonGenerations.map(generationButtonsFunction)

//4. Função para printar TODAS as gerações.
document.getElementById("all-generations-button").addEventListener("click", function (event) {
    event.preventDefault()
    listPokemonsByGeneration(pokemon)
    filterNames()
  })

  
// SEÇÃO: FILTRAGEM DO TIPO:
//1. Criação de listas de pokemons:
function listPokemonsByType (dataset) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <div class="pokemon-card"> 
        <li class="lista-de-pokemons"> 
          <img class="imagem-do-pokemon" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.num2}.png">
          <p class="id-do-pokemon">#${dataset["num"]} </p> 
          <p class="nome-do-pokemon"> ${dataset["name"]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][0]}> ${dataset["type2"][0]} </p> 
          <p class="tipo-do-pokemon" value= ${dataset["type"][1]}> ${dataset["type2"][1]} </p> 
        </li>
      </div> `
    return accumulator
  },[])
  
  const printList= document.getElementById("lista-impressa")
  printList .innerHTML = listOfPokemons
  
}

//2. Impressão da lista de pokemons completa:
listPokemonsByType(pokemon)

//3. Manipulação do DOM
let functionTypeResult1 = "";
let functionTypeResult2 = "";
let functionTypeResultMerged = "";
let typeButton = "";

//3.a) Criação da função geral dos botões:
function typeButtonsFunction (typeInput) {
  document.getElementById(typeInput).addEventListener("click", function (event) {
    event.preventDefault()
    typeButton = event.target.value;
    functionTypeResult1 = functions.filterData(pokemon, ["type"],[0], typeButton);
    functionTypeResult2 = functions.filterData(pokemon, ["type"],[1], typeButton);
    functionTypeResultMerged = Object.assign(functionTypeResult1, functionTypeResult2)
    listPokemonsByType(functionTypeResultMerged)
    filterNames()
  })
}

//3.b) Criação de um array com o nome dos botões:
let pokemonTypes = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost",
"grass", "ground","ice", "normal", "poison", "psychic", "rock", "water", "steel"]

//3.b.I) Adição do sufixo "-type-button"
for (let i=0; i<pokemonTypes.length; i++) {
  pokemonTypes[i] = pokemonTypes[i] + "-type-button"
}

//3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
pokemonTypes.map(typeButtonsFunction)

// let average = pokemon.reduce((a,c) =>  a+c["stats"]["base-attack"]/251,0)
// console.log(average)
// console.log(pokemon)

//console.log(functions.computeStats(pokemon, "stats", "base-attack"))

console.log(pokemon)
