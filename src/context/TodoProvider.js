import TodoContext from "./TodoContext";

const TodoProvider = ({children}) => {
    return (
        <TodoContext.Provider value={"todos"}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider