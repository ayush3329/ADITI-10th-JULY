import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
// import Services from '../pages/basic_services/Services';
import Doctors from '../pages/Doctors.jsx';
import DocDetails from '../pages/DocDetails.jsx';
import Contact from '../pages/Contact.jsx';
import AllServices from '../pages/AllServices.jsx';
import UserPage from '../../afterLogins/client/UserPage.jsx';
import ShowMyBookings from '../../afterLogins/client/ShowMybookings.jsx';
import ConfigBookings from '../../afterLogins/hospitalAdmin/ConfigBookings.jsx';
function Router() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Services" element={<AllServices/>}/>
        <Route path="/Doctors" element={<Doctors/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/DocDetails/:docId" element={<DocDetails/>}/>
        <Route path="/UserPage" element={<UserPage/>}/>
        <Route path="/ShowMyBookings" element={<ShowMyBookings/>}/>
        <Route path="/ConfigBookings" element={<ConfigBookings/>}/>
      </Routes>
  )
}
export default Router;