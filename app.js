const express = require("express");
const morgan = require("morgan")
const app = express(); 

//registar view engine
app.set("view engine", "ejs");

const port = 3000; 

//listen for request
app.listen(port);

app.use(express.static("public")) //links static files such as css
app.use(morgan("dev"));

// app.use((req, res, next) => {
//     console.log("New request made")
//     console.log("host ", req.hostname)
//     console.log("Path ", req.path)
//     console.log("Method ", req.method)
//     next();
// })

// app.use((req, res, next) => {
//     console.log("In the next middleware")

//     next();
// })

app.get("/", (req,res) => {
    const blogs =[
        {title: "blog 1", snippet: "jakdjfakdjfajjfdlaajfldska"},
        {title: "blog 2", snippet: "jakdjfakdjfajjfdlaajfldska"},
        {title: "blog 3", snippet: "jakdjfakdjfajjfdlaajfldska"}
    ]
    //res.send("<p>Home Page</p>")
    //res.sendFile("./views/index.html", {root: __dirname});
    res.render("index", {title: "home", blogs}); //in ejs this obj is being passed into the index.ejs file
})

app.get("/about", (req,res) => {

    //res.sendFile("./views/about.html", {root: __dirname});
   // res.send("<p>About Page</p>")
   res.render("about", {title: "about"});
})

//redirect

// app.get("/about-us", (req,res) => {
//     res.redirect("/about");
// })

//creat blogs page

app.get("/blogs/create", (req,res) => {

   res.render("create", {title: "create blog"});
})

//404 page

app.use((req,res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname})
    res.status(404).render("404", {title: "404"});
})