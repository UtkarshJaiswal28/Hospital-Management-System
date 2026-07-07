function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="doctor-image"
      />

      <h3 className="doctor-name">{doctor.name}</h3>
      <p className="doctor-specialty">{doctor.specialty}</p>
      <p className="doctor-experience">{doctor.experience} yrs experience</p>

      <div className="book-btn-wrap">
        <button onClick={() => doctor.onBook?.(doctor)}>
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;