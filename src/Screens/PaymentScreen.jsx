import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleGetRelayResult, handleSetRelayResult, makeid } from "../PaymentLogic/helper";
import BASE_URL from "../apiSettings";

const PaymentScreen = ({ myRef }) => {

  const [Total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const detailsStr = localStorage.getItem("IM30_Details");
    if (detailsStr) {
      const details = JSON.parse(detailsStr)
      setTotal(details.Total);
    }

    startPayment();
    // eslint-disable-next-line
  }, []);

  function resultReceived(name, data) {
    if (data.success === 1) {
      history.push('/payment-success');
    } else {
      history.push('/payment-failed');
    }
  }

  function startPayment() {
    const details = JSON.parse(localStorage.getItem('IM30_Details'));
    const cart = details.Cart;
    const totalAmount = details.Total;
    if (cart) {
      const amount = totalAmount * 100;
      console.log("Amount Paid = " + amount);

      const transactionId = makeid(10);
      const merchantReference = makeid(15);

      console.log(BASE_URL)

      window.pay = new window.payware({
        url: BASE_URL,
        onPaymentResultReceived: resultReceived,
        onHandleSetRelayResult: handleSetRelayResult,
        onHandleGetRelayResult: handleGetRelayResult
      });

      window.pay.startPayment(amount, transactionId, merchantReference);
    } else {
      alert('Error with Cart')
    }
  };

  return (
    <Screen verticalAlign="center">
      <div className="PaymentScreen flex-col ai-center">
        <h1 style={{ letterSpacing: 10 }}>AFREKENEN</h1>
        <h2>BEDRAG</h2>
        {Total && <h2>{Total.toFixed(2).replace(".", ",")}</h2>}
        <h2 id="divCustomerDisplayMainText" style={{ display: 'none' }}> </h2>
        <h2 id="divCustomerDisplaySubText" style={{ display: 'none', margin: 0 }}> </h2>
      </div>
    </Screen>
  );
}
export default PaymentScreen;
