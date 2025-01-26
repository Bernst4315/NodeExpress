const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose");
const Blog = require("./models/blog")

const app = express(); 
const port = 3000;

const dbURI = "mongodb+srv://bernst4315:BlkAngelfish25@cluster0.6rl8i.mongodb.net/Node-Tutorial?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((results) => {
        console.log("connected to database")
        app.listen(port);
    })
    .catch((err) => console.log(err));
//registar view engine
app.set("view engine", "ejs");

 

//add middleware


app.use(express.static("public")); //links static files such as css
app.use(express.urlencoded({extended: true}));
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

//mongoose and mongo routes and how to interact with db
// app.get("/add-blog", (req,res) => {
//     const blog = new Blog({
//         title: "new blog",
//         snippet: "about new blog",
//         body: "ajdlkfjalkdfjalksdj"
//     }); 

//     blog.save()
//         .then((results) => {
//             res.send(results)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// })

// app.get("/all-blogs", (req,res) => {
//     Blog.find()
//         .then((results) => {
//             res.send(results)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// })

// app.get("/single-blog", (req,res) => {
//     Blog.findById("679563ae569808dd22061efa")
        // .then((results) => {
        //     res.send(results)
        // })
        // .catch((err) => {
        //     console.log(err)
        // });
// })

app.get("/", (req,res) => {
    res.redirect("/blogs")
    // const blogs =[
    //     {title: "blog 1", snippet: "jakdjfakdjfajjfdlaajfldska"},
    //     {title: "blog 2", snippet: "jakdjfakdjfajjfdlaajfldska"},
    //     {title: "blog 3", snippet: "jakdjfakdjfajjfdlaajfldska"}
    // ]
    //res.send("<p>Home Page</p>")
    //res.sendFile("./views/index.html", {root: __dirname});
    // res.render("index", {title: "home", blogs}); //in ejs this obj is being passed into the index.ejs file
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

//blog routes

//creat blogs page
app.get("/blogs/create", (req,res) => {

    res.render("create", {title: "create blog"});
 })

app.get("/blogs", (req,res) => {
       Blog.find().sort({ createdAt: -1})
        .then((results) => {
            res.render("index", {title: "All Blogs", blogs: results})
            //res.send(results)
        })
        .catch((err) => {
            console.log(err)
        });
   
    // const blogs =[
    //     {title: "blog 1", snippet: "jakdjfakdjfajjfdlaajfldska"},
    //     {title: "blog 2", snippet: "jakdjfakdjfajjfdlaajfldska"},
    //     {title: "blog 3", snippet: "jakdjfakdjfajjfdlaajfldska"}
    // ];
    // res.render("index", {title: "home", blogs});

})

app.post("/blogs", (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((results) => {
        res.redirect("/blogs")
    })
    .catch((err) => {
        console.log(err)
    });
})

app.get("/blogs/:id", (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((results) => {
        res.render("details", {blog: results, title: "Blog Details"});
    })
    .catch((err) => {
        console.log(err)
    });
});

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs', });
    })
    .catch(err => {
      console.log(err);
    });
})


//404 page

app.use((req,res) => {
    //res.status(404).sendFile("./views/404.html", {root: __dirname})
    res.status(404).render("404", {title: "404"});
})