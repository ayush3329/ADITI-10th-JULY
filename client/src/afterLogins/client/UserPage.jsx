import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimg1 from "./../../assets/images/avatar-icon.png";

function UserPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    description: '',
    department: 'Covid-19',
  });
  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You would send formData to your backend here
  };

  const user = {
    name: 'SAHIL SINGH RAWAT',
    email: 'example@gmail.com',
    bloodType: 'O-',
    profilePicture: heroimg1
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={user.profilePicture}
            alt="Profile"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600 mt-1">Blood Type: {user.bloodType}</p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => nav('/ShowMyBookings')}
          >
            My Bookings
          </button>
          <button
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
            onClick={() => setShowForm(!showForm)}
          >
            Book an Appointment
          </button>
        </div>
        {showForm && (
          <form className="mt-6" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Patient Name</label>
              <input
                type="text"
                name="paitent_name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Patient Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Patient Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
                maxLength="100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department of Diagnosis</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
                required
              >
                <option value="Covid-19">Covid-19</option>
                <option value="Heart Caring">Heart Caring</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Obstetrics">Obstetrics</option>
                <option value="Lungs">Lungs</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserPage;
