import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemList from './screens/ItemList';
import Item from './screens/Item';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cart" exact={true}>
          <Header />
          <Footer />
        </Route>
        <Route path="/" exact={true} component={ItemList} />
        <Route path="/item/:id" component={Item} />
      </Switch>
    </Router>
  );
}

export default App;
