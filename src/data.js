export const filterData = (dataset, firstAttribute, secondAttribute, value) => {
  let filteredData = "";
  if (secondAttribute !== ""){
    filteredData = dataset.filter(data => data[firstAttribute][secondAttribute] === value);
  } else {
    filteredData = dataset.filter((data) => data[firstAttribute].includes(value));
  }
 return filteredData
};


export const sortData = (data, sortBy, sortOrder) => {
const compare = (a, b) => {

  if (a[sortBy] < b[sortBy] ){
    return -1;
  }
  if (a[sortBy] > b[sortBy] ){
    return 1;
  }
  return 0;
  }

  if(sortBy==="name"){
    if(sortOrder === "ascending"){
      let ascName = [...data]
      ascName.sort(compare)
      return ascName

    } else {
      let descName = [...data]
      descName.sort(compare)
      descName.reverse()
      return descName
    }
  }  
  else if(sortBy==="pokemon-rarity") {
    if(sortOrder==="descending"){
      let ascRarity = [...data]
      ascRarity.sort(compare)
      return ascRarity

    }else{
      let descRarity = [...data]
      descRarity.sort(compare)
      descRarity.reverse()
      return descRarity
    }
  }
  else if(sortBy==="egg") {
    if(sortOrder==="ascending"){
      let ascEgg= [...data]
      ascEgg.sort(compare)
      return ascEgg

    }else{
      let descEgg = [...data]
      descEgg.sort(compare)
      descEgg.reverse()
      return descEgg
    }
  }
  else if(sortBy==="spawn-chance") {
    if(sortOrder==="ascending"){
      let ascSpawn= [...data]
      ascSpawn.sort(compare)
      return ascSpawn

    }else{
      let descSpawn = [...data]
      descSpawn.sort(compare)
      descSpawn.reverse()
      return descSpawn
    }
  }
};

export const computeStats = (data, firstAttribute, secondAttribute) => {
  let average = ""
  let result = ""
  if (secondAttribute !== ""){
    average = data.reduce((inicial,current) => inicial + current[firstAttribute][secondAttribute]/data.length,0)
    result = average.toFixed(4)
  } else {
    average = data.reduce((inicial,current) => inicial + current[firstAttribute]/data.length,0)
    result = average.toFixed(4)
  }
return result
}

