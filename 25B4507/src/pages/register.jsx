import { useState } from "react"
import Navbar from "../components/navbar"
import "./login.css"
import { FaUser, FaPhoneAlt, FaLock, FaUserCheck } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { CiCalendarDate } from "react-icons/ci"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from "../config"


function Register(){
    const [form,setForm] = useState({
        username:"",
        email:"",
        phone:"",
        dob:"",
        password:"",
        confirmPassword:""
    })

    const navigate = useNavigate()
    const[loading,setloading]=useState(false)

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(";").shift()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true);

        if (form.password !== form.confirmPassword) {
            toast.error('Password and confirm password do not match')
            return
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/register/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken")
                },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    phone: form.phone,
                    dob: form.dob,
                    password: form.password
                })
            })

            const data = await res.json()

            if (res.status === 201) {
                toast.success(data.message || 'You have successfully registered')
                setForm({
                    username:"",
                    email:"",
                    phone:"",
                    dob:"",
                    password:"",
                    confirmPassword:""
                });
                setTimeout(() => {
                  navigate("/login")
                },2000);
            } 
            else {
                toast.error(data.message || 'Something went wrong')
            }
        } catch (err) {
            console.error(err)
            toast.error("Network error. Please try again.")
        }
        finally{
          setloading(false)
        }
    }

    return(
<>
 <Navbar/>
 <ToastContainer position="top-center" autoClose={2000} />
 <section className="login-section">
   <form className="login-card" onSubmit={handleSubmit}>
     <h2>Create Account</h2>
     <p className="login-sub">Register to continue to City Hospital</p>

     <label className="form-label"><FaUser className="me-1"/> Username</label>
     <input
       type="text"
       name="username"
       placeholder="Username"
       value={form.username}
       onChange={handleChange}
       required
     />

     <label className="form-label"><MdEmail className="me-1"/> Email</label>
     <input
       type="email"
       name="email"
       placeholder="Email Address"
       value={form.email}
       onChange={handleChange}
       required
     />

     <label className="form-label"><FaPhoneAlt className="me-1"/> Phone</label>
     <input
       type="tel"
       name="phone"
       placeholder="Phone Number"
       value={form.phone}
       onChange={handleChange}
       required
     />

     <label className="form-label"><CiCalendarDate className="me-1"/> DOB</label>
     <input
       type="date"
       name="dob"
       value={form.dob}
       onChange={handleChange}
       required
     />

     <label className="form-label"><FaLock className="me-1"/> Password</label>
     <input
       type="password"
       name="password"
       placeholder="Password"
       value={form.password}
       onChange={handleChange}
       required
     />

     <label className="form-label"><FaLock className="me-1"/> Confirm Password</label>
     <input
       type="password"
       name="confirmPassword"
       placeholder="Confirm Password"
       value={form.confirmPassword}
       onChange={handleChange}
       required
     />
      

      {loading ?(
    <button type="submit">
       <FontAwesomeIcon icon={faSpinner} spin/>Please wait...
     </button>
      ):(
   <button type="submit">
       <FaUserCheck className="me-2"/>Register
     </button>
      )}
     

     <p className="login-footer">
       Already have an account? <a href="/login">Login</a>
     </p>
   </form>
 </section>
</>
    )
}

export default Register