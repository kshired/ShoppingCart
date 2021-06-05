import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import routes from './routes';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
