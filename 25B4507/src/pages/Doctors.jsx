import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar"
import DoctorGrid from "../components/DoctorGrid"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./doctors.css"

function Doctors(){
    const navigate = useNavigate()

    const handleBook = (doctor) => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            toast.error("Please login to book an appointment")
            navigate("/login")
            return
        }
        navigate("/appointments", { state: { doctorName: doctor.name } })
    }

    return(
<>
 <Navbar/>
 <ToastContainer position="top-center" autoClose={2000} />
 <section className="doctors-section">
   <h2>Our Doctors</h2>
   <p className="doctors-sub">Meet our team of experienced medical professionals</p>
   <DoctorGrid onBook={handleBook}/>
 </section>
</>
    )
}
export default Doctors