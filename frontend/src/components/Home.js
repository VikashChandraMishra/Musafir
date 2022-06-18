import React from 'react';
import Signup from './Signup';
import '../Home.css';
import Login from './Login';

const Home = () => {
  return (
    <div id='home'>
      <Login />
      <Signup />
    </div>
  )
}

export default Home;