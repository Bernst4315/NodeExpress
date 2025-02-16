const Blog = require("../models/blog");

const blog_index = (req,res) => {
    Blog.find().sort({ createdAt: -1})
    .then((results) => {
        res.render("blogs/index", {title: "All Blogs", blogs: results})
        //res.send(results)
    })
    .catch((err) => {
        console.log(err)
    });

}

const blog_details = (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((results) => {
        res.render("blogs/details", {blog: results, title: "Blog Details"});
    })
    .catch((err) => {
        res.status("404").render("404", {title: "blog not found"});
    });
}

const blog_create_get = (req,res) => {
    res.render("blogs/create", {title: "create blog"});
}

const blog_create_post = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((results) => {
        res.redirect("/blogs")
    })
    .catch((err) => {
        console.log(err)
    });
}

const blog_delete = (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs', });
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports ={ 
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}