import React from 'react';
// components
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      <Register />
       {/* <Login/> */}
    </div>
  );
};

export default App;
