import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home} from './pages/home';
import SendOtp from './pages/Otp';
import Signup from './pages/sign';
import Login from './pages/login';
import ChangePassword from './pages/changpass';
import Logout from './pages/logout';
import Doctor from './pages/Doctor';
import AllAppointment from './pages/AllAppointents';
import AllAppointments from './pages/MyAppointment';
import BookAppointment from './pages/BookAppointment';
import  {Signup1}  from './pages/Signup1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SendOtp" element={<SendOtp />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signup1" element={<Signup1/>} />
        <Route path="/Login" element={< Login />} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Doctor" element={<Doctor/>} />
        <Route path="/AllAppointment" element={<AllAppointment/>} />
        <Route path="/BookAppointment/:id" element={<BookAppointment/>} />
        <Route path="/AllAppointments" element={<AllAppointments/>} />
        


        

      </Routes>
    </Router>
  );
}

export default App;
