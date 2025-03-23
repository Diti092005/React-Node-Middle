const Todos = require("../models/Todos")

const getAllTodus = async (req, res) => {
    const todos = await Todos.find().lean()
    res.json(todos)
}

const getTodosById = async (req, res) => {
    const { id } = req.params
    const todos = await Todos.find().lean()
    if (!todos?.length)
        return res.status(400).send("There are no todos!!!")
    if (id == null)
        return res.status(400).send("Id is required")
    const todo = await Todos.findById(id).lean()
    if (!todo)
        return res.status(400).send("This todo isn't exists")
    res.json(todo)
}

const addTodo = async (req, res) => {
    const { tags, completed, title } = req.body
    if (!title)
        return res.status(400).send("Missing required field")
    const todo = await Todos.create({ title, tags, completed })
    res.json(todo)
}

const deleteTodoById = async (req, res) => {
    const { id } = req.params
    if (id == null)
        return res.status(400).send("Id is required")
    const todo = await Todos.findById(id).exec()
    if (!todo)
        return res.status(400).send("This todo isn't exists")
    const deletedtodo = await todo.deleteOne()
    res.json(deletedtodo)
}

const updateTodoById = async (req, res) => {
    const { _id, title, tags } = req.body
    if (_id == null)
        return res.status(400).send("Id is required")
    const todo = await Todos.findById(_id).exec()
    if (!todo)
        return res.status(400).send("This todo isn't exists")
    todo.completed = !todo.completed
    if (title)
        todo.title = title
    if (tags)
        todo.tags = tags
    const updatetodo=await todo.save()
    res.json(updatetodo)
}
module.exports = { getAllTodus, getTodosById, updateTodoById, deleteTodoById, addTodo }



