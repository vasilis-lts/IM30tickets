import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";

const styles = {
  PaymentFailed: {
    fontSize: 25
  },

}

function PaymentFailed() {
  const history = useHistory();

  return (
    <Screen verticalAlign="center">
      <div className="PaymentFailed flex-col ai-center" style={styles.PaymentFailed}>
        <h1 style={{ width: "70%", marginBottom: 100 }}>BETALING MISLUKT !</h1>
        <button
          style={{ width: 400 }}
          onClick={() => history.goBack()}
          className="btn-lg">Probeer het opnieuw</button>
        <button
          style={{ width: 400, marginTop: 20 }}
          onClick={() => history.push('/')}
          className="btn-lg">Afbreken</button>
      </div>
    </Screen>
  );
}

export default PaymentFailed;
