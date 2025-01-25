const http = require("http");
const fs = require("fs"); //gets file syst
const port = 3000; 

const server = http.createServer((req, res) => {
    console.log("request made");
    res.setHeader("Content-Type", "text/html");
    
    let path = "./views/";
    switch(req.url){
        case "/":
            path += "index.html";
            res.statusCode = 200; 
            break;
        case "/about":
           path += "about.html";
           res.statusCode = 200;
           break;
        case "/about-me":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end(); 
            break;// how to do a redirect
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }
    //send an HTML file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end();
        }else {
            //res.write(data)
            res.end(data);//can add data var here if sending one thing
        }
    })// how to read a file


}); //storing in var is optional

//localhost is default. no need to add
server.listen(port, "localhost", () => {
    console.log("Listening for requests on port 3000");
})