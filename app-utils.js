async function isStringANumber(str) {
  const regex = /^-?\d+(\.\d+)?$/;
  if (regex.test(str) === false) {
    return Promise.reject({ status: 400, message: "Invalid input" });
  }
}

async function emptyArrayCheck(arr) {
  if (arr.length > 0) {
    return true;
  } else {
    return Promise.reject({ status: 404, message: "Item not found" });
  }
}

module.exports = { isStringANumber, emptyArrayCheck };
