
function Screen(props) {
  return (
    <div
      style={{
        display: "flex",
        height: "1280px",
        width: "720px",
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
