import { RootState } from "@/app/store"
import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit"

type filter = "all" | "active" | "completed"

export interface toDoListType {
  id: string
  text: string
  completed: boolean
}

interface ToDoState {
  toDoList: toDoListType[]
  filter: filter
}

const initialState: ToDoState = {
  toDoList: [],
  filter: "all",
}

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      const todo: {
        id: string
        text: string
        completed: boolean
        filter: filter
      } = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
        filter: "all",
      }
      state.toDoList.push(todo)
    },
    deleteToDo: (state, action) => {
      state.toDoList = state.toDoList.filter(
        item => item.id !== action.payload.id
      )
    },
    updateToDo: (state, action) => {
      const { id, text } = action.payload
      const toDo = state.toDoList.find(item => item.id === id)
      if (toDo) {
        toDo.text = text
      }
    },
    toggleToDo: (state, action) => {
      const { id } = action.payload
      const toDo = state.toDoList.find(item => item.id === id)
      if (toDo) {
        toDo.completed = !toDo.completed
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

const toDosList = (state: RootState) => state.toDoList.toDoList
export const filter = (state: RootState) => state.toDoList.filter

export const totalToDos = (state: RootState) => state.toDoList.toDoList.length
export const completedToDos = (state: RootState) =>
  state.toDoList.toDoList.filter(item => item.completed).length
export const activeToDos = (state: RootState) =>
  state.toDoList.toDoList.filter(item => !item.completed).length

export const filteredToDos = createSelector(
  [toDosList, filter],
  (todos, filter) => {
    switch (filter) {
      case "completed":
        return todos.filter(item => item.completed)
      case "active":
        return todos.filter(item => !item.completed)
      default:
        return todos
    }
  }
)

export const { addToDo, deleteToDo, updateToDo, toggleToDo, setFilter } =
  toDoSlice.actions
export default toDoSlice.reducer
