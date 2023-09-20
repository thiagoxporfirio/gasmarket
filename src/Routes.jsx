import React from 'react'
import { Routes, Route, } from 'react-router-dom'
import Home from './pages/HomePage/Home'

export default function AppRoutes(){


    return(
        <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/login' element={<RequireAuth></RequireAuth>} />
            <Route path='/cadastracliente' element={<RequireAuth></RequireAuth>} />
            <Route path='/dinied' element={<Dinied />} /> */}
        </Routes>
        
    )
}