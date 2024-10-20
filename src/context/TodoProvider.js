import TodoContext from "./TodoContext";
import {useCallback, useReducer} from "react";
import todoReducer from "./todoReducer";
import axios from "axios";

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

    return (
        <TodoContext.Provider value={{...state, getTodos, filterTodos}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider