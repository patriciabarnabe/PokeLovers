///SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import { filterData } from './data.js'
import { advancedFilterData } from './data.js'
import { sortData } from './data.js';
import { computeAverage } from './data.js';

//SEÇÃO 2: IMPORTAÇÃO DO .JSON
let pokemon = [];
async function getData () {
const getPokemonData = await fetch("data/pokemon/pokemon.json");
const pokemonData = await getPokemonData.json();
pokemon = pokemonData.pokemon;

const order = document.getElementById("order");
const option = document.getElementById("option");
const orderButton = document.getElementById("order-button");

//SEÇÃO 3: MANIPULAÇÃO/ALTERAÇÃO dos atributos

//1) Alteração do sexo dos Pokemons. Fêmea (para female) e Macho (para male):
pokemon[28].name = "Nidoran (Fêmea)";
pokemon[31].name = "Nidoran (Macho)";

//2) Transformação da primeira letra do valor em maiúsculo:
function firstLetterToUpperCase (dataset, firstAttribute, secondAttribute) {
    for (const individual of dataset) {
      if (!Array.isArray(individual[firstAttribute])) {
        if (secondAttribute !== "") {
          individual[firstAttribute][secondAttribute] = individual[firstAttribute][secondAttribute].charAt(0).toUpperCase() + individual[firstAttribute][secondAttribute].substr(1);
        } else {
          individual[firstAttribute] = individual[firstAttribute].charAt(0).toUpperCase() + individual[firstAttribute].substr(1);
        }
      } else {
        for (let j=0; j < individual[firstAttribute].length; j++) {
          individual[firstAttribute][j] = individual[firstAttribute][j].charAt(0).toUpperCase() + individual[firstAttribute][j].substr(1);
        }
      }
    }
}
firstLetterToUpperCase(pokemon, ["name"], "");
firstLetterToUpperCase(pokemon, ["generation"], ["name"]);
firstLetterToUpperCase(pokemon, ["pokemon-rarity"], "");
firstLetterToUpperCase(pokemon, ["type"], "");
firstLetterToUpperCase(pokemon, ["weaknesses"], "");
firstLetterToUpperCase(pokemon, ["resistant"], "");

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
valueTransformation (pokemon, ["generation"], ["num"], "generation i", "I");
valueTransformation (pokemon, ["generation"], ["num"], "generation ii", "II");
// Distância dos Ovos:
valueTransformation (pokemon, ["egg"], "", "not in eggs", "Não possui ovos");
valueTransformation (pokemon, ["egg"], "", "2 km", "02 Km");
valueTransformation (pokemon, ["egg"], "", "5 km", "05 Km");
valueTransformation (pokemon, ["egg"], "", "7 km", "07 Km");
// Probabilidade de aparição:
valueTransformation (pokemon, ["spawn-chance"], "", null, "0");
//Raridade do pokemon:
valueTransformation (pokemon, ["pokemon-rarity"], "", "Legendary", "Lendário");
valueTransformation (pokemon, ["pokemon-rarity"], "", "Mythic", "Mítico");
valueTransformation (pokemon, ["pokemon-rarity"], "", "Normal", "Normal");
// Size, irá como numérico:
for (const individual of pokemon) {
  individual["size"]["height"] = individual["size"]["height"].replace(" m", "")
  individual["size"]["height"] = parseFloat(individual["size"]["height"])

  individual["size"]["weight"] = individual["size"]["weight"].replace(" kg", "")
  individual["size"]["weight"] = parseFloat(individual["size"]["weight"]) 
}
//Encounter base-flee-rate e capture em numérico ou não capturável:
for (const individual of pokemon) {
  if (individual.encounter["base-flee-rate"] === "not in capture") {
      individual.encounter["base-flee-rate"] = 999999999
      individual.encounter["base-flee-rate-String"] = "Não Capturável"
   } else {
     if(individual.encounter["base-flee-rate"] <= 1){
      individual.encounter["base-flee-rate"] = individual.encounter["base-flee-rate"]*100.0000001
      individual.encounter["base-flee-rate"] = individual.encounter["base-flee-rate"].toFixed(1)
      individual.encounter["base-flee-rate"] = parseFloat(individual.encounter["base-flee-rate"])
      individual.encounter["base-flee-rate-String"] = individual.encounter["base-flee-rate"] + "%"
    }
   }
  if (individual.encounter["base-capture-rate"] === "not in capture") {
    individual.encounter["base-capture-rate"] = 999999999
    individual.encounter["base-capture-rate-String"] = "Não Capturável"
 } else {
   if(individual.encounter["base-capture-rate"] <= 1){
    individual.encounter["base-capture-rate"] = individual.encounter["base-capture-rate"]*100.0000001
    individual.encounter["base-capture-rate"] = individual.encounter["base-capture-rate"].toFixed(1)
    individual.encounter["base-capture-rate"] = parseFloat(individual.encounter["base-capture-rate"])
    individual.encounter["base-capture-rate-String"] = individual.encounter["base-capture-rate"] + "%"
  } else {
    individual.encounter["base-capture-rate"] = parseFloat(individual.encounter["base-capture-rate"])
    individual.encounter["base-capture-rate-String"] = individual.encounter["base-capture-rate"] + "%"
  }
 }
}

//4) Identificando quantidade máximas de tipo de um pokemon e substituindo-as (length dos arrays):
function adjustArraySize (dataset, attribute) {
  //Identificando valor máximo do tamanho da array:
  const maxLengthOfAnArray = dataset.reduce((acc, item ) => Math.max(acc, item[attribute].length), 0);
  for (const individual of dataset) {
    for (let j=0; j<individual[attribute].length; j++){
      //O tamanho da array antigo se torna o start do fill e irá preencher até o novo tamanho da array:
      const oldLength = individual[attribute].length;
      if (individual[attribute].length < maxLengthOfAnArray) {
          individual[attribute].length = maxLengthOfAnArray;
          individual[attribute].fill("", oldLength, maxLengthOfAnArray);
      }
    }
  }
}
//Tipos
adjustArraySize(pokemon, ["type"]);
adjustArraySize(pokemon, ["resistant"]);
adjustArraySize(pokemon, ["weaknesses"]);

//5)  Criar segunda coluna de objetos para pegar a imagem do outro site  (alguns ids começam com 0):
//Soma 1 ao index da array.
for (let i=0; i<pokemon.length; i++) {
pokemon[i].idWithoutLeftZeros = i + 1
}

//5.b) Cria uma segunda coluna de objetos para indicar a importância da raridade:
for (const individual of pokemon){
  individual["rarity-order"] = "";
  if(individual["pokemon-rarity"] === "Lendário") {
    individual["rarity-order"] = "Third";
  } else if (individual["pokemon-rarity"] === "Mítico") {
    individual["rarity-order"] = "Second";
  } else if (individual["pokemon-rarity"] === "Normal") {
    individual["rarity-order"] = "First";
  }
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
    individual[attributeInPortuguese] = [];
    individual[attributePTAbreviation] = [];
    for (let j=0; j<individual[originalAttribute].length; j++) {
      for (let k=0; k < namesCorrespondence.length; k++)
      if(individual[originalAttribute][j] === namesCorrespondence[k].englishName) {
        individual[attributeInPortuguese][j] = namesCorrespondence[k].portugueseName;
        individual[attributePTAbreviation][j] = namesCorrespondence[k].abreviation;
      } else if (individual[originalAttribute][j] === "") {
        individual[attributeInPortuguese][j] = "";
        individual[attributePTAbreviation][j] = "";
      }
    }
  }
}
//Tipo, resistência e abreviações:
changeNames (pokemon, ["type"], ["typeInPortugues"], ["typePTabreviation"]);
changeNames (pokemon, ["resistant"], ["resistantInPortugues"], ["resistantPTabreviation"]);
changeNames (pokemon, ["weaknesses"], ["weaknessesInPortugues"], ["weaknessesPTabreviation"]);

//7) Transformação de variáveis do tipo string em numéricas:
function stringToNumber (dataset, firstAttribute, secondAttribute) {
  for (const individual of dataset) {
    individual[firstAttribute][secondAttribute] = parseInt(individual[firstAttribute][secondAttribute]);
  }
}
stringToNumber(pokemon, ["stats"], ["base-attack"]);
stringToNumber(pokemon, ["stats"], ["base-defense"]);
stringToNumber(pokemon, ["stats"], ["base-stamina"]);
stringToNumber(pokemon, ["stats"], ["max-cp"]);
stringToNumber(pokemon, ["stats"], ["max-hp"]);

//Cálculo agregado (comparação com as stats médias:)
//8) Definição das médias:
const baseAttackAverage = computeAverage(pokemon, ["stats"], ["base-attack"]);
const baseDefenseAverage = computeAverage(pokemon, ["stats"], ["base-defense"]);
const baseStaminaAverage = computeAverage(pokemon, ["stats"], ["base-stamina"]);
const maxCpAverage= computeAverage(pokemon, ["stats"], ["max-cp"]);
const maxHpAverage= computeAverage(pokemon, ["stats"], ["max-hp"]);

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
compareWithAverage(pokemon, ["stats"], ["base-attack"], baseAttackAverage, ["statusAttackGreater"], ["statusAttackLower"]);
compareWithAverage(pokemon, ["stats"], ["base-defense"], baseDefenseAverage, ["statusDefenseGreater"], ["statusDefenseLower"]);
compareWithAverage(pokemon, ["stats"], ["base-stamina"], baseStaminaAverage, ["statusStaminaGreater"], ["statusStaminaLower"]);
compareWithAverage(pokemon, ["stats"], ["max-cp"], maxCpAverage, ["statusMaxCpGreater"], ["statusMaxCpLower"]);
compareWithAverage(pokemon, ["stats"], ["max-hp"], maxHpAverage, ["statusMaxHpGreater"], ["statusMaxHpLower"]);

//9) Criação dos botões de tipo, resistência e fraqueza no HTML:
function createButtons (dataset, attribute) {
  const listButttons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <button class="filter-button-${attribute} is-button-or-input" id="${dataset["englishNameLowerCase"]}-${attribute}-button" value=${dataset["englishName"]}> ${dataset["portugueseName"]}</button>
        `
   return(accumulator);
  },[])
    const printList= document.getElementById("buttons-" + attribute);
    printList.innerHTML = listButttons;
}
createButtons(namesCorrespondence, "type");
createButtons(namesCorrespondence, "resistant");
createButtons(namesCorrespondence, "weaknesses");

// Pesquisa Avançada
function createSelection (dataset, firstAttribute, attributeInPortuguese) {
  const listButttons = dataset.reduce((accumulator, dataset) => {
    accumulator += `
    <option value=${dataset["englishName"]} class="order-selection">${attributeInPortuguese}: ${dataset["portugueseName"]}</option>
        `
   return(accumulator);
  },[])
    const printList= document.getElementById("advanced-search-" + firstAttribute + "-select");
    printList.innerHTML = `<option selected disable class="disabled-order" value ="All">${attributeInPortuguese}</option>` + `<option value="All" class="order-selection">${attributeInPortuguese}: Todos</option>`+listButttons 
   ;
}
createSelection(namesCorrespondence, "type", "Tipo")
createSelection(namesCorrespondence, "resistant", "Resistência")
createSelection(namesCorrespondence, "weaknesses", "Fraqueza")

//10) Criação das listas:
//Quando API de Imagens functionar:
//<img class="front-pokemon-image" alt="${dataset.name}" src="https://pokeres.bastionbot.org/images/pokemon/${dataset.idWithoutLeftZeros}.png">
//<img class="front-pokemon-image" alt="${dataset.name}" src="${dataset.img}">
function listPokemons (dataset, attribute) {
  const listOfPokemons = dataset.reduce((accumulator, dataset) => {
    const printAdditionalHere = decideWhatToAdd(dataset, attribute)
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
            <span>${dataset["size"]["weight"]} kg</span> 
            <img class="back-size-figures" alt="Altura" src="images/heigth.jpg">
            <span class="back-tooltiptext">Altura</span>
            <span>${dataset["size"]["height"]} m</span> 
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
  
  const printList= document.getElementById("lista-impressa");
  printList.innerHTML = listOfPokemons;
}

//Criação dos atributos adicionais na visualização dos cards:
function decideWhatToAdd (dataset, attribute) {
  let attributeToBeAdded = "";
  switch (attribute) {
    case "rarity-order":
      attributeToBeAdded = `<p class="front-pokemon-rarity" value= ${dataset["pokemon-rarity"]}>Nível de Raridade: ${dataset["pokemon-rarity"]}</p>`;  
    break;
    case "egg":
      attributeToBeAdded = `<p class="front-eggs-distance"  value= ${dataset["egg"]}> Distância dos Ovos: ${dataset["egg"]}</p>`;
    break;
    case "spawn-chance":
      attributeToBeAdded = `<p class="front-spawn-chance" value= ${dataset["spawn-chance"]}> Probabilidade de Aparição: ${dataset["spawn-chance"]}%</p>`;
    break;
    case "weight":
      attributeToBeAdded = `<p class="front-size" value= ${dataset["size"]["weight"]}> Peso: ${dataset["size"]["weight"]} kg</p>`;
    break;
    case "height":
      attributeToBeAdded = `<p class="front-size" value= ${dataset["size"]["height"]}> Altura: ${dataset["size"]["height"]}m</p>`;
    break;
    case "base-attack":
      attributeToBeAdded = `<p class="front-stats" value= ${dataset["stats"]["base-attack"]}> Ataque: ${dataset["stats"]["base-attack"]}</p>`;
    break;
    case "base-defense":
      attributeToBeAdded = `<p class="front-stats" value= ${dataset["stats"]["base-defense"]}> Defesa: ${dataset["stats"]["base-defense"]}</p>`;
    break;
    case "base-stamina":
      attributeToBeAdded = `<p class="front-stats" value= ${dataset["stats"]["base-stamina"]}> Stamina: ${dataset["stats"]["base-stamina"]}</p>`;
    break;
    case "max-cp":
      attributeToBeAdded = `<p class="front-stats" value= ${dataset["stats"]["max-cp"]}> Força de Combate: ${dataset["stats"]["max-cp"]}</p>`;
    break;
    case "max-hp":
      attributeToBeAdded = `<p class="front-stats" value= ${dataset["stats"]["max-hp"]}> Pontos de Vida: ${dataset["stats"]["max-hp"]}</p>`;
    break;
    case "generation":
      attributeToBeAdded =`<p class="front-pokemon-generation"> Geração ${dataset["generation"]["num"]}  </p>`;
    break;
    case "resistant":
      attributeToBeAdded =` <p id="resistant-to"> Resistente à </p>
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
      </div>`;
    break;
    case "weaknesses":
      attributeToBeAdded =`<div class="front-pokemon-weaknesses">
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
    </div>`;
    break;
    case "buddy-distance-km":
      attributeToBeAdded = `<p class="front-buddy-distance" value= ${dataset["buddy-distance-km"]}> Distância: ${dataset["buddy-distance-km"]} km</p>`;
    break;
    case "base-flee-rate":
      attributeToBeAdded = `<p class="front-encounter" value= ${dataset["encounter"]["base-flee-rate"]}> Chance de Escape: ${dataset["encounter"]["base-flee-rate-String"]}</p>`;
    break;
    case "base-capture-rate":
      attributeToBeAdded = `<p class="front-encounter" value= ${dataset["encounter"]["base-capture-rate"]}> Chance de Captura: ${dataset["encounter"]["base-capture-rate-String"]}</p>`;
    break;
    default:
      attributeToBeAdded = ``
    break;
  } 
  return attributeToBeAdded
}

//Print lista geral na tela:
listPokemons(pokemon, "");

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
orderButton.addEventListener("click", (event) => {
  event.preventDefault();
  switch (order.value) {
    case "egg":
      listPokemons(sortData (pokemon, "", order.value, option.value), order.value);
      break;
    case "rarity-order":
      listPokemons(sortData (pokemon, "", order.value, option.value), order.value);
      break;
    case "spawn-chance":
      listPokemons(sortData (pokemon, "", order.value, option.value), order.value);
      break;
    case "weight":
      listPokemons(sortData (pokemon, ["size"], order.value, option.value), order.value);
      break;
    case "height":
      listPokemons(sortData (pokemon, ["size"], order.value, option.value), order.value);
      break;
    case "base-attack":
      listPokemons(sortData (pokemon, ["stats"], order.value, option.value), order.value);
      break;
    case "base-defense":
      listPokemons(sortData (pokemon, ["stats"], order.value, option.value), order.value);
      break;
    case "base-stamina":
      listPokemons(sortData (pokemon, ["stats"], order.value, option.value), order.value);
      break;
    case "max-cp":
      listPokemons(sortData (pokemon, ["stats"], order.value, option.value), order.value);
      break;
    case "max-hp":
      listPokemons(sortData (pokemon, ["stats"], order.value, option.value), order.value);
      break;
    case "base-flee-rate":
      listPokemons(sortData (pokemon, ["encounter"], order.value, option.value), order.value);
    break;
    case "base-capture-rate":
      listPokemons(sortData (pokemon, ["encounter"], order.value, option.value), order.value);
    break;
    default:
      listPokemons(sortData (pokemon, "", order.value, option.value), "");
      break
    } 
})

// 13) Main Filtros por botão:
function showFilters (section) {
  const divSection = document.getElementById(section) 
  divSection.classList.toggle("show")
}

function hideFiltersDivs (...ids) {
  const elements = ids.map(id => document.getElementById(id))
  elements.forEach(el => {
    el.classList.remove("show")
  })
  
}
//Main Filter
document.getElementById("filters-button").addEventListener("click", function (event) {
  event.preventDefault()
  showFilters("filters-section")
})
//Generation Filter
document.getElementById("filter-by-generation-button").addEventListener("click", function (event) {
  event.preventDefault()
  showFilters("buttons-generation")
  hideFiltersDivs("buttons-type", "buttons-resistant", "buttons-weaknesses", "buttons-buddy-distance","buttons-advanced-search")

})
//Type Filter
document.getElementById("filter-by-type-button").addEventListener("click", function (event) {
  event.preventDefault()
  showFilters("buttons-type")
  hideFiltersDivs("buttons-generation", "buttons-resistant", "buttons-weaknesses", "buttons-buddy-distance","buttons-advanced-search")
})
//Resistence Filter
document.getElementById("filter-by-resistant-button").addEventListener("click", function (event) {
  event.preventDefault()
  showFilters("buttons-resistant")
  hideFiltersDivs("buttons-type", "buttons-generation", "buttons-weaknesses", "buttons-buddy-distance","buttons-advanced-search")
})
//Weaknesses Filter
document.getElementById("filter-by-weaknesses-button").addEventListener("click", function (event) {
  event.preventDefault();
  showFilters("buttons-weaknesses");
  hideFiltersDivs("buttons-type", "buttons-resistant", "buttons-generation","buttons-buddy-distance","buttons-advanced-search")
})
//Buddy distance Filter
document.getElementById("filter-by-buddy-distance-button").addEventListener("click", function (event) {
  event.preventDefault();
  showFilters("buttons-buddy-distance");
  hideFiltersDivs("buttons-type", "buttons-resistant", "buttons-generation", "buttons-weaknesses","buttons-advanced-search")
})
//Advanced Search
document.getElementById("filter-by-advanced-search").addEventListener("click", function (event) {
  event.preventDefault();
  showFilters("buttons-advanced-search");
  hideFiltersDivs("buttons-type", "buttons-resistant", "buttons-generation", "buttons-weaknesses","buttons-buddy-distance")
})

//14) SubFiltros por botão:
//14.a) Geraçao
//14.a.I) Printar primeira OU Segunda geração:
let generationResult = {};
let generationButton = "";
//14.a) Criação da função geral dos botões (primeira e segunda geração):
function generationButtonsFunction (generationInput) {
document.getElementById(generationInput).addEventListener("click", function (event) {
    event.preventDefault();
    generationButton = event.target.value;
    generationResult = filterData(pokemon, ["generation"],["num"], generationButton);
    listPokemons(generationResult, "generation");
    filterNames();
  })
}
//14.a.I.A) Criação de um array com o nome dos botões:
const pokemonGenerations = ["first-generation-button","second-generation-button"] ;
//14.a.I.B) Aplicação da função geral do botão para cada elemento da array(cada nome de botão).
//14.a.I.C) A função generationButtonsFunction irá ser aplicada para cada geração do
pokemonGenerations.map(generationButtonsFunction);
//14.II) Printar primeira E Segunda gerações;
document.getElementById("all-generations-button").addEventListener("click", function (event) {
    event.preventDefault();
    listPokemons(pokemon, "generation");
    filterNames();
})

//14.b) Tipo
let typeResult = {};
let typeButton = "";
//14.b.I) Criação da função geral dos botões:
function typeButtonsFunction (typeInput) {
  document.getElementById(typeInput).addEventListener("click", function (event) {
    event.preventDefault();
    typeButton = event.target.value;
    typeResult = filterData(pokemon, ["type"], "", typeButton);
    listPokemons(typeResult, "");
    filterNames();
  })
}
//14.b.II) Criação de um array com o nome dos botões + Adição do sufixo "-attribute-button":
function addingButtonSuffix (attribute) {
let newButton = [];
  for (let i=0; i<namesCorrespondence.length; i++) {
    namesCorrespondence[i].forButtton = namesCorrespondence[i].englishNameLowerCase + "-" + attribute + "-button";
    }
  newButton = namesCorrespondence.map((ObjectFrom) => {
    return ObjectFrom.forButtton});
  return (newButton);
}
//14.b.III) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
addingButtonSuffix("type").map(typeButtonsFunction);

//14.c) Resistência
let resistantResult = {};
let resistantButton = "";
//14.c.I) Criação da função geral dos botões:
function resistantButtonsFunction (resistantInput) {
  document.getElementById(resistantInput).addEventListener("click", function (event) {
    event.preventDefault();
    resistantButton = event.target.value;
    resistantResult = filterData(pokemon, ["resistant"], "", resistantButton);
    listPokemons(resistantResult, "resistant");
    filterNames();
  })
}
//14.c.II) Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
addingButtonSuffix("resistant").map(resistantButtonsFunction);

//14.d) Fraqueza
  let weaknessesResult = {};
  let weaknessesButton = "";
//14.d.I) Criação da função geral dos botões:
  function WeaknessesButtonsFunction (WeaknessesInput) {
    document.getElementById(WeaknessesInput).addEventListener("click", function (event) {
    event.preventDefault();
    weaknessesButton = event.target.value;
    weaknessesResult = filterData(pokemon, ["weaknesses"], "", weaknessesButton);
    listPokemons(weaknessesResult, "weaknesses");
    filterNames();
    });
  }
//14.d.II Aplicação da função geral do botão para cada elemento da array(cada nome de botão)
addingButtonSuffix("weaknesses").map(WeaknessesButtonsFunction);

//14.e) Buddy Distance
let buddyDistanceResult = {};
let buddyDistanceButton = "";
const pokemonBuddyDistance = ["1km-button","3km-button", "5km-button", "20km-button"] ;
function BuddyDistanceButtonsFunction (budyDistanceInput) {
  document.getElementById(budyDistanceInput).addEventListener("click", function (event) {
  event.preventDefault();
  buddyDistanceButton = event.target.value;
  buddyDistanceResult = filterData(pokemon, ["buddy-distance-km"], "", buddyDistanceButton);
  listPokemons(buddyDistanceResult, "buddy-distance-km");
  filterNames();
  });
}
pokemonBuddyDistance.map(BuddyDistanceButtonsFunction);

// 15. Glossário)
function showDiv (section) {
  const divSection = document.getElementById(section) 
  if (divSection.style.display === "none") {
    divSection.style.display="block"
  } else {
    divSection.style.display="none"
  }
}
//15.a) Abrir glossário:
document.getElementById("open-glossary").addEventListener("click", function (event) {
  event.preventDefault()
  showDiv("glossary")
})
//15.b) Fechar glossário:
document.getElementById("close-glossary").addEventListener("click", function (event) {
  event.preventDefault()
  showDiv("glossary")
})

// 16. Pesquisa Avançada:
const advancedGeneration = document.getElementById("advanced-search-generation-select");
const advancedType = document.getElementById("advanced-search-type-select");
const advancedResistant = document.getElementById("advanced-search-resistant-select");
const advancedWeaknesses = document.getElementById("advanced-search-weaknesses-select");
const advancedFilterButton = document.getElementById("filter-advanced-search");


//Aqui, ao invés criar uma condição para atributos vazios (seriam muitos if e elses, criamos um array de gerações já com o valor do numero da geração)
for (const individual of pokemon){
  individual["generatioNum"] = [];
  individual["generatioNum"] = individual.generation.num
}

advancedFilterButton.addEventListener("click", (event) => {
  let advancedDataResult = {};
  const emptySearch = document.getElementById("advanced-search-is-empty");
  event.preventDefault();
  advancedDataResult = advancedFilterData(pokemon, ["generatioNum"], advancedGeneration.value, ["type"], advancedType.value, ["resistant"], advancedResistant.value, ["weaknesses"], advancedWeaknesses.value)
  if(advancedDataResult.length === 0){
      emptySearch.style.display="block"
  } else {
    emptySearch.style.display="none"
  }
  listPokemons(advancedDataResult, "")
})


}
getData();
