import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Booking from './pages/Booking'

export default function App() {
  return (
    <BrowserRouter className="text-3xl font-bold underline">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/booking" element={<Booking/>} />
      </Routes>
    </BrowserRouter>
  )
}
