///SEÇÃO 1: IMPORTAÇÃO DAS FUNÇÕES
import { filterData } from '../src/data.js';
import { sortData } from '../src/data.js';
import { computeAverage } from '../src/data.js';


describe('filterData', () => {
  it('filterData should be a function', () => {
    expect(typeof filterData).toBe('function');
})
it('When filtering pokemon generation (II), it should return an object with {Lugia..., Chikorita}', () => {
  const pokemonData = [
    {name:"Pikachu", generation:{"num":"I", "name":"Kanto"}, type:["Electric"]},
    {name:"Charmander", generation:{"num":"I", "name":"Kanto"}, type:["Fire"]},
    {name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Psychic", "Flying"]},
    {name:"Pidgeot", generation:{"num":"I", "name":"Kanto"}, type:["Normal", "Flying"]},
    {name:"Chikorita", generation:{"num":"II", "name":"Johto"}, type:["Grass"]}
  ]
  const pokemonFilterData = filterData(pokemonData, ["generation"], ["num"], "II");
  expect(pokemonFilterData).toStrictEqual([{name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Psychic", "Flying"]},
  {name:"Chikorita", generation:{"num":"II", "name":"Johto"}, type:["Grass"]}
]);
});

it('When filtering pokemon type, it should return an object with {Lugia..., Pidgeot}', () => {
  const pokemonData = [
    {name:"Pikachu", generation:{"num":"I", "name":"Kanto"}, type:["Electric"]},
    {name:"Charmander", generation:{"num":"I", "name":"Kanto"}, type:["Fire"]},
    {name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Flying", "Psychic"]},
    {name:"Pidgeot", generation:{"num":"I", "name":"Kanto"}, type:["Normal", "Flying"]},
    {name:"Chikorita", generation:{"num":"II", "name":"Johto"}, type:["Grass"]}
  ]
  const pokemonFilterData = filterData(pokemonData, ["type"], "", "Flying");
  expect(pokemonFilterData).toStrictEqual([{name:"Lugia", generation:{"num":"II", "name":"Johto"}, type:["Flying","Psychic"]},
  {name:"Pidgeot", generation:{"num":"I", "name":"Kanto"}, type:["Normal", "Flying"]}
]);
});


});

describe('sortData', () => {
  it('sortData should be a function', () => {
    expect(typeof sortData).toBe('function');
  });


 it('When to sort in ascending order (names) Abra and Zubat, it should show Abra first', () => {
   const pokemonNames = [{name:"Abra"}, {name:"Zubat"}];
   const pokemonNamesSorted = sortData(pokemonNames, "", "name", "ascending");
   expect(pokemonNamesSorted[0].name).toBe("Abra");
  });

  it('When to sort in descending order (names) Abra and Zubat, it should show Zubat first.', () => {
    const pokemonNames = [{name:"Abra"}, {name:"Zubat"}];
    const pokemonNamesSorted = sortData(pokemonNames, "","name", "descending");
    expect(pokemonNamesSorted[0].name).toBe("Zubat");
   });

   //Comparação entre L e N, N > L. Então ocorre a necessidade de "girar";
   it('When to sort in ascending order (rarity-order) First and Third, it should show First first.', () => {
    const pokemonRarity= [{pokemonR:"First"}, {pokemonR:"Third"}];
    const pokemonRaritySorted = sortData(pokemonRarity, "","rarity-order", "ascending");
    expect(pokemonRaritySorted[0].pokemonR).toBe("First");
   });
 
   it('When to sort in descending order (rarity-order) First and Third, it should show Third first.', () => {
    const pokemonRarity= [{pokemonR:"First"}, {pokemonR:"Third"}];
    const pokemonRaritySorted = sortData(pokemonRarity, "","rarity-order", "descending");
    expect(pokemonRaritySorted[0].pokemonR).toBe("Third");
   });
  
   it('When to sort in ascending order (eggs distance) 02 Km and 05 Km, it should show 02 Km first.', () => {
    const pokemonEggsDistance = [{eggD:"02 Km"}, {eggD:"05 Km"}];
    const pokemonEggsDistanceSorted = sortData(pokemonEggsDistance, "","egg", "ascending");
    expect(pokemonEggsDistanceSorted[0].eggD).toBe("02 Km");
   });
 
   it('When to sort in descending order (eggs distance) 02 Km and 05 Km, it should show 05 Km first.', () => {
    const pokemonEggsDistance = [{eggD:"02 Km"}, {eggD:"05 Km"}];
    const pokemonEggsDistanceSorted = sortData(pokemonEggsDistance, "","egg", "descending");
    expect(pokemonEggsDistanceSorted[0].eggD).toBe("05 Km");
   });

  it('When to sort in ascending order (spawn-chance) 0% and 0.1%, it should show 0% first.', () => {
    const pokemonSpawnChance = [{name:"Pikachu", pokemonSC:0}, {name:"Charmander", pokemonSC:0.1}, {name:"Chikorita", pokemonSC:0.5}];
    const pokemonSpawnChanceSorted = sortData(pokemonSpawnChance, "","spawn-chance", "ascending");
    expect(pokemonSpawnChanceSorted[0].pokemonSC).toBe(0);
   });

  it('When to sort in descending order (spawn-chance) 0% and 0.1%, it should show 0.1% first.', () => {
    const pokemonSpawnChance = [{name:"Pikachu", pokemonSC:0}, {name:"Charmander", pokemonSC:0.1}, {name:"Chikorita", pokemonSC:0.5}];
    const pokemonSpawnChanceSorted = sortData(pokemonSpawnChance, "","spawn-chance", "descending");
    expect(pokemonSpawnChanceSorted[0].pokemonSC).toBe(0.5);
   });
 
  it('When to sort in ascending order (stats, base-attack) it should show Charmander first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
      {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
      {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
      {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, ["stats"],["base-attack"], "ascending");
    expect(pokemonAttackSorted[0].name).toBe("Charmander");
  })

  it('When to sort in descending order (stats, base-attack) it should show Lugia first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
      {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
      {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
      {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, ["stats"],["base-attack"], "descending");
    expect(pokemonAttackSorted[0].name).toBe("Lugia");
  })

  it('When to sort in ascending order (defense) it should show Charmander first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", defense:96},
      {name:"Charmander", defense:93},
      {name:"Pupitar", defense:133},
      {name:"Lugia", defense:310}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, "","defense", "ascending");
    expect(pokemonAttackSorted[0].name).toBe("Charmander");
  })

  it('When to sort in descending order (defense) it should show Lugia first.',() => {
    const pokemonAttack = [
      {name:"Pikachu", defense:96},
      {name:"Charmander", defense:93},
      {name:"Pupitar", defense:133},
      {name:"Lugia", defense:310}
    ]
    const pokemonAttackSorted = sortData(pokemonAttack, "","defense", "descending");
    expect(pokemonAttackSorted[0].name).toBe("Lugia");
  })

  it('When to sort in ascending order (type[first]) it should show Charmander first.',() => {
    const pokemonType = [
      {name:"Pikachu", type:{"first":"water", "second":"ice"}},
      {name:"Charmander", type:{"first":"electric", "second":"steel"}},
      {name:"Pupitar", type:{"first":"grass", "second":"ground"}},
      {name:"Lugia", type:{"first":"ground", "second":"glass"}}
    ]
    const pokemonTypeSorted = sortData(pokemonType, ["type"],["first"], "ascending");
    expect(pokemonTypeSorted[0].name).toBe("Charmander");
  })

  it('When to sort in descending order (type[second]) it should show Charmander fisrt.',() => {
    const pokemonType = [
      {name:"Pikachu", type:{"first":"water", "second":"ice"}},
      {name:"Charmander", type:{"first":"electric", "second":"steel"}},
      {name:"Pupitar", type:{"first":"grass", "second":"ground"}},
      {name:"Lugia", type:{"first":"ground", "second":"glass"}}
    ]
    const pokemonTypeSorted = sortData(pokemonType, ["type"],["first"], "descending");
    expect(pokemonTypeSorted[0].name).toBe("Pikachu");
  })



 
});

describe('computeAverage', () => {
  it('computeAverage should be a function', () => {
    expect(typeof computeAverage).toBe('function');
  });

  it('When computing average (base-attack), it should return (122+116+155+193)/4 = 146.5', () => {
  const pokemonStats = [
    {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
    {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
    {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
    {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
  ]
  const pokemonStatsAverage = computeAverage(pokemonStats, ["stats"], ["base-attack"]);
  expect(pokemonStatsAverage).toBe(146.5);
});

it('When computing average (base-defense), it should return (96+93+133+310)/4 = 158', () => {
  const pokemonStats = [
    {name:"Pikachu", stats:{"base-attack":122, "base-defense":96}},
    {name:"Charmander", stats:{"base-attack":116, "base-defense":93}},
    {name:"Pupitar", stats:{"base-attack":155, "base-defense":133}},
    {name:"Lugia", stats:{"base-attack":193, "base-defense":310}}
  ]
  const pokemonStatsAverage = computeAverage(pokemonStats, ["stats"], ["base-defense"]);
  expect(pokemonStatsAverage).toBe(158);
});

it('When computing average (base-defense), it should return (0.21+0.253+0+0)/4 = 0.11574999999999999', () => {
  const pokemonSpawnChance = [
    {name:"Pikachu", spawnChance:0.21},
    {name:"Charmander", spawnChance:0.253},
    {name:"Pupitar", spawnChance:0},
    {name:"Lugia", spawnChance:0}
  ]
  const pokeSpawnChanceAverage = computeAverage(pokemonSpawnChance, ["spawnChance"], "");
  expect(pokeSpawnChanceAverage).toBe(0.11574999999999999);
});
});

