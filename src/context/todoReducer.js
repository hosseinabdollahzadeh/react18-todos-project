const todoReducer = (state, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        case "FILTER_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        case "ADD_TODO":
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default todoReducer;