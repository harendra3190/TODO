const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
const todoRoutes = require('./routes/todo.routes');
app.use('/api/todos', todoRoutes);

// Connect to DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error.message);
        process.exit(1);
    }
};

app.get("/setcookie", (req, res) => {
    res.cookie("name", "user-1");
    res.send("Cookie has been set");
});

app.get("/get-cookie", (req, res) => {
    res.json(req.cookies);
});

app.use(session({
    secret:"mysecretkey",
    resave: false,
    saveUninitialized: true
}));

app.post("/login", (req, res) => {
    const { username } = req.body;
    req.session.user = username;
    res.send("User logged in");
});

app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not logged in" });
    }
    res.json(`Welcome ${req.session.user}`);
});

module.exports = app;





