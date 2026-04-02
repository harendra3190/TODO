const validateTodo = (req, res, next) => {
    const {title, description} = req.body;
    if(!title || !description) {
        res.status(400).json({message : "missing details"});
    }
    next();
};

module.exports = {
    validateTodo
};