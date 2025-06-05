const customErrors = async function (err, request, response, next) {
  try {
    if (err.status) {
      return response.status(err.status).send({ message: err.message });
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const genericError = async function (err, request, response, next) {
  try {
    return response.status(500).send({ message: "Unclassified error" });
  } catch (err) {
    return response.status(500).send({ message: "Unclassified error" });
  }
};

module.exports = { customErrors, genericError };
