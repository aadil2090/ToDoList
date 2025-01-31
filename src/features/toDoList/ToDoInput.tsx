interface ToDoInputProps {
  task: string
  setTask: (value: string) => void
  handleAddToDo: () => void
}

export const ToDoInput = ({ task, setTask, handleAddToDo }: ToDoInputProps) => {
  return (
    <>
      <input
        type="text"
        style={{
          height: "48px",
          backgroundColor: "#111215",
          border: "none",
          borderRadius: "12px",
          marginRight: "10px",
          width: "40%",
          marginLeft: "10px",
          fontSize: "16px",
          paddingInlineStart: "10px",
          outline: "none",
        }}
        placeholder="Create new task"
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleAddToDo()
          }
        }}
      />
    </>
  )
}
