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
    // NOTE - required creating array to push into placeholder to ensure nesting
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

function replaceObjectEntries(
  dataToAmend,
  propertyToAmend,
  lookupObject,
  renameStringForProperty
) {
  const clonedObject = [...dataToAmend];
  clonedObject.forEach((element) => {
    const reference = element[[propertyToAmend]];
    element[renameStringForProperty] = lookupObject[reference];
  });
  return clonedObject;
}

function removePropertyFromArrayOfObjects(data, propertyToRemove) {
  const deletedArray = data.forEach((element) => {
    delete element[`${propertyToRemove}`];
  });
  return deletedArray;
}

module.exports = {
  getKeys,
  formatData,
  getLookup,
  replaceObjectEntries,
  removePropertyFromArrayOfObjects,
};
