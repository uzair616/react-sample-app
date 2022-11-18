import Login from './components/authentication/login';
import SignUp from './components/authentication/sign_up';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// CSS files.
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path = 'login'
          element = {
            <Login />
          }
        />
        <Route
          exact
          path = 'sign-up'
          element = {
            <SignUp />
          }
        />
        <Route
          exact
          path = '/'
          element = {
            <Home />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
