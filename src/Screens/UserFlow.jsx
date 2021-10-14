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
  let pollInterval = useRef(null);
  let pollInputRelayCount = useRef(null);

  useEffect(() => {
    const detailsStr = localStorage.getItem("IM30_Details");
    if (detailsStr) {
      const details = JSON.parse(detailsStr)
      setCart(details.Cart);
    }
    return () => {
      clearTimeout(restartTimer.current);
      clearInterval(pollInterval.current);
    };
  }, []);

  useEffect(() => {
    if (Cart.length) {
      createFlow(Cart);
    }
  }, [Cart]);

  useEffect(() => {
    handleFlow(FlowPhase);
    // eslint-disable-next-line
  }, [FlowPhase]);

  async function handleFlow(flowPhase) {
    if (flowPhase === "Entering") {
      // open barrier
      window.pay.setRelay(2, true, 250);

      pollInputRelayCount.current = 0;
      pollInterval.current = setInterval(async () => {
        pollInputRelayCount.current += 1;
        let res = await window.pay.getRelay(2);

        if (res && res.level) {
          if (res.level === "HIGH") {
            clearInterval(pollInterval.current);
            setFlowIndexActive(FlowIndexActive + 1);
            setFlowPhase("Next");
          }
        }

        console.log(pollInputRelayCount.current);
        if (pollInputRelayCount.current >= 100) {
          clearInterval(pollInterval.current);
          console.log("Interval end");
        }

      }, 200);


    }
    if (flowPhase === "Next") {
      if (FlowIndexActive >= Flow.length) {
        restartTimer.current = setTimeout(() => {
          history.push("/")
        }, 5000);
      }
    }
  }


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
            className="btn-lg payment-btn">GA BINNEN!</button>
        </> : null}

        {FlowPhase === "Entering" ? <>
          <h1>Wacht tot persoon<br />binnen is</h1>
        </> : null}

        {FlowPhase === "Next" ? <>
          <h1>TOEGANG<br /><br />SUCCESVOL</h1>
          {FlowIndexActive < Flow.length ?
            <button
              style={{ marginTop: 100 }}
              onClick={() => setFlowPhase('PrepareToEnter')}
              className="btn-lg payment-btn">VOLGENDE</button>
            :
            <button
              style={{ marginTop: 100 }}
              onClick={() => history.push("/")}
              className="btn-lg payment-btn">VOLGENDE KLANT</button>
          }
        </> : null}
      </div>


    </Screen>
  );
}

export default UserFlow;
