import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AuthState from './context/AuthState';
import Personal from './components/Personal';
import Journal from './components/Journal';
import Images from './components/Images';
import About from './components/About';
import LogState from './context/LogState';

function App() {
  return (
    <div>
      <AuthState>
        <LogState>
          <Router>
            <Navbar />
            <div style={{ height: "60px" }}></div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              {/* <Route exact path='/user' element={<User />} /> */}
              <Route exact path='/:username/personal' element={<Personal />} />
              <Route exact path='/:username/journal' element={<Journal />} />
              <Route exact path='/:username/images' element={<Images />} />
            </Routes>
          </Router>
        </LogState>
      </AuthState>
    </div>
  );
}

export default App;
