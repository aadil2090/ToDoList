import { useDispatch, useSelector } from "react-redux"
import {
  activeToDos,
  addToDo,
  completedToDos,
  filteredToDos,
  setFilter,
  toggleToDo,
  totalToDos,
  updateToDo,
} from "./toDoSlice"
import { useState } from "react"
import { ToDoInput } from "./ToDoInput"
import { ToDoItem } from "./ToDoItem"
import { RootState } from "@/app/store"

export const ToDoList = () => {
  const dispatch = useDispatch()
  const filteredToDoList = useSelector(filteredToDos)

  const filter = useSelector((state: RootState) => state.toDoList.filter)

  const activeCount = useSelector(activeToDos)
  const completedCount = useSelector(completedToDos)
  const totalToDosCount = useSelector(totalToDos)

  const [task, setTask] = useState<string>("")
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState("")

  const handleAddToDo = () => {
    if (task.trim() === "") return
    if (isEdit) {
      dispatch(updateToDo({ id: editId, text: task }))
      setIsEdit(false)
      setEditId("")
    } else {
      dispatch(addToDo({ text: task }))
    }
    setTask("")
  }

  const handleEdit = (item: { id: string; text: string }) => {
    setTask(item.text)
    setEditId(item.id)
    setIsEdit(true)
  }

  const handleToggle = (item: {
    id: string
    text: string
    completed: boolean
  }) => {
    dispatch(toggleToDo(item))
  }

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <h1>To Do List</h1>

      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          display: "relative",
        }}
      >
        <ToDoInput
          task={task}
          setTask={setTask}
          handleAddToDo={handleAddToDo}
        />

        {/* <button
          onClick={handleAddToDo}
          style={{
            height: "38px",
            backgroundColor: "#1b1d22",
            borderRadius: "5px",
            border: "none",
          }}
        >
          {isEdit ? "Update" : "Add"}
        </button> */}
      </div>

      <div
        style={{
          width: "40%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: "20px",
        }}
      >
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`filter-button ${filter === "all" ? "active" : ""} `}
        >
          All
          <span className="count">{totalToDosCount}</span>
        </button>
        <button
          onClick={() => dispatch(setFilter("active"))}
          className={`filter-button ${filter === "active" ? "active" : ""} `}
        >
          Active
          <span className="count">{activeCount}</span>
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={`filter-button ${filter === "completed" ? "active" : ""} `}
        >
          Completed
          <span className="count">{completedCount}</span>
        </button>
      </div>

      <div
        id="toDoList"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        {filteredToDoList.map(
          (item: { id: string; text: string; completed: boolean }) => (
            <ToDoItem
              item={item}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
            />
          )
        )}
      </div>
    </div>
  )
}
