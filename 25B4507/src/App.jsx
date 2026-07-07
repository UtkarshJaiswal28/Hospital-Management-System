import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Appointment from "./pages/appointment";
import Doctors from "./pages/Doctors";
import Footer from "./components/Footer";
import MyAppointments from "./pages/myappointment";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/appointments" element={<Appointment/>} />
          <Route path="/doctors" element={<Doctors/>} />
          <Route path="/myappointments" element={<MyAppointments/>} />

      </Routes>
    </BrowserRouter>
    <Footer></Footer>
    </>
  );
}

export default App;