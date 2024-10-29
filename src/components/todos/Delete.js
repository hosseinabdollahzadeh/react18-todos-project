import {useContext, useState} from "react";
import TodoContext from "../../context/TodoContext";

const DeleteTodo = ({todoId}) => {
    const [loading, setLoading] = useState(false);
    const {removeTodo} = useContext(TodoContext);
    const handleDelete = async () => {
        setLoading(true)
        await removeTodo(todoId)
    }
    return (
        <>
            <i onClick={() => handleDelete()} className="bi bi-trash-fill fs-6"></i>
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </>
    )
}

export default DeleteTodo