import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Screen from "../Components/Screen";

const styles = {
  bookingCtrlElem: {
    flex: 1,
    margin: 2
  },
  bookingCtrlBtn: {
    fontSize: "5rem",
    fontWeight: 700,
    border: "7px solid rgb(34, 34, 34)",
    padding: "0px 15px",
    width: 100,
    margin: 2,
  },
  bookingCtrlLabel: {
    fontSize: "3rem",
    border: "7px solid rgb(34, 34, 34)",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: 2,
    flex: 1
  },

}

function BookingScreen() {
  const history = useHistory();

  const jsonTickets = [
    { id: 1, title: "Adult", priority: 3, price: 4 },
    { id: 2, title: "Child 12-17yr", priority: 2, price: 3 },
    { id: 3, title: "Child 0-11yr", priority: 1, price: 2.5 },
  ];

  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    console.log(Cart);
    calculateTotal(Cart)
  }, [Cart]);

  function calculateTotal(Cart) {
    const _Cart = [...Cart];
    let total = 0;

    _Cart.forEach(item => {
      const totalPerItem = item.Amount * item.price;
      total = total + totalPerItem;
    });

    console.log(total);
    setTotal(total);
  }

  function handleCartChange(entry, action) {
    const _Cart = [...Cart];

    if (action === "increment") {
      // if cart has this item increase its amount else add the item in the cart
      if (_Cart.find(item => item.id === entry.id)) {
        const itemToIncrement = _Cart.find(item => item.id === entry.id)
        itemToIncrement.Amount = itemToIncrement.Amount + 1;
      } else {
        entry.Amount = 1;
        _Cart.push(entry);
      }
    }
    else if (action === "decrement") {
      if (_Cart.find(item => item.id === entry.id)) {
        const itemToDecrement = _Cart.find(item => item.id === entry.id);
        // if cart has this item increase its amount else remove the item
        if (itemToDecrement.Amount > 1) {
          const itemToDecrement = _Cart.find(item => item.id === entry.id);
          itemToDecrement.Amount = itemToDecrement.Amount - 1;
        } else {
          const itemToDecrementIndex = _Cart.findIndex(item => item.id === entry.id);
          _Cart.splice(itemToDecrementIndex, 1);
        }
      }
    }
    setCart(_Cart);
  }

  function handleCheckout() {
    const details = { Cart, Total }
    localStorage.setItem("IM30_Details", JSON.stringify(details));
    history.push({ pathname: `/payment`, state: { Cart, Total } })
  }

  return (
    <Screen verticalAlign="flex-start">
      <div id="bookingScreen" style={{ width: "100%", height: "100%" }} className="flex-col">

        <div id="bookingControls">
          {jsonTickets.map(entry => {
            return (
              <div key={entry.id} className="booking-ctrl-elem flex" style={styles.bookingCtrlElem}>
                <button style={styles.bookingCtrlBtn} onClick={() => handleCartChange(entry, "decrement")}>-</button>
                <div className="booking-elem-label" style={styles.bookingCtrlLabel}>
                  {entry.title}
                </div>
                <button style={styles.bookingCtrlBtn} onClick={() => handleCartChange(entry, "increment")}>+</button>
              </div>
            )
          })}
        </div>

        {Cart.length ?
          <div id="cartContents">
            <div id="cartItems">
              {Cart.map((cItem, index) => {
                return (
                  <div key={index} className="cart-item flex">
                    <div className="cart-item-title" style={{ flex: 1, textAlign: "left" }}>{cItem.title}</div>
                    <div className="cart-item-details">{`${cItem.Amount} x ${cItem.price.toFixed(2).replace(".", ",")} = ${(cItem.Amount * cItem.price).toFixed(2).replace(".", ",")}`}</div>
                  </div>
                )
              })}
            </div>
            <div id="cartTotal" className="flex">
              <div style={{ flex: 1, textAlign: "right" }}>Total €</div>
              <div style={{ width: 200, textAlign: "right" }}>{Total.toFixed(2).replace(".", ",")}</div>
            </div>
          </div>
          : null}

        {Cart.length ?
          <div id="cartCheckout">
            <button
              onClick={() => handleCheckout()}
              className="btn-lg">Checkout</button>
          </div>
          : null}

      </div>
    </Screen>
  );
}

export default BookingScreen;
