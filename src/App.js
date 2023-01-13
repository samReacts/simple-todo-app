import "./styles.css";
import { useEffect, useState } from "react";

const getTodosFromLocal = () => {
  const todosLocal = localStorage.getItem("todos");
  if (todosLocal !== undefined) {
    return JSON.parse(todosLocal);
  }
  return null;
};
export default function App() {
  const [taskInput, setTaskInput] = useState("");
  const [toDos, setToDos] = useState(
    getTodosFromLocal() || [
      { id: Math.random(), value: "Sample To-Do", completed: false }
    ]
  );
  const [inputError, setInputError] = useState(false);

  const inputHandler = (e) => {
    handleInputError(false);
    setTaskInput(e.target.value);
  };
  const toDoHandler = (e) => {
    e.preventDefault();
    if (!taskInput.length) {
      handleInputError(true);
      return;
    }
    setToDos((prevToDos) => [
      ...prevToDos,
      { id: Math.random(), value: taskInput, completed: false }
    ]);
    setTaskInput("");
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);
  const handleDelete = (e, id) => {
    e.target.parentNode.classList.add("deleted");
    setTimeout(() => {
      setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
    }, 510);
  };
  const handleInputError = (errVal) => {
    setInputError(errVal);
  };
  const toggleTaskState = (id) => {
    setToDos((prevToDos) => {
      return prevToDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  };

  return (
    <div className="App">
      <h1>Simplest To-Do App</h1>

      <form className="inputContainer" onSubmit={toDoHandler}>
        {inputError && <small> Please type something first...</small>}
        <input
          autoFocus
          type="text"
          value={taskInput}
          placeholder="Type a task"
          onChange={inputHandler}
          style={{ borderColor: inputError ? "red" : "transparent" }}
        />
        <button type="submit">Add To-Do</button>
      </form>
      <div>
        <ul>
          {toDos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => toggleTaskState(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.value}
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(e, todo.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
