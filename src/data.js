export const filterData = (dataset, firstAttribute, secondAttribute, value) => {
  let filteredData = "";
  if (secondAttribute !== ""){
    filteredData = dataset.filter(data => data[firstAttribute][secondAttribute] === value);
  } else {
    filteredData = dataset.filter((data) => data[firstAttribute].includes(value));
  }
 return filteredData;
};

//Este filtro funciona para filtrar até 4 arrays;
export const advancedFilterData = (dataset, firstattribute, v1, secondattribute, v2, thirdattribute, v3, forthattribute, v4) => {
  let filteredData = "";
  if (v1 === "All" && v2 === "All" && v3 === "All" & v4 === "All"){
    filteredData = dataset;
  } else if(v1 === "All" && v2 === "All" & v3 === "All" && v4 !== "All"){
    filteredData = dataset.filter(data => data[forthattribute].includes(v4));
  } else if(v1 === "All" && v2 === "All" & v3 !== "All" && v4 === "All"){
    filteredData = dataset.filter(data => data[thirdattribute].includes(v3));
  } else if(v1 === "All" && v2 === "All" & v3 !== "All" && v4 !== "All"){
    filteredData = dataset.filter(data => data[thirdattribute].includes(v3) && data[forthattribute].includes(v4));
  } else if(v1 === "All" && v2 !== "All" & v3 === "All" && v4 === "All"){
    filteredData = dataset.filter(data => data[secondattribute].includes(v2));
  } else if(v1 === "All" && v2 !== "All" & v3 === "All" && v4 !== "All"){
    filteredData = dataset.filter(data => data[secondattribute].includes(v2) && data[forthattribute].includes(v4));
  } else if(v1 === "All" && v2 !== "All" & v3 !== "All" && v4 === "All"){
    filteredData = dataset.filter(data => data[secondattribute].includes(v2) && data[thirdattribute].includes(v3));
  } else if(v1 === "All" && v2 !== "All" & v3 !== "All" && v4 !== "All"){
    filteredData = dataset.filter(data => data[secondattribute].includes(v2) && data[thirdattribute].includes(v3) && data[forthattribute].includes(v4))
  } else if(v1 !== "All" && v2 === "All" & v3 === "All" && v4 === "All"){
    filteredData = dataset.filter(data => data[firstattribute].includes(v1));
  } else if(v1 !== "All" && v2 === "All" & v3 === "All" && v4 !== "All"){
    filteredData = dataset.filter(data => data[firstattribute].includes(v1) && data[forthattribute].includes(v4)); 
  } else if(v1 !== "All" && v2 === "All" & v3 !== "All" && v4 === "All"){
    filteredData = dataset.filter(data =>  data[firstattribute].includes(v1) && data[thirdattribute].includes(v3));
  } else if(v1 !== "All" && v2 === "All" & v3 !== "All" && v4 !== "All"){
    filteredData = dataset.filter(data =>  data[firstattribute].includes(v1) && data[thirdattribute].includes(v3) && data[forthattribute].includes(v4));
  } else if(v1 !== "All" && v2 !== "All" & v3 === "All" && v4 === "All"){
    filteredData = dataset.filter(data =>  data[firstattribute].includes(v1) && data[secondattribute].includes(v2));
  } else if(v1 !== "All" && v2 !== "All" & v3 === "All" && v4 !== "All"){
    filteredData = dataset.filter(data =>  data[firstattribute].includes(v1) && data[secondattribute].includes(v2) && data[forthattribute].includes(v4));
  } else if(v1 !== "All" && v2 !== "All" & v3 !== "All" && v4 === "All"){
    filteredData = dataset.filter(data =>  data[firstattribute].includes(v1) && data[secondattribute].includes(v2) && data[thirdattribute].includes(v3))
  } else {
    filteredData = dataset.filter(data =>  data[firstattribute].includes(v1) && data[secondattribute].includes(v2) && data[thirdattribute].includes(v3) && data[forthattribute].includes(v4) )
  }
  return filteredData
}


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

