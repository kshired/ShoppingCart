import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './screens/Chat';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <Switch>
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
