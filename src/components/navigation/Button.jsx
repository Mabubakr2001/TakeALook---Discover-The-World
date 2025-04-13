const Button = ({text, type, clickingOperation}) => {
  return (
    <button onClick={clickingOperation} className={type}>{text}</button>
  )
}

export default Button