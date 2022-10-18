import React, { useReducer, useState } from 'react';

import s from "./style.module.scss";

import { reducer } from "../../reducers";
import { getUser, postUser } from '../../api/dbRequests';

const Login = () => {
  const [isShown, setIsShown] = useState(true);

  const [state, dispatch] = useReducer(reducer, { id: "" });

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (event.key === "Enter") {
      const data = await getUser(value);

      if (!data) {
        const data = await postUser(value);

        dispatch({ type: "login", id: data.insertedId })
        setIsShown(false);
        return;
      }

      setIsShown(false);
      dispatch({ type: "login", id: data._id })
    }
  }

  return isShown ? (
    <div className={s.root}>
      <div className={s.title}>Enter your nickname, please</div>
      <input
        className={s.input}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  ): <></>;
};

export default Login;
