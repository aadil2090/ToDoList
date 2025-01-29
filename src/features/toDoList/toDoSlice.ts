import { createSlice, nanoid } from "@reduxjs/toolkit"

interface ToDoState {
  toDoList: {
    id: string
    text: string
    completed: boolean
  }[]
}

const initialState: ToDoState = {
  toDoList: [],
}

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      const todo: { id: string; text: string; completed: boolean } = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
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
  },
})

export const { addToDo, deleteToDo, updateToDo, toggleToDo } = toDoSlice.actions
export default toDoSlice.reducer
