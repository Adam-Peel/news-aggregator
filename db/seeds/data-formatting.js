//Code Start

function formatData(data) {
  const placeHolderArray = [];
  let index = 0;
  data.map((element) => {
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
  const keyReference = data[0];
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
