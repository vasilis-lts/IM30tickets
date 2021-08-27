import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = {
  paymentScreen: {
    fontSize: 25
  },

}

function PaymentScreen() {
  const history = useHistory();

  const [Total, setTotal] = useState(0);

  useEffect(() => {
    const detailsStr = localStorage.getItem("IM30_Details");
    if (detailsStr) {
      const details = JSON.parse(detailsStr)
      setTotal(details.Total);
    }

    setTimeout(() => {
      history.push('/payment-success')
    }, 2000);
    // eslint-disable-next-line
  }, []);

  return (
    <Screen verticalAlign="center">
      <div className="PaymentScreen flex-col ai-center" style={styles.paymentScreen}>
        <h1 style={{ letterSpacing: 10 }}>PAYMENT</h1>
        <h2>Amount</h2>
        {Total && <h2>{Total.toFixed(2).replace(".", ",")}</h2>}
        <h2>OFFER YOUR DEBIT CARD</h2>
      </div>
    </Screen>
  );
}

export default PaymentScreen;
