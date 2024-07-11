import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimg1 from "./../../assets/images/avatar-icon.png";
import { isLoggedIn } from '../../store/globalstates';
import { useRecoilState } from 'recoil';
import "../../components/Loader.css"
import logo from "../../assets/images/A-logo.png";
import "./spinner.css"


function UserPage() {
  const [reqsent, setReqSent] = useState(false);
  const [isUserLoggedIn, setLoginStatus] = useRecoilState(isLoggedIn);
  const [loader, showLoader] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    age: '',
    gender: '',
    description: '',
    department: 'Covid-19',
    date: '',
    phone: ''
  });
  const nav = useNavigate();

  //Protected route -> Done
  useEffect(() => {
    console.log("Logged in status " + isUserLoggedIn);
    if (isUserLoggedIn) {
      showLoader(false);
      return;
    }

    const CheckLoginStatus = async () => {
      showLoader(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoginStatus(false);
        showLoader(false);
        nav("/Login");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/checkLoginStatus`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: token})
      })

      const data = await response.json();
      if(data.success){
      setLoginStatus(true);
      } else{
        setLoginStatus(false);
        nav("/Login");
        }

      showLoader(false);
      return;
    };

    CheckLoginStatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev)=>{
      return {...prev, [name]: value}
    });
  };

  const handleFormSubmit = async(e) => {
    try{
      setReqSent(true);
      const token = localStorage.getItem("token");
      if(!token) {
        nav("/login");
        setReqSent(false);
        return;
      }
      e.preventDefault();
      console.log('Form data submitted:', formData);

      const reponse = await fetch(`${process.env.REACT_APP_BASE_URL}/makeappointment`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: token, name: formData.patient_name, gender: formData.gender, 
                              description: formData.description, age: formData.age,
                              department: formData.department, date: formData.date, phone: formData.phone
                            })

      })


      const data = await reponse.json();

      console.log(data);

      if(data.success) {
        console.log("alert");
        alert(data.msg);
        setFormData({age: '', date: '', department: '', description: '', gender: '', patient_name: '', phone: ''})
      } else{
        alert(data.msg);
      }
      setReqSent(false);

    } catch(e){

      setReqSent(false);
    }
  };

  const user = {
    name: 'SAHIL SINGH RAWAT',
    email: 'example@gmail.com',
    bloodType: 'O-',
    profilePicture: heroimg1
  };

  return (
    <>
    {loader ? (
      <div className="flex flex-col gap-[2rem] h-[100vh] w-[100vw] items-center justify-center">
        <img src={logo} alt="logo" />
        <div class="loader"></div>
      </div>
    ) :
    (<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
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
                name="patient_name"
                value={formData.patient_name}
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
              <label className="block text-gray-700">Phone No.</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
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
              className="flex justify-center items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full h-[2.8rem]"
            >
            
            {!reqsent ? 
              (<span>submit</span>) : (<span class="loader2"></span>)
            }
            </button>
          </form>
        )}
      </div>
    </div>
    )
  }
  </>
  );
}

export default UserPage;
