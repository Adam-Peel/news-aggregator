const { convertTimestampToDate } = require("./utils");

function formatData(data) {
  const reformattedData = data.map((element) => {
    return convertTimestampToDate(element);
  });
  const placeHolderArray = [];
  reformattedData.map((element) => {
    const valuesArray = [];
    for (const [key, value] of Object.entries(element)) {
      valuesArray.push(value);
    }
    placeHolderArray.push(valuesArray);
  });
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
  return placeholder;
}

function getLookup(data, valueToLookUp, valueToReference) {
  if (Object.keys(data).length === 0) {
    return "dataset is empty";
  }
  const lookupObject = {};
  const dataToIterateOver = data.rows;
  dataToIterateOver.forEach((element) => {
    lookupObject[element[valueToLookUp]] = element[valueToReference];
  });
  return lookupObject;
}

module.exports = {
  getKeys,
  formatData,
  getLookup,
};
