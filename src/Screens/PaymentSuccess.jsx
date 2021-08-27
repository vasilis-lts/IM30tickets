import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";

const styles = {
  PaymentSuccessScreen: {
    fontSize: 25
  },

}

function PaymentSuccessScreen() {
  const history = useHistory();

  return (
    <Screen verticalAlign="center">
      <div className="PaymentSuccessScreen flex-col ai-center" style={styles.PaymentSuccessScreen}>
        <h1 style={{ width: "70%", marginBottom: 100 }}>PAYMENT SUCCESSFUL!</h1>
        <button
          style={{ width: 300 }}
          onClick={() => history.push('/user-flow')}
          className="btn-lg">Go in</button>
        <button
          style={{ width: 300, marginTop: 20 }}
          onClick={() => history.push('/receipt')}
          className="btn-lg">Receipt</button>
      </div>
    </Screen>
  );
}

export default PaymentSuccessScreen;
