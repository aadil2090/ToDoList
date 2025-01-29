import { useDispatch } from "react-redux"
import { deleteToDo } from "./toDoSlice"

interface ToDoItemProps {
  item: {
    id: string
    text: string
    completed: boolean
  }
  handleToggle: (item: { id: string; text: string; completed: boolean }) => void
  handleEdit: (item: { id: string; text: string }) => void
}

export const ToDoItem = ({ item, handleToggle, handleEdit }: ToDoItemProps) => {
  const dispatch = useDispatch()

  return (
    <div
      style={{
        marginBottom: "8px",
        backgroundColor: "#1b1d22",
        border: "1px solid #ccc",
        padding: "6px",
        width: "30%",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => handleToggle(item)}
        style={{ outline: "none" }}
      />
      <div
        style={{
          paddingLeft: "10px",
          textDecoration: item.completed ? "line-through" : "none",
          color: item.completed ? "gray" : "white",
        }}
      >
        {item.text}
      </div>
      <div>
        <button onClick={() => handleEdit(item)}>Edit</button>
        <button onClick={() => dispatch(deleteToDo(item))}>X</button>
      </div>
    </div>
  )
}
