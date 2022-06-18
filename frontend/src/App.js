import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AuthState from './context/AuthState';
import User from './components/User';
import Journal from './components/Journal';
import Images from './components/Images';
import About from './components/About';
function App() {
  return (
    <div>
      <AuthState>
        <Router>
          <Navbar />
          <span></span>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/user' element={<User />} />
            <Route exact path='/:username/personal' element={<User />} />
            <Route exact path='/journal' element={<Journal />} />
            <Route exact path='/images' element={<Images />} />
          </Routes>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;
