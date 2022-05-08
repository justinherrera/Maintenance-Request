
import React from 'react'
import AdminPage from '../components/AdminPage'
import DashboardPage from '../components/DashboardPage'
import RequestFormPage from '../components/RequestFormPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <AdminPage /> } />
            {/* <Route path="/admin" element={ <AdminPage /> } /> */}
            <Route path="/dashboard" element={ <DashboardPage /> } />
            <Route path="/request" element={ <RequestFormPage /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
