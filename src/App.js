import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SingUp from './components/SingUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './cotext/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/singup' component={SingUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
