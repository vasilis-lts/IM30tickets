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
        <h1 style={{ width: "70%", marginBottom: 100 }}>BETALING GESLAAGD !</h1>
        <button
          style={{ width: 400 }}
          onClick={() => history.push('/user-flow')}
          className="btn-lg">Naar binnen</button>
        <button
          style={{ width: 400, marginTop: 20 }}
          onClick={() => history.push('/receipt')}
          className="btn-lg">Betaalbewijs</button>
      </div>
    </Screen>
  );
}

export default PaymentSuccessScreen;
