import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './screens/ItemList';
import Item from './screens/Item';
import SignIn from './screens/SignIn';
import { CssBaseline } from '@material-ui/core';
import SignUp from './screens/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cart" exact={true}>
          <React.Fragment>
            <CssBaseline />
            <Header />
            <Footer />
          </React.Fragment>
        </Route>
        <Route path="/" exact={true} component={ItemList} />
        <Route path="/item/:id" component={Item} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
