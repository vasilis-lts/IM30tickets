import Screen from "../Components/Screen";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeid } from "../PaymentLogic/helper";

const styles = {
  paymentScreen: {
    fontSize: 25,
    marginTop: 400
  },

}

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
    if (cart) {
      // set amount 1 (success) or 2 (failure) for now. 
      // 2 happens when you select a 0-11jr ticket only
      const cartAmount = cart.length === 1 && cart[0].id === 3 ? 2 : 1;
      const amount = cartAmount;
      console.log("Amount Paid = " + amount);

      const transactionId = makeid(10);
      const merchantReference = makeid(15);

      let pay = new window.payware({
        url: "http://localhost:5000/api/kimono/",
        onPaymentResultReceived: resultReceived
      });

      window.pay = pay;
      pay.startPayment(amount, transactionId, merchantReference);
    } else {
      alert('Error with Cart')
    }
  };

  return (
    <Screen verticalAlign="flex-start">
      <div className="PaymentScreen flex-col ai-center" style={styles.paymentScreen}>
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
