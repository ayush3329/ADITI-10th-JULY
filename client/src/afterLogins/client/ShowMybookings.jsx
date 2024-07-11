import React, { useEffect, useState } from 'react';

const ShowMyBookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const userEmail = JSON.parse(atob(token.split('.')[1])).email; // Extract email from JWT payload

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/showAppointments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ Email: userEmail }),
        });

        if (!response.ok) {
          throw new Error('Error fetching appointments');
        }

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id} className="border p-4 mb-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p><strong>Patient Name:</strong> {appointment.patient_name}</p>
                <p><strong>Phone:</strong> {appointment.phone}</p>
                <p><strong>Age:</strong> {appointment.age}</p>
                <p><strong>Gender:</strong> {appointment.gender}</p>
                <p><strong>Description:</strong> {appointment.description}</p>
                <p><strong>Department:</strong> {appointment.department}</p>
                <p><strong>Time:</strong> {new Date(appointment.time).toLocaleString()}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </div>
              <div className={`status-bar ${appointment.status === 'accepted' ? 'bg-green-500' : appointment.status === 'canceled' ? 'bg-red-500' : 'bg-gray-500'} w-4 h-16 rounded-full`}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ShowMyBookings;
