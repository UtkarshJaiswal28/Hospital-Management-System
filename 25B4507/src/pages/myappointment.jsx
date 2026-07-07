import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import "./myappointment.css"
import { API_BASE_URL } from "../config"
import (API_BASE_URL)

function MyAppointments(){
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)


      
 useEffect(() => {
    const fetchAppointments = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/my-appointments/`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()

            if (Array.isArray(data)) {
                setAppointments(data)
            } else {
                console.error("Unexpected response:", data)
                setAppointments([])
            }
        } catch (err) {
            console.error(err)
            setAppointments([])
        } finally {
            setLoading(false)
        }
    }
    fetchAppointments()
}, [])

    const statusClass = (status) => {
        switch(status){
            case "Approved": return "status-approved"
            case "Completed": return "status-completed"
            case "Cancelled": return "status-cancelled"
            default: return "status-pending"
        }
    }


    return(
<>
 <Navbar/>
 <section className="myapp-section">
   <h2>My Appointments</h2>

   {loading ? (
     <p className="myapp-loading">Loading...</p>
   ) : appointments.length === 0 ? (
     <p className="myapp-empty">You have no appointments booked yet.</p>
   ) : (
     <div className="myapp-grid">
       {appointments.map((a) => (
         <div className="myapp-card" key={a.id}>
           <h3>{a.full_name}</h3>
           <p><strong>Age:</strong> {a.age}</p>
           <p><strong>Date:</strong> {a.appointment_date}</p>
           <p><strong>Time:</strong> {a.appointment_time}</p>
           <span className={`myapp-status ${statusClass(a.status)}`}>{a.status}</span>
         </div>
       ))}
     </div>
   )}
 </section>
</>
    )
}
export default MyAppointments