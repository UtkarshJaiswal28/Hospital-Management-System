import DoctorCard from './DoctorCard';

function DoctorGrid({ onBook }) {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Aditi Sharma',
      specialty: 'Cardiologist',
      experience: 12,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Dr. Rohan Mehta',
      specialty: 'Neurologist',
      experience: 9,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Dr. Priya Nair',
      specialty: 'Pediatrician',
      experience: 7,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 4,
      name: 'Dr. Karan Verma',
      specialty: 'Orthopedic Surgeon',
      experience: 15,
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
    {
      id: 5,
      name: 'Dr. Sneha Kulkarni',
      specialty: 'Dermatologist',
      experience: 6,
      image: 'https://randomuser.me/api/portraits/women/21.jpg',
    },
    {
      id: 6,
      name: 'Dr. Arjun Rao',
      specialty: 'General Physician',
      experience: 10,
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
    },
    {
  id: 7,
  name: 'Dr. Meera Iyer',
  specialty: 'Gynecologist',
  experience: 11,
  image: 'https://randomuser.me/api/portraits/women/33.jpg',
},
{
  id: 8,
  name: 'Dr. Vikram Singh',
  specialty: 'ENT Specialist',
  experience: 8,
  image: 'https://randomuser.me/api/portraits/men/45.jpg',
},
{
  id: 9,
  name: 'Dr. Ananya Gupta',
  specialty: 'Psychiatrist',
  experience: 6,
  image: 'https://randomuser.me/api/portraits/women/56.jpg',
},
{
  id: 10,
  name: 'Dr. Siddharth Joshi',
  specialty: 'Ophthalmologist',
  experience: 13,
  image: 'https://randomuser.me/api/portraits/men/62.jpg',
},
  ];

  return (
    <div className="doctor-grid">
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} doctor={{ ...doc, onBook }} />
      ))}
    </div>
  );
}

export default DoctorGrid;