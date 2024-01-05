const { server } = require("./src/server.js");

const port = 3000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`server is running on http://${host}:${port}`);
});
