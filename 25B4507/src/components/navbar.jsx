import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaHospital,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./navbar.css";
import { useState} from "react";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Navbar() {
const [isLoggedIn, setloggedIn] = useState(() => !!localStorage.getItem("userId"))
   

  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
}


const navigate = useNavigate()

  const logout = async () => {
    try {
        await fetch("http://127.0.0.1:8000/api/logout/", {
            method: "POST",
            credentials: "include",
            headers: { "X-CSRFToken": getCookie("csrftoken") }
        })
    } catch (err) {
        console.error(err)
    }

    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    setloggedIn(false)
    setTimeout(() => {
                  navigate("/")
                },1000);
     toast.success('Logged Out Successfull')
}
   
  
   const handleAppointmentClick = (e) => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
        e.preventDefault()
        toast.error("Please login to book an appointment")
        navigate("/login")
    }
}





  return (
    <>
      {/* Top Bar */}
       <ToastContainer position="top-center" autoClose={2000} />

      <div className="topbar">
        <div className="top-item">
          <FaPhoneAlt />
          <div>
            <span>Emergency</span>
            <p>+91 9876543210</p>
          </div>
        </div>

        <div className="top-item">
          <FaClock />
          <div>
            <span>Working Hours</span>
            <p>24 Hours</p>
          </div>
        </div>

        <div className="top-item">
          <FaMapMarkerAlt />
          <div>
            <span>Location</span>
            <p>Mumbai, India</p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="logo">
          <FaHospital className="logo-icon" />

          <div className="logo-text">
            <Link to="/">City Hospital</Link>
            <p>Care You Can Trust</p>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
                      
           <li><a href="/#about">About Us</a></li>

          <li>
            <NavLink to="/doctors">Doctors</NavLink>
          </li>
          <li>
                <NavLink to="/appointments"  onClick={handleAppointmentClick}>Take Appointment</NavLink>
              </li>
      
      {isLoggedIn ? (
        <>
        <li>
                <NavLink to="/myappointments">Appointment detaiils</NavLink>
              </li>
               
         </>
      ):(
<>
</>
      )}
                 <li><a href="/#contact">Contact</a></li>
       

          {isLoggedIn ? (
            <>
        
              
              <li>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="login-btn">
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register" className="register-btn">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;