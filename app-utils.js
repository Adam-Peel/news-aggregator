function isStringANumber(str) {
  const regex = /^-?\d+(\.\d+)?$/;
  if (regex.test(str) === false) {
    return Promise.reject({ status: 400, message: "Invalid input" });
  }
}

module.exports = { isStringANumber };
