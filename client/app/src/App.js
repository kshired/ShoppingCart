import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemList from './screens/ItemList';
import Item from './screens/Item';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import CartList from './screens/CartList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cart" exact={true} component={CartList} />
        <Route path="/" exact={true} component={ItemList} />
        <Route path="/item/:id" component={Item} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
