import React from "react";
import { Fragment, useEffect, useState } from "react";

const ListTodos = () => {

    const [todos, setTodos] = useState([])
    // delete todo
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://0.0.0.0:8080/todos/${id}`, {
                method: "DELETE"
            })
            console.log(deleteTodo);

            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error);

        }
    }
    const getTodos = async () => {
        try {

            const response = await fetch("http://0.0.0.0:8080/todos")
            const jsonData = await response.json()

            setTodos(jsonData)

        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        getTodos();
    }, [])

    console.log(todos);

    return (
        <Fragment>
            {/*  */}
            <div>
                <h2>Todo list table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todos => (
                            <tr key={todos.todo_id}>
                                <td>{todos.describe}</td>
                                <td><button>Edit</button></td>
                                <td><button className="delete" onClick={
                                    () => deleteTodo(todos.todo_id)
                                }>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default ListTodos;