const Widget = (props) => {
  const { children, widgetClass = "", header = "" } = props;
  return (
    <div className={"widget " + widgetClass}>
      {header && <h2>{header}</h2>}
      {children}
    </div>
  );
};

export default Widget;
