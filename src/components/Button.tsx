import s from "./style.module.scss";

const Button = ({ text, handleClick }: { text: string, handleClick?: () => {} }) => {
  return (
    <div className={s.root} onClick={handleClick}>
      {text}
    </div>
  )
}

export default Button;