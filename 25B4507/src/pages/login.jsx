import { useState } from "react"
import Navbar from "../components/navbar"
import "./login.css"
import { FaUser,FaLock, FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';



function Login(){
    const [form,setForm] = useState({
      username:"",
      password:"",
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

    const handleSubmit =async (e) => {
        e.preventDefault()
        setloading(true)
             try {
            const res = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken")
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password
                })
            })

            const data = await res.json()

            if (res.status === 200) {
                toast.success(data.message || 'Login Successful');
                 localStorage.setItem('userId',data.userId);
              localStorage.setItem('userName',data.username);
               
                setForm({
                    username:"",
                    password:"",
                });
                setTimeout(() => {
                  navigate("/")
                },1000);
               
               
              } 
            else {
                toast.error(data.message || 'Invalid credentials')
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
     <h2>Welcome Back</h2>
     <p className="login-sub">Login to continue to City Hospital</p>

    <label className="form-label"> <FaUser className="me-1"/> UserName
      </label>

     <input
       type="text"
       name="username"
       placeholder="Enter your username"
       value={form.username}
       onChange={handleChange}
       required
       />

       <label className="form-label"> <FaLock className="me-1"/> Password
      </label>
     <input
       type="password"
       name="password"
       placeholder="Password"
       value={form.password}
       onChange={handleChange}
       required
     />
 {loading ?(
    <button type="submit">
       <FontAwesomeIcon icon={faSpinner} spin/>Logged In...
     </button>
      ):(
   <button type="submit">
       <FaSignInAlt className="me-2"/>Login
     </button>
      )}

     <p className="login-footer">
       Don't have an account? <a href="/register">Register</a>
     </p>
   </form>
 </section>
</>
    )
}
export default Login