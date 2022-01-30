import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setToDoText] = useState("");
  const [incompleteToDos, setincompleteToDos] = useState([]);
  const [completeToDos, setcompleteToDos] = useState([]);

  const onChangeTodoText = (event) => setToDoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteToDos, todoText];
    setincompleteToDos(newTodos);
    setToDoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteToDos];
    newTodos.splice(index, 1);
    setincompleteToDos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteToDos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeToDos, incompleteToDos[index]];
    setincompleteToDos(newIncompleteTodos);
    setcompleteToDos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeToDos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteToDos, completeToDos[index]];
    setcompleteToDos(newCompleteTodos);
    setincompleteToDos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteToDos.length >= 5}
      />
      {incompleteToDos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までです。消化しましょう。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteToDos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeToDos} onClickBack={onClickBack} />
    </>
  );
};
