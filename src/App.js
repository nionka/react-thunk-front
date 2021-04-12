import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import ServiceEdit from './components/ServiceEdit/ServiceEdit';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/services/:id" component={ServiceEdit} />
          <Route path="/services" component={HomePage} />
          <Redirect from="/" to="/services" />
        </Switch>
      </div>  
    </Router>
  );
}

export default App;
