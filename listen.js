const { app } = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

// const listen = app.listen(PORT, (err) => {
//   if (err) {
//     console.log(`Error:\n${err}`);
//   } else {
//     console.log(`Server listening on port 9090`);
//   }
// });

// module.exports = { listen };
