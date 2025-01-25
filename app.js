const express = require("express");
const app = express(); 

//registar view engine
app.set("view engine", "ejs");

const port = 3000; 

//listen for request
app.listen(port);

app.get("/", (req,res) => {

    //res.send("<p>Home Page</p>")
    //res.sendFile("./views/index.html", {root: __dirname});
    res.render("index");
})

app.get("/about", (req,res) => {

    //res.sendFile("./views/about.html", {root: __dirname});
   // res.send("<p>About Page</p>")
   res.render("about");
})

//redirect

// app.get("/about-us", (req,res) => {
//     res.redirect("/about");
// })

//creat blogs page

app.get("/blogs/create", (req,res) => {

    //res.sendFile("./views/about.html", {root: __dirname});
   // res.send("<p>About Page</p>")
   res.render("create");
})

//404 page

app.use((req,res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname})
    res.status(404).render("404");
})