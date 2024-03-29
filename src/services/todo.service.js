// Xu ly business logic
const TodoService = require("../services/todo.service");
const TodoController = {};

TodoController.getAllTodos = async (req, res) => {
  try {
    const todos = await TodoService.getAllTodos();
    res.status(200).json({
      todos: todos,
    });
  } catch (error) {
    res.status(400);
  }
};

export default TodoController;
