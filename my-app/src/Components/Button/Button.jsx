const Button = (props) => {
  const {
    type = "submit",
    click,
    value = "submit",
    children = "",
    btnClass = "",
  } = props;
  return (
    <button type={type} onClick={click} className={"common-button " + btnClass}>
      <span>{value}</span>
      {children}
    </button>
  );
};

export default Button;
