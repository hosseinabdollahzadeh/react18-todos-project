import {useContext} from "react";
import TodoContext from "../context/TodoContext";

const Todos = () => {
    const todoContext = useContext(TodoContext)
    return (
        <div className="container mt-5">
            <h1>Todos page - {todoContext}</h1>
        </div>
    )
}

export default Todos;