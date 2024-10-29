import TodoContext from "./TodoContext";
import {useCallback, useReducer} from "react";
import todoReducer from "./todoReducer";
import axios from "axios";
import Swal from "sweetalert2";

const TodoProvider = ({children}) => {
    const initialState = {
        todos: [],
        error: null
    };
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const getTodos = useCallback(async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
            dispatch({type: "SET_TODOS", payload: res.data})
            dispatch({type: "SET_ERROR", payload: null})
        } catch (err) {
            dispatch({type: "SET_ERROR", payload: err.message})
            dispatch({type: "SET_TODOS", payload: []})
        }
    }, [])

    const filterTodos = async (count) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`)
            dispatch({type: "FILTER_TODOS", payload: res.data})
            dispatch({type: "SET_ERROR", payload: null})
        } catch (err) {
            dispatch({type: "SET_ERROR", payload: err.message})
            dispatch({type: "FILTER_TODOS", payload: []})
        }
    }
    const addTodo = async (title) => {
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
                title: title,
                completed: false
            })
            dispatch({type: "ADD_TODO", payload: res.data})
            dispatch({type: "SET_ERROR", payload: null})
            Swal.fire({
                title: "Task added",
                icon: "success",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
                toast: true,
                position: 'top',
            });
        } catch (err) {
            dispatch({type: "SET_ERROR", payload: err.message})
            dispatch({type: "ADD_TODO", payload: []})
        }
    }
    const updateTodo = async (todo) => {
        try {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                title: todo.title,
                completed: !todo.completed
            })
            dispatch({type: "UPDATE_TODO", payload: res.data})
            dispatch({type: "SET_ERROR", payload: null})
            Swal.fire({
                title: "Task updated",
                icon: "success",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
                toast: true,
                position: 'top',
            });
        } catch (err) {
            dispatch({type: "SET_ERROR", payload: err.message})
            dispatch({type: "ADD_TODO", payload: []})
        }
    }

    return (
        <TodoContext.Provider value={{...state, getTodos, filterTodos, addTodo, updateTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider