import React from 'react'
import { Routes, Route, } from 'react-router-dom'
// import { RequireAuth } from './authContext/RequireAuth'

// import Dinied from './pages/Dinied'
import Home from './pages/Home'

export default function AppRoutes(){


    return(
        <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/login' element={<RequireAuth><Login /></RequireAuth>} /> */}
            {/* <Route path='/cadastracliente' element={<RequireAuth></RequireAuth>} /> */}
            {/* <Route path='/dinied' element={<Dinied />} /> */}
        </Routes>
        
    )
}