const Todo = require('../models/todo.model');
const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(200).send("created successfully");
    } catch (error) {
        res.status(500).json({error: error.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTodos = async (req, res) => {
    try {
        const { id } = req.params;
        const updateTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "todo updated", updateTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "todo deleted", deletedTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTodo,
    getTodos, 
    updateTodos,
    deleteTodo
};