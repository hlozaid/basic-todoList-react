import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4() }]);
  let [newTodo, setNewTodo] = useState("");
  let [isUpper, setIsUpper] = useState(false);

  let addNewTask = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        task: isUpper ? newTodo.toUpperCase() : newTodo,
        id: uuidv4(),
      },
    ]);
    setNewTodo("");
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
      })),
    );
  };

  let lowerCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toLowerCase(),
      })),
    );
  };

  let toggleCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const isUpperNow = todo.task === todo.task.toUpperCase();
          return {
            ...todo,
            task: isUpperNow
              ? todo.task.toLowerCase()
              : todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      }),
    );
  };

  let toggleCase = () => {
    if (isUpper) {
      lowerCaseAll();
    } else {
      upperCaseAll();
    }
    setIsUpper((prev) => !prev);
  };

  return (
    <>
      <div>
        <input
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <br />
        <button onClick={addNewTask}>Add Task</button>
        <hr />
        <h4>Task Todo</h4>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.task}</span>
              &nbsp; &nbsp; &nbsp;
              <button onClick={() => toggleCaseOne(todo.id)}>
                {todo.task === todo.task.toUpperCase()
                  ? "LowerCase"
                  : "UpperCase"}
              </button>
              &nbsp;
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={toggleCase}>
          {isUpper ? "LowerCase All" : "UpperCase All"}
        </button>
      </div>
    </>
  );
}
