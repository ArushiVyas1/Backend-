const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride=require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "av",
        content: "chilling!!"
    },
    {
        id: uuidv4(),
        username: "cats",
        content: "meowing!!"
    },
    {
        id: uuidv4(),
        username: "dogs",
        content: "barking!!"
    }
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});


// app.get("/posts/:id", (req, res) => {
//     let { id } = req.params;
//     let post = posts.find((p) => id === p.id);
//     // console.log(post);
//     //   res.send("request working");
//     res.render("show.ejs", { post,username,content,id });

// });
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.send("Post not found");
    }
    res.render("show.ejs", { post });
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;

   
    // res.send("patch request working");
        res.redirect("/posts");

});

app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);

    if (!post) {
        return res.send("Post not found");  // avoid crashing
    }
console.log(post);
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;

    // reassign posts with filtered array
    posts = posts.filter((p) => p.id !== id);

    res.redirect("/posts");
});
