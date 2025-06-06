async function isStringANumber(str) {
  const regex = /^-?\d+(\.\d+)?$/;
  if (regex.test(str) === false) {
    return Promise.reject({ status: 400, message: "Invalid input" });
  }
}

//TODO - BUG
async function singleRowHandler(arr) {
  if (arr.length === 0) {
    return Promise.reject({ status: 404, message: "Item not found" });
  } else {
    return arr[0];
  }
}

module.exports = { isStringANumber, singleRowHandler };
