import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar"
import "./login.css"
import { FaUser, FaEnvelope, FaPhoneAlt, FaCalendarAlt, FaClock, FaNotesMedical, FaBirthdayCake } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, getCsrfToken } from "../config"


function Appointment(){
    

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        age: "",
        description: "",
        appointment_date: "",
        appointment_time: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(";").shift()
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

       

        setLoading(true)
        try {
             const csrfToken = await getCsrfToken();
          const res = await fetch(`${API_BASE_URL}/api/appointments/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify({
                    full_name:form.full_name,
                    email:form.email,
                    phone:form.phone,
                    age:form.age,
                    description: form.description,
                    appointment_date:form.appointment_date,
                    appointment_time:form.appointment_time,
                })
            })

            const data = await res.json()

            if (res.status === 201) {
                toast.success(data.message || "Appointment booked successfully")
                setForm({
                    full_name: "",
                    email: "",
                    phone: "",
                    age: "",
                    description: "",
                    appointment_date: "",
                    appointment_time: ""
                })
                setTimeout(() => { 
                    navigate("/")
                }, 2000);
            } else {
                toast.error( "Failed to book appointment")
            }
        } catch (err) {
            console.error(err)
            toast.error("Network error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return(
<>
 <Navbar/>
 <ToastContainer position="top-center" autoClose={2000} />
 <section className="login-section">
   <form className="login-card" onSubmit={handleSubmit}>
     <h2>Book Appointment</h2>
     <p className="login-sub">Fill in your details to schedule a visit</p>

     <label className="form-label"><FaUser className="me-1"/> Full Name</label>
     <input
       type="text"
       name="full_name"
       placeholder="Full Name"
       value={form.full_name}
       onChange={handleChange}
       required
     />

     <label className="form-label"><FaEnvelope className="me-1"/> Email</label>
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

     <label className="form-label"><FaBirthdayCake className="me-1"/> Age</label>
     <input
       type="number"
       step="0.1"
       name="age"
       placeholder="Age"
       value={form.age}
       onChange={handleChange}
       required
     />

     <label className="form-label"><FaNotesMedical className="me-1"/> Description</label>
     <textarea
       name="description"
       placeholder= "Describe your issue (optional)"
       value={form.description}
       onChange={handleChange}
       rows="3"
     />

     <label className="form-label"><FaCalendarAlt className="me-1"/> Appointment Date</label>
     <input
       type="date"
       name="appointment_date"
       value={form.appointment_date}
       onChange={handleChange}
       required
     />

     <label className="form-label"><FaClock className="me-1"/> Appointment Time</label>
     <input
       type="time"
       name="appointment_time"
       value={form.appointment_time}
       onChange={handleChange}
       required
     />

     {loading ?(
         <button type="submit">
            <FontAwesomeIcon icon={faSpinner} spin/>Booking...
          </button>
           ):(
        <button type="submit">
           Book Appointment
          </button>
           )}



   </form>
 </section>
</>
    )
}
export default Appointment