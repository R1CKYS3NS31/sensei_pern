const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//using midleware on cors
app.use(cors())
app.use(express.json())

//ROUTES
app.get('/', async (req, res) => {
    try {
        res.send("<h1>Welcome..</h1>")
    } catch (error) {
        console.error(error.message);
    }
})
//create a todo
app.post('/todos', async (req, res) => {
    try {
        const {
            describe
        } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (describe) VALUES($1) RETURNING *", [describe]);

        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})
//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo;")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
})
//get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1;", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})
//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            describe
        } = res.body
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2;", [describe, id])
        res.json(todo.rows[0])
        console.log(`todo: ${id} was updated`);
    } catch (error) {
        console.error(error.message);
    }
})
//delete todo
//app.delete('/todos/:id')
app.delete('/todos/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1;", [id])
        res.json(`Todo ${id} deleted successfully`)
        console.log(`Todo ${id} deleted successfully`);
    } catch (error) {
        console.error(error.message);
    }
})
const server = app.listen(8080, "0.0.0.0", () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`server is listening at http://${host}:${port}`)
})