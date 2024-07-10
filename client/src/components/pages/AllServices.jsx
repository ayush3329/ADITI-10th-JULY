import React from 'react'
import BasicServices from './basic_services/BasicServices';
import Services from './basic_services/Services';
function AllServices() {
  return (
    <>
    <BasicServices></BasicServices>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className='heading text-center font-[700] text-[30px] text-cyan-700'>
              Our Medical Services
            </h2>
            <p className='text_para text-center mt-5 font-[700] text-[15px]'>
            Discover excellence in healthcare at our premier hospital, where every patient receives personalized attention and access to advanced medical expertise. Trust in our commitment to your well-being, with world-class services tailored to your needs
            </p>
          </div>
        <Services></Services>
        </div>
            
      </section>
    </>
  )
}

export default AllServices;