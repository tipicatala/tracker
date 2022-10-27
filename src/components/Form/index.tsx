import s from "./style.module.scss";

interface IProps {
  title: string,
  renderButton: () => React.ReactNode
  renderRows: () => React.ReactNode
}

function Form({ title, renderButton, renderRows }: IProps) {
  return (
    <div className={s.root}>
    <div className={s.card}>
      <div className={s.title}>
        <div>{title}</div>
      </div>
      {renderRows()}
      <div className={s.button}>
        {renderButton()}
      </div>
    </div>
  </div>
  )
}

export default Form;