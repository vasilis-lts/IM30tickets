
function Screen(props) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
        alignItems: props.verticalAlign,
        background: "#fff"
      }}
      className="Screen"
    >
      {props.children}
    </div>
  );
}

export default Screen;
