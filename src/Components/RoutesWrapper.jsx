import { Route, Switch } from 'react-router'
import BookingScreen from '../Screens/BookingScreen'
import PaymentScreen from '../Screens/PaymentScreen'
import PaymentSuccessScreen from '../Screens/PaymentSuccess'
import ReceiptScreen from '../Screens/ReceiptScreen'
import UserFlow from '../Screens/UserFlow'
import WelcomeScreen from '../Screens/WelcomeScreen'

function RoutesWrapper() {

  return (
    <div id="routeContainer">
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/booking" component={BookingScreen} />
        <Route exact path="/payment" component={PaymentScreen} />
        <Route exact path="/payment-success" component={PaymentSuccessScreen} />
        <Route exact path="/receipt" component={ReceiptScreen} />
        <Route exact path="/user-flow" component={UserFlow} />
      </Switch>
    </div>
  )
}

export default RoutesWrapper
