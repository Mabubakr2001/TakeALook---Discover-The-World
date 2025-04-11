const Button = ({text, clickingOperation}) => {
  return (
    <button onClick={clickingOperation}>{text}</button>
  )
}

export default Button