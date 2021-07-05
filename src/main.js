///SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import { filterData } from './data.js'
import { sortData } from './data.js';
import { computeStats } from './data.js';

//SEÇÃO 2: IMPORTAÇÃO DO .JSON
const getPokemonData = await fetch("data/pokemon/pokemon.json");
const pokemonData = await getPokemonData.json();
const pokemon = pokemonData.pokemon


//SEÇÃO 3: MANIPULAÇÃO/ALTERAÇÃO dos atributos

//1) Alteração do sexo dos Pokemons. Fêmea (para female) e Macho (para male):
pokemon[28].name = "Nidoran (Fêmea)"
pokemon[31].name = "Nidoran (Macho)"

//2) Transformação da primeira letra do valor em maiúsculo:
function firstLetterToUpperCase (dataset, firstAttribute, secondAttribute) {
    for (const individual of dataset) {
      if (!Array.isArray(individual[firstAttribute])) {
        if (secondAttribute !== "") {
          individual[firstAttribute][secondAttribute] = individual[firstAttribute][secondAttribute].charAt(0).toUpperCase() + individual[firstAttribute][secondAttribute].substr(1)
        } else {
          individual[firstAttribute] = individual[firstAttribute].charAt(0).toUpperCase() + individual[firstAttribute].substr(1)
        }
      } else {
        for (let j=0; j < individual[firstAttribute].length; j++) {
          individual[firstAttribute][j] = individual[firstAttribute][j].charAt(0).toUpperCase() + individual[firstAttribute][j].substr(1)
        }
      }
    }
}

// Primeira letra do nome do Pokemon em maiúsculo:
firstLetterToUpperCase(pokemon, ["name"], "")

//Primeira letra da geração em maiúsculo:
firstLetterToUpperCase(pokemon, ["generation"], ["name"])

//Primeira letra do nível de raridade em maiúsculo:
firstLetterToUpperCase(pokemon, ["pokemon-rarity"], "")

//Primeira letra do tipo do pokemon:
firstLetterToUpperCase(pokemon, ["type"], "")

//Primeira letra das fraquezas do pokemon:
firstLetterToUpperCase(pokemon, ["weaknesses"], "")

//Primeira letra das resistências do pokemon:
firstLetterToUpperCase(pokemon, ["resistant"], "")

//3) Transformação de valores esperados para novos valores:
function valueTransformation (dataset, firstAttribute, secondAttribute, expectedValue, newValue) {
  for (const individual of dataset) {
    if (secondAttribute !== "") {
      if (individual[firstAttribute][secondAttribute] === expectedValue) {
          individual[firstAttribute][secondAttribute]  = newValue}
    } else {
      if (individual[firstAttribute] === expectedValue) {
        individual[firstAttribute] = newValue}
    }
  }
}

// Gerações:
valueTransformation (pokemon, ["generation"], ["num"], "generation i", "I")
valueTransformation (pokemon, ["generation"], ["num"], "generation ii", "II")

// Distância dos Ovos:
valueTransformation (pokemon, ["egg"], "", "not in eggs", "Não possui ovos")
valueTransformation (pokemon, ["egg"], "", "2 km", "02 Km")
valueTransformation (pokemon, ["egg"], "", "5 km", "05 Km")
valueTransformation (pokemon, ["egg"], "", "7 km", "07 Km")

// Probabilidade de aparição:
valueTransformation (pokemon, ["spawn-chance"], "", null, "0")

//Raridade do pokemon:
valueTransformation (pokemon, ["pokemon-rarity"], "", "Legendary", "Lendário")
valueTransformation (pokemon, ["pokemon-rarity"], "", "Mythic", "Mítico")

//4) Identificando quantidade máximas de tipo de um pokemon e substituindo-as (length dos arrays):
function adjustArraySize (dataset, attribute) {
  //Identificando valor máximo do tamanho da array:
  const maxLengthOfAnArray = dataset.reduce((acc, item ) => Math.max(acc, item[attribute].length), 0)
  for (const individual of dataset) {
    for (let j=0; j<individual[attribute].length; j++){
      //O tamanho da array antigo se torna o start do fill e irá preencher até o novo tamanho da array:
      const oldLength = individual[attribute].length
      if (individual[attribute].length < maxLengthOfAnArray) {
          individual[attribute].length = maxLengthOfAnArray
          individual[attribute].fill("", oldLength, maxLengthOfAnArray)
      }
    }
  }
}
//Tipos
adjustArraySize(pokemon, ["type"])
adjustArraySize(pokemon, ["resistant"])
adjustArraySize(pokemon, ["weaknesses"])

//5)  Criar segunda coluna de objetos para pegar a imagem do outro site  (alguns ids começam com 0):
//Soma 1 ao index da array.
for (let i=0; i<pokemon.length; i++) {
pokemon[i].idWithoutLeftZeros = i + 1
}

//6) Criação dos tipos, resistência e fraqueza em português e abreviação:
const namesCorrespondence = [{englishName: "Bug", englishNameLowerCase: "bug", portugueseName: "Inseto", abreviation:"IN"},
{englishName: "Dark", englishNameLowerCase: "dark", portugueseName: "Sombrio", abreviation:"SO"},
{englishName: "Dragon", englishNameLowerCase: "dragon",portugueseName: "Dragão", abreviation:"DG"},
{englishName: "Electric", englishNameLowerCase: "electric",portugueseName: "Elétrico", abreviation:"EL"},
{englishName: "Fairy", englishNameLowerCase: "fairy",portugueseName: "Fada", abreviation:"FA"},
{englishName: "Fighting", englishNameLowerCase: "fighting",portugueseName: "Lutador", abreviation:"LU"},
{englishName: "Flying", englishNameLowerCase: "flying",portugueseName: "Voador", abreviation:"VO"},
{englishName: "Fire",englishNameLowerCase: "fire", portugueseName: "Fogo", abreviation:"FO"},
{englishName: "Ghost", englishNameLowerCase: "ghost",portugueseName: "Fantasma", abreviation:"FT"},
{englishName: "Grass", englishNameLowerCase: "grass",portugueseName: "Planta", abreviation:"PL"},
{englishName: "Ground", englishNameLowerCase: "ground",portugueseName: "Terrestre", abreviation:"TE"},
{englishName: "Ice", englishNameLowerCase: "ice",portugueseName: "Gelo", abreviation:"GE"},
{englishName: "Normal", englishNameLowerCase: "normal",portugueseName: "Normal", abreviation:"NO"},
{englishName: "Poison", englishNameLowerCase: "poison",portugueseName: "Venenoso", abreviation:"VE"},
{englishName: "Psychic", englishNameLowerCase: "psychic",portugueseName: "Psíquico", abreviation:"PS"},
{englishName: "Rock", englishNameLowerCase: "rock",portugueseName: "Pedra", abreviation:"PE"},
{englishName: "Steel", englishNameLowerCase: "steel",portugueseName: "Aço", abreviation:"AÇ"},
{englishName: "Water", englishNameLowerCase: "water",portugueseName: "Água", abreviation:"ÁG"}]

function changeNames (dataset, originalAttribute, attributeInPortuguese, attributePTAbreviation) {
  for (const individual of dataset) {
    individual[attributeInPortuguese] = []
    individual[attributePTAbreviation] = []
    for (let j=0; j<individual[originalAttribute].length; j++) {
      for (let k=0; k < namesCorrespondence.length; k++)
      if(individual[originalAttribute][j] === namesCorrespondence[k].englishName) {
        individual[attributeInPortuguese][j] = namesCorrespondence[k].portugueseName
        individual[attributePTAbreviation][j] = namesCorrespondence[k].abreviation
      } else if (individual[originalAttribute][j] === "") {
        individual[attributeInPortuguese][j] = ""
        individual[attributePTAbreviation][j] = ""
      }
    }
  }
}
//Tipo, resistência e abreviações:
changeNames (pokemon, ["type"], ["typeInPortugues"], ["typePTabreviation"])
changeNames (pokemon, ["resistant"], ["resistantInPortugues"], ["resistantPTabreviation"])
changeNames (pokemon, ["weaknesses"], ["weaknessesInPortugues"], ["weaknessesPTabreviation"])

//7) Transformação de variáveis do tipo string em numéricas:
function stringToNumber (dataset, firstAttribute, secondAttribute) {
  for (const individual of dataset) {
    individual[firstAttribute][secondAttribute] = parseInt(individual[firstAttribute][secondAttribute])
  }
}
stringToNumber(pokemon, ["stats"], ["base-attack"])
stringToNumber(pokemon, ["stats"], ["base-defense"])
stringToNumber(pokemon, ["stats"], ["base-stamina"])
stringToNumber(pokemon, ["stats"], ["max-cp"])
stringToNumber(pokemon, ["stats"], ["max-hp"])

//Cálculo agregado (comparação com as stats médias:)
//8) Definição das médias:
const baseAttackAverage = computeStats(pokemon, ["stats"], ["base-attack"])
const baseDefenseAverage = computeStats(pokemon, ["stats"], ["base-defense"])
const baseStaminaAverage = computeStats(pokemon, ["stats"], ["base-stamina"])
const maxCpAverage= computeStats(pokemon, ["stats"], ["max-cp"])
const maxHpAverage= computeStats(pokemon, ["stats"], ["max-hp"])

//Comparação dos valores com as médias:
for (const individual of pokemon){
  individual.statusAttackGreater = "";
  individual.statusAttackLower = "";
  individual.statusDefenseGreater = "";
  individual.statusDefenseLower = "";
  individual.statusStaminaGreater = "";
  individual.statusStaminaLower = "";
  individual.statusMaxCpGreater = "";
  individual.statusMaxCpLower = "";
  individual.statusMaxHpGreater = "";
  individual.statusMaxHpLower = "";
}

function compareWithAverage (dataset, firstAttribute, secondAttribute, averageToCompare, attributeToBeChangedGreater, attributeToBeChangedLower) {
  for (const individual of dataset) { 
    if (individual[firstAttribute][secondAttribute] >= averageToCompare) {
      individual[attributeToBeChangedGreater] = "↑"
    } else {
      individual[attributeToBeChangedLower] = "↓"
    }
  }
}
compareWithAverage(pokemon, ["stats"], ["base-attack"], baseAttackAverage, ["statusAttackGreater"], ["statusAttackLower"])
compareWithAverage(pokemon, ["stats"], ["base-defense"], baseDefenseAverage, ["statusDefenseGreater"], ["statusDefenseLower"])
compareWithAverage(pokemon, ["stats"], ["base-stamina"], baseStaminaAverage, ["statusStaminaGreater"], ["statusStaminaLower"])
compareWithAverage(pokemon, ["stats"], ["max-cp"], maxCpAverage, ["statusMaxCpGreater"], ["statusMaxCpLower"])
compareWithAverage(pokemon, ["stats"], ["max-hp"], maxHpAverage, ["statusMaxHpGreater"], ["statusMaxHpLower"])

//9) Criação dos botões de tipo, resistência e fraqueza no HTML:
function createButtons (dataset, attribute) {
  const listButttons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <button class="filter-button-${attribute} is-button-or-input" id="${dataset["englishNameLowerCase"]}-${attribute}-button" value=${dataset["englishName"]}> ${dataset["portugueseName"]}</button>
        `
   return(accumulator)
  },[])
  

    const printList= document.getElementById("buttons-" + attribute)
    printList.innerHTML = listButttons
}

createButtons(namesCorrespondence, "type")
createButtons(namesCorrespondence, "resistant")
createButtons(namesCorrespondence, "weaknesses")

//10) Criação das listas:
function listPokemons (dataset, additionalFunction) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    const printAdditionalHere = additionalFunction(dataset)
    accumulator += `
    <div class="card">

      <div class="front-card"> 
        <li class="front-list"> 
          <img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.idWithoutLeftZeros}.png">
          <p class="front-pokemon-id">#${dataset["num"]} </p> 
          <p class="front-pokemon-name"> ${dataset["name"]} </p> 
          <p class="front-pokemon-type" value= ${dataset["type"][0]}> ${dataset["typeInPortugues"][0]} </p> 
          <p class="front-pokemon-type" value= ${dataset["type"][1]}> ${dataset["typeInPortugues"][1]} </p> 
         ` +
         printAdditionalHere
         +
         `
        </li>
      </div> 
     

      <div class="back-card"> 
        <li class="back-list">  

          <div class="back-pokemon-size">
            <h1 class="back-card-titles"> Tamanho do Pokemon </h1>
            <img class="back-size-figures" alt="Peso" src="images/weigth.svg">
            <span class="back-tooltiptext">Peso </span>
            <span>${dataset["size"]["weight"]}</span> 
            <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
            <span class="back-tooltiptext">Altura</span>
            <span>${dataset["size"]["height"]}</span> 
          </div>

          <div class="back-pokemon-stats">
            <h1 class="back-card-titles"> Estatísticas</h1>

            <img class="back-stats-figures" alt="Ataque" src="images/sword.png">
            <span class="back-tooltiptext">Ataque</span>
            <span>${dataset["stats"]["base-attack"]}</span>
            <span class="back-greater-than-average-arrow" > ${dataset["statusAttackGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusAttackLower"]} </span>
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
           
            <img class="back-stats-figures" alt="Escudo" src="images/shield.png">
            <span class="back-tooltiptext">Defesa</span>
            <span>${dataset["stats"]["base-defense"]}</span> 
            <span class="back-greater-than-average-arrow" > ${dataset["statusDefenseGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusDefenseLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
        
            <img class="back-stats-figures" alt="Energia" src="images/stamina.png">
            <span class="back-tooltiptext">Stamina</span>
            <span>${dataset["stats"]["base-stamina"]}</span> 
            <span class="back-greater-than-average-arrow" > ${dataset["statusStaminaGreater"]} </span>
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span> 
            <span class="back-lower-than-average-arrow"> ${dataset["statusStaminaLower"]}</span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
            <br>

            <img  class="back-stats-figures" alt="Combate" src="images/vs.jpg">
            <span class="back-tooltiptext">Poder de Combate</span>
            <span>${dataset["stats"]["max-cp"]}</span> 
            <span class="back-greater-than-average-arrow"> ${dataset["statusMaxCpGreater"]}</span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow"> ${dataset["statusMaxCpLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          
            <img class="back-stats-figures" alt="Vida" src="images/heart.jpg">
            <span class="back-tooltiptext">Pontos de Vida</span>
            <span>${dataset["stats"]["max-hp"]}</span> 
            <span class="back-greater-than-average-arrow"> ${dataset["statusMaxHpGreater"]} </span> 
            <span class="back-tooltiptext">Acima da Média (Todos Pokemons)</span>
            <span class="back-lower-than-average-arrow" > ${dataset["statusMaxHpLower"]} </span> 
            <span class="back-tooltiptext">Abaixo da Média (Todos Pokemons)</span> 
          </div>

          <div class="back-resistant-to">
            <p class="back-card-titles"> Resistente à </p>
            <p class="pokemon-resistant" value= R${dataset["resistant"][0]}>${dataset["resistantPTabreviation"][0]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][0]}</span>
            <p class="pokemon-resistant" value= R${dataset["resistant"][1]}>${dataset["resistantPTabreviation"][1]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][1]}</span>
            <p class="pokemon-resistant" value= R${dataset["resistant"][2]}>${dataset["resistantPTabreviation"][2]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][2]}</span>
            <p class="pokemon-resistant" value= R${dataset["resistant"][3]}>${dataset["resistantPTabreviation"][3]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][3]}</span>
            <p class="pokemon-resistant" value= R${dataset["resistant"][4]}>${dataset["resistantPTabreviation"][4]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][4]}</span>
            <p class="pokemon-resistant" value= R${dataset["resistant"][5]}>${dataset["resistantPTabreviation"][5]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][5]}</span>
            <p class="pokemon-resistant" value= R${dataset["resistant"][6]}>${dataset["resistantPTabreviation"][6]} </p> 
            <span class="tooltiptext">${dataset["resistantInPortugues"][6]}</span>
          </div>
          <div class="back-weak-to">
            <p class="back-card-titles"> Fraco contra</p>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["weaknessesPTabreviation"][0]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][0]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["weaknessesPTabreviation"][1]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][1]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["weaknessesPTabreviation"][2]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][2]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["weaknessesPTabreviation"][3]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][3]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["weaknessesPTabreviation"][4]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][4]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["weaknessesPTabreviation"][5]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][5]}</span>
            <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["weaknessesPTabreviation"][6]} </p> 
            <span class="tooltiptext">${dataset["weaknessesInPortugues"][6]}</span>
          
            </div>
            <p class="back-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>
          </li>
      </div> 
    </div>  `
    
    return accumulator
  },[])
  
  const printList= document.getElementById("lista-impressa")
  printList.innerHTML = listOfPokemons
}

//Criação dos atributos adicionais na visualização dos cards:
function addPokemonRarity(dataset){
  const attributeToBeAdded = `<p class="front-pokemon-rarity" value= ${dataset["pokemon-rarity"]}>Nível de Raridade: ${dataset["pokemon-rarity"]}</p>`
  return attributeToBeAdded
}

function addEggsDistance(dataset){
  const attributeToBeAdded = `<p class="front-eggs-distance"  value= ${dataset["egg"]}> Distância dos Ovos: ${dataset["egg"]}</p>`
  return attributeToBeAdded
}

function addSpawnChance(dataset){
  const attributeToBeAdded = `<p class="front-spawn-chance" value= ${dataset["spawn-chance"]}> Probabilidade de Aparição: ${dataset["spawn-chance"]}%</p>`
  return attributeToBeAdded
}

function addGeneration(dataset){
  const attributeToBeAdded = `<p class="front-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>`
  return attributeToBeAdded
}

function addResistant(dataset){
  const attributeToBeAdded = ` <p id="resistant-to"> Resistente à </p>
  <div class="front-pokemon-resistant">
    <p class="pokemon-resistant" value= R${dataset["resistant"][0]}>${dataset["resistantPTabreviation"][0]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][0]}</span>
    <p class="pokemon-resistant" value= R${dataset["resistant"][1]}>${dataset["resistantPTabreviation"][1]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][1]}</span>
    <p class="pokemon-resistant" value= R${dataset["resistant"][2]}>${dataset["resistantPTabreviation"][2]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][2]}</span>
    <p class="pokemon-resistant" value= R${dataset["resistant"][3]}>${dataset["resistantPTabreviation"][3]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][3]}</span>
    <p class="pokemon-resistant" value= R${dataset["resistant"][4]}>${dataset["resistantPTabreviation"][4]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][4]}</span>
    <p class="pokemon-resistant" value= R${dataset["resistant"][5]}>${dataset["resistantPTabreviation"][5]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][5]}</span>
    <p class="pokemon-resistant" value= R${dataset["resistant"][6]}>${dataset["resistantPTabreviation"][6]} </p> 
    <span class="tooltiptext">${dataset["resistantInPortugues"][6]}</span>
  </div>`
  return attributeToBeAdded
}

function addWeaknesses(dataset){
  const attributeToBeAdded = `<div class="front-pokemon-weaknesses">
  <p id="weak-to"> Fraco contra</p>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][0]}>${dataset["weaknessesPTabreviation"][0]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][0]}</span>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][1]}>${dataset["weaknessesPTabreviation"][1]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][1]}</span>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][2]}>${dataset["weaknessesPTabreviation"][2]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][2]}</span>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][3]}>${dataset["weaknessesPTabreviation"][3]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][3]}</span>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][4]}>${dataset["weaknessesPTabreviation"][4]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][4]}</span>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][5]}>${dataset["weaknessesPTabreviation"][5]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][5]}</span>
  <p class="pokemon-weaknesses" value= R${dataset["weaknesses"][6]}>${dataset["weaknessesPTabreviation"][6]} </p> 
  <span class="tooltiptext">${dataset["weaknessesInPortugues"][6]}</span>
</div>`
  return attributeToBeAdded
}

function addNothing(){
  const attributeToBeAdded = ``
  return attributeToBeAdded
}

//Print lista geral na tela:
listPokemons(pokemon, addNothing)

//11) Fltro por key-up:
const filterInput = document.getElementById("pokemon-search");
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  const filterValue = document.getElementById("pokemon-search").value.toUpperCase();
  const pokemonPrintedList = document.getElementById("lista-impressa");
  const pokemonList = pokemonPrintedList.getElementsByClassName("front-list");
  const pokemonCard = document.getElementsByClassName("card");

  for (let i=0; i<pokemonList.length; i++){
    let filteredPokemonCard = pokemonList[i].getElementsByClassName("front-pokemon-name")[0];
    if (filteredPokemonCard.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      pokemonList[i].style.display="";
      pokemonCard[i].style.display="";
    } else {
      pokemonList[i].style.display="none";
      pokemonCard[i].style.display="none";
    }
  }
}

//12) Ordenação das listas - SortData:
const order = document.getElementById("order")
const option = document.getElementById("option")
const orderButton = document.getElementById("order-button")

orderButton.addEventListener("click", (event) => {
  event.preventDefault();

  const sortedData =  sortData (pokemon, order.value, option.value);

  switch (order.value) {
    case "egg":
      listPokemons(sortedData, addEggsDistance);
      break;
    case "pokemon-rarity":
      listPokemons(sortedData,addPokemonRarity );
      break;
    case "spawn-chance":
      listPokemons(sortedData, addSpawnChance);
      break;
    default:
      listPokemons(sortedData, addNothing);
      break
    }
})

// 13) Main Filtros por botão:
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
  hideOtherFilterDivs("buttons-generation", "buttons-resistant")
  hideOtherFilterDivs("buttons-generation", "buttons-weaknesses")
})

//Type Filter
document.getElementById("filter-by-type-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-type")
  hideOtherFilterDivs("buttons-type", "buttons-generation")
  hideOtherFilterDivs("buttons-type", "buttons-resistant")
  hideOtherFilterDivs("buttons-type", "buttons-weaknesses")
})

//Resistence Filter
document.getElementById("filter-by-resistant-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-resistant")
  hideOtherFilterDivs("buttons-resistant", "buttons-generation")
  hideOtherFilterDivs("buttons-resistant", "buttons-type")
  hideOtherFilterDivs("buttons-resistant", "buttons-weaknesses")
})

//Weaknesses Filter
document.getElementById("filter-by-weaknesses-button").addEventListener("click", function (event) {
  event.preventDefault()
  showAndHideFilters("buttons-weaknesses")
  hideOtherFilterDivs("buttons-weaknesses", "buttons-generation")
  hideOtherFilterDivs("buttons-weaknesses", "buttons-type")
  hideOtherFilterDivs("buttons-weaknesses", "buttons-resistant")
})


//14) SubFiltros por botão:
//14.a) Geraçao
//14.a.I) Printar primeira OU Segunda geração:
let data = "";
let generationButton = "";

//3.a) Criação da função geral dos botões (primeira e segunda geração):
function generationButtonsFunction (generationInput) {
document.getElementById(generationInput).addEventListener("click", function (event) {
    event.preventDefault()
    generationButton = event.target.value;
    data = filterData(pokemon, ["generation"],["num"], generationButton);
    listPokemons(data, addGeneration);
    filterNames();
  })
}
  
//3.b) Criação de um array com o nome dos botões:
const pokemonGenerations = ["first-generation-button","second-generation-button"] 

//3.c) Aplicação da função geral do botão para cada elemento da array(cada nome de botão).
//A função generationButtonsFunction irá ser aplicada para cada geração do
pokemonGenerations.map(generationButtonsFunction)

//14.a.II) Printar primeira E Segunda gerações;
document.getElementById("all-generations-button").addEventListener("click", function (event) {
    event.preventDefault()
    listPokemons(pokemon, addGeneration);
    filterNames()
})

//14.b) Tipo
let typeButton = "";

//14.b.I) Criação da função geral dos botões:
function typeButtonsFunction (typeInput) {
  document.getElementById(typeInput).addEventListener("click", function (event) {
  event.preventDefault()
  typeButton = event.target.value;
  data = filterData(pokemon, ["type"],"", typeButton)
  listPokemons(data, addNothing)
  filterNames()
  })
}

//14.b.II) Criação de um array com o nome dos botões + Adição do sufixo "-attribute-button":
function addingButtonSuffix (attribute) {
let newButton = [];
  for (let i=0; i<namesCorrespondence.length; i++) {
    namesCorrespondence[i].forButtton = namesCorrespondence[i].englishNameLowerCase + "-" + attribute + "-button"
    }
  newButton = namesCorrespondence.map((ObjectFrom) => {
    return ObjectFrom.forButtton});
  return (newButton)
}

//14.b.III) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
addingButtonSuffix("type").map(typeButtonsFunction)

//14.c) Resistência
let resistantButton = "";

//14.c.I) Criação da função geral dos botões:
function resistantButtonsFunction (resistantInput) {
  document.getElementById(resistantInput).addEventListener("click", function (event) {
  event.preventDefault()
  resistantButton = event.target.value;
  data = filterData(pokemon, ["resistant"], "",resistantButton)
  listPokemons(data, addResistant)
  filterNames()
  })
}

//14.c.III) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
addingButtonSuffix("resistant").map(resistantButtonsFunction)

//14.d) Resistência
let WeaknessesButton = "";
  
//14.c.I) Criação da função geral dos botões:
function WeaknessesButtonsFunction (WeaknessesInput) {
  document.getElementById(WeaknessesInput).addEventListener("click", function (event) {
  event.preventDefault()
  WeaknessesButton = event.target.value;
  data = filterData(pokemon, ["weaknesses"],"", WeaknessesButton)
  listPokemons(data, addWeaknesses)
  filterNames()
  })
 }

//14.d.IV) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
addingButtonSuffix("weaknesses").map(WeaknessesButtonsFunction)