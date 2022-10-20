import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./style.module.scss";

import { useUserStore } from "../../stores/userStore";
import { getUser, postUser } from "../../api/user";

const Login = () => {
  const navigate = useNavigate();
  const setIsFirstTime = useUserStore((state) => state.setIsFirstTime);
  const setId = useUserStore((state) => state.setId);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (event.key === "Enter") {
      const data = await getUser(value);

      if (!data) {
        const data = await postUser(value);

        setIsFirstTime(true);
        setId(data.insertedId);

        navigate("/initial");
        return;
      }
      setId(data.insertedId);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.title}>Enter your nickname, please</div>
      <input className={s.input} onKeyDown={handleKeyDown}></input>
    </div>
  );
};

export default Login;
