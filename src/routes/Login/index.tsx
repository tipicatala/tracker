import React, { useReducer, useState } from 'react';

import s from "./style.module.scss";

import { reducer } from "../../reducers";
import { getUser, postUser } from '../../api/user';

const Login = () => {
  const [state, dispatch] = useReducer(reducer, { id: "", isFirstTime: false });

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (event.key === "Enter") {
      const data = await getUser(value);

      if (!data) {
        const data = await postUser(value);

        dispatch({ type: "login", id: data.insertedId, isFirstTime: true })
        return;
      }

      dispatch({ type: "login", id: data._id });
    }
  }

  return (
    <div className={s.root}>
      <div className={s.title}>Enter your nickname, please</div>
      <input
        className={s.input}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default Login;
