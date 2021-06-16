import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Items from './screens/Items';
import Cart from './screens/Cart';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
        <Route path="/">
          <Items></Items>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
