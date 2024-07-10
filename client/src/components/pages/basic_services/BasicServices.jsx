import React from "react";
import lung from "./../../../assets/images/lungs-solid.svg";
import heart from "./../../../assets/images/heart-solid.svg";
import pregnant from "./../../../assets/images/person-pregnant-solid.svg";
import bone from "./../../../assets/images/bone-solid.svg";
import virus from "./../../../assets/images/viruses-solid.svg";
import baby from "./../../../assets/images/baby-solid.svg";
import HealthServices from "../HealthServices";

function BasicServices() {
  return (
    <section
      className="bg-[url('./assets/images/hero-bg.png')] bg-no-repeat bg-center bg-cover bg-fixed w-full h-full"
      id="services"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about-header text-center">
              <h1 className=" text-5xl font-bold mb-4">
                Health services for you
              </h1>
              <p className="text-lg font-bold">
                We are always here to listen and understand
              </p>
            </div>
          </div>
        </div>
        <div className="about-content mt-20">
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-10">
            <HealthServices path={virus} serviceName="covid-19" />
            <HealthServices path={baby} serviceName="Pediatrics" />
            <HealthServices path={heart} serviceName="Heart Caring" />
            <HealthServices path={bone} serviceName="Orthopedic" />
            <HealthServices path={pregnant} serviceName="Obstetrics" />
            <HealthServices path={lung} serviceName="Lungs" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BasicServices;
