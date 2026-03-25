const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();
const Todo = require("./models/Todo");
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ROUTES

// Home - show all todos
app.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.render("index", { todos });
});

// Create form
app.get("/new", (req, res) => {
    res.render("new");
});

// Add todo
app.post("/todos", async (req, res) => {
    const { title, description } = req.body;
    await Todo.create({ title, description });
    res.redirect("/");
});

// Edit form
app.get("/todos/:id/edit", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.render("edit", { todo });
});

// Update todo
app.put("/todos/:id", async (req, res) => {
    const { title, description, completed } = req.body;

    await Todo.findByIdAndUpdate(req.params.id, {
        title,
        description,
        completed: completed === "on"
    });

    res.redirect("/");
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});