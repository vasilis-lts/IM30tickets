import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const styles = {
  UserFlow: {
    fontSize: 25
  }
}

function UserFlow() {
  const history = useHistory();

  const [Flow, setFlow] = useState([]);
  const [Cart, setCart] = useState([]);
  const [FlowIndexActive, setFlowIndexActive] = useState(0);
  const [FlowPhase, setFlowPhase] = useState("PrepareToEnter"); // PrepareToEnter | Entering | Next

  let restartTimer = useRef(null);

  useEffect(() => {
    const detailsStr = localStorage.getItem("IM30_Details");
    if (detailsStr) {
      const details = JSON.parse(detailsStr)
      setCart(details.Cart);
    }
    return () => {
      clearTimeout(restartTimer.current);
    };
  }, []);

  useEffect(() => {
    if (Cart.length) {
      createFlow(Cart);
    }
  }, [Cart]);

  useEffect(() => {
    if (FlowPhase === "Entering") {
      setTimeout(() => {
        setFlowIndexActive(FlowIndexActive + 1);
        setFlowPhase("Next");
      }, 2000);
    }
    if (FlowPhase === "Next") {
      if (FlowIndexActive >= Flow.length) {
        restartTimer.current = setTimeout(() => {
          history.push("/")
        }, 5000);
      }
    }
    // eslint-disable-next-line
  }, [FlowPhase]);

  function createFlow(Cart) {
    const _Cart = [...Cart]
    const cartSorted = _Cart.sort(function (a, b) {
      return a.priority - b.priority;
    });

    const flow = [];
    cartSorted.forEach(item => {
      for (let i = 0; i < item.Amount; i++) {
        if (item.Amount > 1) {
          const _item = JSON.parse(JSON.stringify(item));
          _item.index = i + 1;
          flow.push(_item);
        } else {
          flow.push(item);
        }
      }
    });

    setFlow(flow);
  }

  return (
    <Screen verticalAlign="center">

      <div className="UserFlow flex-col ai-center" style={styles.UserFlow}>
        {FlowPhase === "PrepareToEnter" ? <>
          <h1 style={{ width: "70%" }}>TOEGANG</h1>
          {Flow.length ? <h1>{Flow[FlowIndexActive].title} {Flow[FlowIndexActive].index ? Flow[FlowIndexActive].index : ''}</h1> : null}
          <button
            style={{ width: 300, marginTop: 100 }}
            onClick={() => setFlowPhase('Entering')}
            className="btn-lg">GA BINNEN!</button>
        </> : null}

        {FlowPhase === "Entering" ? <>
          <h1>Wacht tot persoon<br />binnen is</h1>
        </> : null}

        {FlowPhase === "Next" ? <>
          <h1>TOEGANG<br /><br />SUCCESVOL</h1>
          {FlowIndexActive < Flow.length ?
            <button
              style={{ width: 400, marginTop: 100 }}
              onClick={() => setFlowPhase('PrepareToEnter')}
              className="btn-lg">VOLGENDE</button>
            :
            <button
              style={{ width: 400, marginTop: 100 }}
              onClick={() => history.push("/")}
              className="btn-lg">VOLGENDE KLANT</button>
          }
        </> : null}
      </div>


    </Screen>
  );
}

export default UserFlow;
