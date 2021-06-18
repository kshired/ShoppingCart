import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Album from './screens/Album';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cart">
          <Header />
          <Footer />
        </Route>
        <Route path="/">
          <Album />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
