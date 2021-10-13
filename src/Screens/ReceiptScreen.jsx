import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";

const styles = {
  ReceiptScreen: {
    fontSize: 30
  },

}

function ReceiptScreen() {
  const history = useHistory();


  return (
    <Screen verticalAlign="center">
      <div className="ReceiptScreen flex-col ai-center" style={styles.ReceiptScreen}>
        <h5 className="receipt-heading" style={{ width: "60%" }}>Scan QR-code voor betaalbewijs</h5>
        <img src="qr-code.png" alt="qr" />
        <button
          onClick={() => history.push('/user-flow')}
          className="btn-lg payment-btn">Naar binnen</button>
      </div>
    </Screen>
  );
}

export default ReceiptScreen;
