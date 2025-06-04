const app = require("./app.js");

app.listen(9090, (err) => {
  if (err) {
    console.log(`Error:\n${err}`);
  } else {
    console.log(`Server listening on port 9090`);
  }
});
