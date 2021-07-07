export const filterData = (dataset, firstAttribute, secondAttribute, value) => {
  let filteredData = "";
  if (secondAttribute !== ""){
    filteredData = dataset.filter(data => data[firstAttribute][secondAttribute] === value);
  } else {
    filteredData = dataset.filter((data) => data[firstAttribute].includes(value));
  }
 return filteredData;
};


export const sortData = (data,firstAttribute, secondAttribute, sortOrder) => {
  if (firstAttribute === "") {
    const compare = (a, b) => {
      if(typeof a[secondAttribute] !== "number") {
        if(a[secondAttribute] < b[secondAttribute]) { 
          return -1
        } else {
          return 0;
        }
      } else {
        return a[secondAttribute] - b[secondAttribute];
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
  } else {
    const compare = (a, b) => {
      if(typeof a[firstAttribute][secondAttribute] !== "number") {
          if(a[firstAttribute][secondAttribute] > b[firstAttribute][secondAttribute]) {
            return 1;
          } else {
            return 0
          }
      } else {
          return a[firstAttribute][secondAttribute]- b[firstAttribute][secondAttribute];
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

