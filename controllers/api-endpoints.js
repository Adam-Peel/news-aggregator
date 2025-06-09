const fs = require("fs/promises");

async function getEndpoints(request, response, next) {
  try {
    const data = await fs.readFile("../endpoints.json", "utf-8");
    const endpoints = JSON.parse(data);
    console.log(endpoints);
    response.status(200).send({ endpoints });
  } catch (err) {
    next(err);
  }
}

// async function getEndpoints(request, response, next) {
//   try {
//     const endpoints = fs.readFile(
//       "../endpoints.json",
//       "utf-8",
//       async function (err, data) {
//         if (err) {
//           throw err;
//         } else {
//           const endpoints = JSON.stringify(data);
//           response.status(200).send(JSON.stringify(endpoints));
//         }
//       }
//     );
//   } catch (err) {
//     next(err);
//   }
// }

module.exports = { getEndpoints };
