import { configureStore } from "@reduxjs/toolkit"
import toDoSlice from "./../features/toDoList/toDoSlice"

export const store = configureStore({
  reducer: {
    toDoList: toDoSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
