import s from "./style.module.scss";

const Login = () => {
  return (
    <div className={s.root}>
      <div className={s.title}>Enter your name, please</div>
      <input className={s.input}></input>
    </div>
  );
};

export default Login;
