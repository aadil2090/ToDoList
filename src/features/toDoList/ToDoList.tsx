import { RootState } from "@/app/store"
import { useDispatch, useSelector } from "react-redux"
import { addToDo, selectFilteredTodos, setFilter, toDoListType, toggleToDo, updateToDo } from "./toDoSlice"
import { useState } from "react"
import { ToDoInput } from "./ToDoInput"
import { ToDoItem } from "./ToDoItem"

export const ToDoList = () => {
  const toDoList = useSelector((state: RootState) => state.toDoList)
  const filter = useSelector((state: RootState) => state.toDoList.filter)

  const filteredTodos = useSelector(selectFilteredTodos);

  const dispatch = useDispatch()

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

        <button
          onClick={handleAddToDo}
          style={{
            height: "38px",
            backgroundColor: "#1b1d22",
            borderRadius: "5px",
            border: "none",
          }}
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => dispatch(setFilter("all"))}>All</button>
        <button onClick={() => dispatch(setFilter("active"))}>Active</button>
        <button onClick={() => dispatch(setFilter("completed"))}>Completed</button>
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
        {filteredTodos.map(
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
