const http = require("http");
const port = 3000; 

const server = http.createServer((req, res) => {
    console.log("request made");
}); //storing in var is optional

//localhost is default. no need to add
server.listen(port, "localhost", () => {
    console.log("Listening for requests on port 3000");
})