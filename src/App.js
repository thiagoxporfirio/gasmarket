import React from 'react';
// components
import AppRoutes from './routes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
       <AppRoutes />
       <ToastContainer/>
    </div>
  );
};

export default App;
