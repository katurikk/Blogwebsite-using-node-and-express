const express = require("express")
const app = express()
const Blog = require("./models/blog")

//connection with MongoDb
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/testninja")
    .then(() => console.log("your connection is successful"))
    .catch(err => console.log("your connection is lost", err))


//middle wares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.render("index.ejs", { title: "All-blogs", blogs: result })
        })
})

app.get("/about", (req, res) => {
    res.render("about.ejs", { title: "About" })
})
app.get("/blogs/create", (req, res) => {
    res.render("create.ejs", { title: "create" })
})

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        }).catch((err) => {
            console.log(err)
        })
})
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("details.ejs", { blog: result, title: "Blog-content" });
        }).catch(err => {
            console.log(err);
        });
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});


app.use((req, res) => {
    res.status(404).render("404.ejs", { title: "404" })
})
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`your port is running successfully on ${port}`)
})
