import React from 'react';
import { doctors } from './../../assets/data/doctors'; 
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {Link} from 'react-router-dom';
function Doctors() {
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger animation once
    threshold: 0.2 // Trigger animation when 50% of the section is visible
  });

  return (
    <div ref={ref}>
      <div className="lg:w-[770px] mx-auto mt-10">
        <h2 className='heading text-center'>
          Introducing Our Healing Maestros: Masters of Medicine
        </h2>
        <p className='text-para text-center mt-4 font-[500] text-[20px]'>
          Welcome to our distinguished team of skilled doctors and experts, committed to your well-being.
        </p>
      </div>
      <div  className={`min-h-screen overflow-y-auto w-full p-4 ${inView ? 'animate-section-enter' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <Link to={`/DocDetails/${doctor.id}`} key={doctor.id}>
            <motion.div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md flex flex-col"
              initial={{ opacity: 0, x: index % 2 === 0 ? -1000 : 1000 }}
              animate={{ opacity: inView ? 1 : 0, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              
              <div className="overflow-hidden rounded-t-lg flex-grow flex items-center justify-center">
                <img src={doctor.photo} alt={doctor.name} className="w-1/2 h-auto transform scale-110 mt-10" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                {/* <div className='border-2 w-28 h-10 items-center text-center bg-slate-200'></div> */}
                <p className="text-gray-950 text-lg  font-semibold  mb-2 ">{doctor.specialty}</p>
                <p className="text-gray-600 mb-2">Hospital: {doctor.hospital}</p>
                <p className="text-gray-600">Total Patients: {doctor.totalPatients}</p>
                {/* Add more details as needed */}
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
