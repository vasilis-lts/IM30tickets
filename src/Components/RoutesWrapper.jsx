import { Route, Switch } from 'react-router'
import WelcomeScreen from '../Screens/WelcomeScreen'

function RoutesWrapper() {

  return (
    <div id="routeContainer">
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
      </Switch>
    </div>
  )
}

export default RoutesWrapper
