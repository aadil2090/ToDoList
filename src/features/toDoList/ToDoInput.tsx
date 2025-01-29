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
          height: "34px",
          backgroundColor: "#15161bcc",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
          width: "24%",
        }}
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
