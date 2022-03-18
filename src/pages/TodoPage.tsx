import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px #00000029;
  margin: auto;
  margin-top: 50px;
  max-width: 448px;
  width: 100%;
  padding: 30px;
  border: 1px solid #000000;

  h3 {
    margin-bottom: 15px;
  }

  .new-todo-input {
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #333333;
    padding: 15px;
    color: #333333;
    outline: none;
    font-size: 14px;
  }

  .checkbox-input {
    width: 30px;
    height: 30px;
  }

  .add-button {
    background-color: #000000;
    color: #ffffff;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;
    margin-left: 10px;

    :hover {
      opacity: 0.85;
    }
  }

  .delete-button {
    font-size: 12px;
    text-decoration: underline;
    color: red;
    cursor: pointer;

    :hover {
      opacity: 0.85;
    }
  }

  .logout-button {
    font-size: 12px;
    text-decoration: underline;
    color: #000000;
    cursor: pointer;

    :hover {
      opacity: 0.85;
    }
  }
`;

interface ITodo {
  id: number;
  title: string;
}

const TodoPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const username = window.sessionStorage.getItem("username") || "";

  const [activeList, setActiveList] = useState<ITodo[]>([]);
  const [completedList, setCompletedList] = useState<ITodo[]>([]);

  const [newTodo, setNewTodo] = useState<string>("");

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTodo(value);
  };

  const addNewTodo = () => {
    const id = activeList.length + completedList.length + 1;
    activeList.push({
      id,
      title: newTodo,
    });

    if (newTodo.trim() !== "") {
      setNewTodo("");
      setActiveList([...activeList]);
    }
  };

  const onClickAdd = () => {
    addNewTodo();
  };

  const handleNewTodoKeyPressDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      addNewTodo();
    }
  };

  const onTodoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { checked } = e.target;

    if (checked) {
      completedList.unshift(activeList[index]);
      setCompletedList([...completedList]);

      activeList.splice(index, 1);
      setActiveList([...activeList]);
    } else {
      activeList.push(completedList[index]);
      setActiveList([...activeList]);

      completedList.splice(index, 1);
      setCompletedList([...completedList]);
    }
  };

  const onClickDelete = (index: number) => {
    activeList.splice(index, 1);
    setActiveList([...activeList]);
  };

  const onClickLogout = () => {
    navigate("/");
  };

  const renderList = (todo: ITodo, i: number, hasCompleted = false) => (
    <div
      key={todo.id}
      style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
    >
      <div>
        <input
          type="checkbox"
          onChange={(e) => onTodoChange(e, i)}
          checked={hasCompleted}
          className="checkbox-input"
        />
      </div>

      <div style={{ paddingLeft: 20, flex: 1 }}>
        <p>
          <strong>{todo.title}</strong>
        </p>
      </div>

      {!hasCompleted && (
        <div>
          <div className="delete-button" onClick={() => onClickDelete(i)}>
            Delete
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Container>
      <div style={{ display: "flex", marginBottom: 30 }}>
        <div style={{ flex: 1 }}>
          <h2>Hi {username}!</h2>
        </div>
        <div>
          <div className="logout-button" onClick={onClickLogout}>
            Logout
          </div>
        </div>
      </div>

      <h3>New Todo</h3>

      <div style={{ display: "flex", marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <input
            className="new-todo-input"
            value={newTodo}
            onChange={handleNewTodoChange}
            onKeyDown={handleNewTodoKeyPressDown}
            placeholder="e.g Do laundry"
          />
        </div>
        <div>
          <div className="add-button" onClick={onClickAdd}>
            Add
          </div>
        </div>
      </div>

      <h3>My Todos</h3>

      {activeList.length + completedList.length === 0 ? (
        <p>Yeay, you are free today!</p>
      ) : (
        <>
          {activeList.map((each, i) => renderList(each, i))}
          {completedList.map((each, i) => renderList(each, i, true))}
        </>
      )}
    </Container>
  );
};

export default TodoPage;
