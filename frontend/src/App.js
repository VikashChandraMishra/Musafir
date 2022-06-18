import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AuthState from './context/AuthState';

function App() {
  return (
    <div>
      <AuthState>
        <Router>
          <Navbar />
          <span></span>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;
