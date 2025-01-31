import { useDispatch } from "react-redux"
import { deleteToDo } from "./toDoSlice"
import { DeleteIcon, EditIcon } from "./../../assets/Icons"

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
        paddingLeft: "10px",
        paddingRight: "10px",
        width: "40%",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => handleToggle(item)}
          style={{
            outline: "none",
            border: "none",
            height: "16px",
            width: "16px",
            cursor: "pointer",
          }}
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
      </div>
      <div>
        <button style={{ border: "none" }} onClick={() => handleEdit(item)}>
          <EditIcon />
        </button>
        <button
          style={{ border: "none" }}
          onClick={() => dispatch(deleteToDo(item))}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  )
}
