const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

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

module.exports = app;

