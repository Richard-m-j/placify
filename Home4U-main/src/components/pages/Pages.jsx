
import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from '../home/Home'
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import Login from "../login/login"
import AddListing from "../add_listing/add_listing"

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-listing" element={<AddListing />} />

          <Route exact path='/services' element={<Services />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/pricing' element={<Pricing />} />
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>

    </>
  );
};

export default Pages;
