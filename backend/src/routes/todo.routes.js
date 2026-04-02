const express = require('express');

const router = express.Router();
const { getTodos, createTodo, updateTodos, deleteTodo} = require('../controllers/todo.controller');
const { validateTodo } = require('../middleware/validateTodo.middleware');

router.get('/', getTodos);
router.post('/', validateTodo, createTodo);
router.put('/:id', updateTodos);
router.delete('/:id', deleteTodo);

module.exports = router;