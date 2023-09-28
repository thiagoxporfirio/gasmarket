import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./AuthContext/privateRoute"

import Home from "./pages/Home";
import { Clients } from "./pages/Clients";
import { UserNotExists } from "./pages/Dinied";
import RegisterClients from "./pages/RegisterClient";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cliente" element={<PrivateRoute><Clients /></PrivateRoute>} />
        <Route path="/registerclients" element={<PrivateRoute><RegisterClients /></PrivateRoute>} />
        <Route path="/dinied" element={<UserNotExists />} />
      </Routes>
    </BrowserRouter>
  );
}
