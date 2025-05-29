const { convertTimestampToDate } = require("./utils");

//Code Start

function formatData(data) {
  const reformattedData = data.map((element) => {
    return convertTimestampToDate(element);
  });
  console.log(reformattedData);
  const placeHolderArray = [];
  let index = 0;
  reformattedData.map((element) => {
    const valuesArray = [];
    for (const [key, value] of Object.entries(element)) {
      valuesArray.push(value);
    }
    placeHolderArray.push(valuesArray);
    index++;
  });
  //console.log(placeHolderArray);
  return placeHolderArray;
}

function getKeys(data) {
  const reformattedData = data.map((element) => {
    return convertTimestampToDate(element);
  });
  const keyReference = reformattedData[0];
  let placeholder = [];
  for (const [key] of Object.entries(keyReference)) {
    placeholder.push(key);
  }
  //console.log(placeholder);
  return placeholder;
}

module.exports = {
  getKeys,
  formatData,
};
