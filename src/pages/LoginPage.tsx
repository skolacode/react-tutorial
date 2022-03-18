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

  h2 {
    margin-bottom: 30px;
    color: #000000;
    text-align: center;
  }

  p {
    padding-bottom: 10px;
    color: #000000;
    font-weight: bold;
    font-size: 12px;
  }

  input {
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #333333;
    padding: 15px;
    color: #333333;
    outline: none;
    font-size: 14px;
  }

  .button {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    padding: 15px 0px;
    color: #ffffff;
    background-color: #000000;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      opacity: 0.85;
    }
  }
`;

const LoginPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  const onClickLogin = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      window.sessionStorage.setItem("username", username);
      navigate("/todo");
    }
  };

  return (
    <Container>
      <h2>React Todo Login</h2>

      <div>
        <p>Username</p>
        <input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          onKeyDown={onKeyDown}
        />
      </div>

      <div>
        <p>Password</p>
        <input
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={onKeyDown}
          placeholder="Password"
          type="password"
        />
      </div>

      <div className="button" onClick={onClickLogin}>
        Login
      </div>
    </Container>
  );
};

export default LoginPage;
