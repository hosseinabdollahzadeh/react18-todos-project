import {useContext, useEffect, useState} from "react";
import TodoContext from "../context/TodoContext";
import axios from "axios";
import {type} from "@testing-library/user-event/dist/type";

const Todos = () => {
    const {todos, getTodos, error} = useContext(TodoContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // fetch("https://jsonplaceholder.typicode.com/todos")
        //     .then(res => res.json())
        //     .then(data => {
        //         todoContext.dispatch({type:'SET_TODOS', payload: data})
        //     })

        // axios.get("https://jsonplaceholder.typicode.com/todos")
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err.message))

        // const fetchData = async () => {
        //     await getTodos()
        //     setLoading(false)
        // }
        // fetchData()

        (async () => {
                await getTodos()
                setLoading(false)
            }
        )() // ()() : first () is Anonymous functions , second () run it immediately

    }, []);
    return (
        <div className="container mt-5">
            <div className="row g-3">
                {error && <div>{error}</div>}
                {loading && <div className="col-md-12 text-center">
                    <div className="spinner-border mt-5"></div>
                </div>}
                {todos && todos.map(todo => (
                    <div className="col-md-4" key={todo.id}>
                        <div className={"card " + (todo.completed && "bg-light")}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>{todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}</div>
                                <div className="d-flex align-items-center">
                                    {todo.completed ?
                                        <i className="bi bi-check-all fs-4"></i>
                                        :
                                        <i className="bi bi-check fs-4"></i>
                                    }

                                    <i className="bi bi-trash-fill fs-6"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Todos;