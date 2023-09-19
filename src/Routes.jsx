import React from 'react'
import { Routes, Route, } from 'react-router-dom'
import { RequireAuth } from './authContext/RequireAuth'
import { Dinied } from './pages/Dinied'
import Home from './pages/HomePage'
import { Products } from './pages/Products'
import Login from './pages/Login'

export default function AppRoutes(){


    return(
        <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/wellcome' element={<RequireAuth><WellcomeUser /></RequireAuth>} /> */}
            <Route path='/login' element={<RequireAuth><Login /></RequireAuth>} />
            <Route path='/cadastracliente' element={<RequireAuth><Products /></RequireAuth>} />
            <Route path='/dinied' element={<Dinied />} />
        </Routes>
        
    )
}