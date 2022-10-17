import s from "./style.module.scss";

const Login = () => {
  return (
    <div className={s.root}>
      <div className={s.title}>Enter your name, please</div>
      <input
        className={s.input}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await fetch(
              `${import.meta.env.VITE_URL}:${
                import.meta.env.VITE_PORT
              }/user/add`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ name:  (event.target as HTMLInputElement).value }),
              }
            );
          }
        }}
      ></input>
    </div>
  );
};

export default Login;
