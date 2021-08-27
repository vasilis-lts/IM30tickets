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
        <h5 style={{ width: "60%", fontSize: "36px" }}>Scan QR-code voor betaalbewijs</h5>
        <img src="qr-code.png" alt="qr" />
        <button
          style={{ width: 300, marginTop: 100 }}
          onClick={() => history.push('/user-flow')}
          className="btn-lg">Go in</button>
      </div>
    </Screen>
  );
}

export default ReceiptScreen;
