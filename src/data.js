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
    if (a[sortBy] < b[sortBy]){
      return -1;
    } else {
      return 0;
    }
  }
    if(sortOrder === "ascending"){
      data.sort(compare);
      return data;
  
    } else {
      data.sort(compare);
      data.reverse();
      return data;
    } 
};

export const computeAverage = (data, firstAttribute, secondAttribute) => {
  let result = "";
  if (secondAttribute !== ""){
    result = data.reduce((inicial,current) => inicial + current[firstAttribute][secondAttribute]/data.length,0);
  } else {
    result = data.reduce((inicial,current) => inicial + current[firstAttribute]/data.length,0);
  }
return result;
}

