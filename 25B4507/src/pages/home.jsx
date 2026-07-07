import Navbar from "../components/navbar"
import "./home.css"
import doctorImg from "../assets/doctor.png" // replace with your image path
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { MdPermContactCalendar } from "react-icons/md";


function Home(){

   const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash)
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" })
                }, 100) // small delay so page renders first
            }
        }
    }, [location])




    return(
<>
 <Navbar/>
 
 {/* Hero Section */}
 <section className="hero">
   
   <img src={doctorImg} alt="doctor" className="hero-img"/>
 </section>

 {/* About Us */}
 <section id="about" className="section about-section">
   <h2>About Us</h2>
   <p>We are a team of dedicated medical professionals committed to providing
   quality healthcare with compassion and excellence. Our hospital combines
   modern technology with experienced doctors to give you the best care.</p>
 </section>

 {/* Our Mission */}
 <section id="mission" className="section mission-section">
   <h2>Our Mission</h2>
   <p>To deliver accessible, affordable and high-quality healthcare to every
   patient, while continuously improving through innovation, research and
   patient-first care.</p>
 </section>

 {/* Contact Us */}
 <section id="contact" className="section contact-section">
   <h2> <MdPermContactCalendar className="mal" />
    Contact Us</h2>

   <form className="contact-form">
     <input type="text" placeholder="Your Name" required/>
     <input type="email" placeholder="Your Email" required/>
     <textarea placeholder="Your Message" rows="4" required></textarea>
   <button
  type="submit" 

>
  Send Message
 
</button>
   </form>
 </section>
</>
    )
}
export default Home