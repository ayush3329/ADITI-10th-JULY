import React, { useEffect, useState } from "react";
import heroimg1 from "../../assets/images/hero-img01.png";
import heroimg2 from "../../assets/images/hero-img02.png";
import heroimg3 from "../../assets/images/hero-img03.png";
import icon1 from "../../assets/images/icon01.png";
import icon2 from "../../assets/images/icon02.png";
import icon3 from "../../assets/images/icon03.png";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowBarRight } from "react-icons/bs";
import About from "./../About";
import AllServices from "./AllServices.jsx";
import Doctors from "./Doctors.jsx";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "../Footer.jsx";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../store/globalstates";
import logo from "../../assets/images/A-logo.png";
import "../Loader.css";
import useWindowSize from "./hooks/useWindowsSize.jsx";
function Home() {
  
  const nav = useNavigate();
  const windowSize=useWindowSize();
  const [loader, showLoader] = useState(true);
  const [isUserLoggedIn, setLoginStatus] = useRecoilState(isLoggedIn);
  const [val, setval] = useState({ year: 0, clinical: 0, patient: 0 });
  const [appointment_form, set_appointment_form]  = useState(false);

  useEffect(() => {
    console.log("refresh ", isUserLoggedIn);
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
        console.log("here");
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

  useEffect(() => {
    console.log("user Logged in ", isUserLoggedIn, " ", isLoggedIn);
  }, [isUserLoggedIn]);

  useEffect(() => {
    const yid = setInterval(() => {
      setval((prev) => {
        if (prev.year + 1 > 30) {
          clearInterval(yid);
          return prev;
        }
        return { ...prev, year: prev.year + 1 };
      });
    }, 40);

    const cid = setInterval(() => {
      setval((prev) => {
        if (prev.clinical + 1 > 15) {
          clearInterval(cid);
          return prev;
        }
        return { ...prev, clinical: prev.clinical + 1 };
      });
    }, 40);

    const pid = setInterval(() => {
      setval((prev) => {
        if (prev.patient + 1 > 15) {
          clearInterval(pid);
          return prev;
        }
        return { ...prev, patient: prev.patient + 1 };
      });
    }, 40);

    return () => {
      clearInterval(yid);
      clearInterval(pid);
      clearInterval(cid);
    };
  }, []);

  const AppointmentRequest = () => {
    if (!isUserLoggedIn) {
      nav("/Login");
    } else{
      set_appointment_form(true);
    }
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5, // Adjust this value as needed
  });

  return (
    <>
      {loader ? (
        <div className="flex flex-col gap-[2rem] h-[100vh] w-[100vw] items-center justify-center">
          <img src={logo} alt="logo" />
          <div class="loader"></div>
        </div>
      ) : (
        <>
          {/* Header */}

          {/* hero section */}
          
          <div className="relative">

          
          

          <section className="hero_section pt-[0px] h-screen">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
              >
                <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                  <div>
                    <div className="lg:w-[570px]">
                      <h1
                        className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px]
                md:leading-[70px]"
                      >
                        We Help patients live a Healthy, longer Life.
                      </h1>
                      <p className="text_para">
                        Welcome to Aditi Hospital, where compassionate care
                        meets cutting-edge technology. Our state-of-the-art
                        facility offers diverse medical services, tailored to
                        your needs. With a team of skilled professionals
                        dedicated to personalized treatment, we prioritize your
                        well-being. Experience the difference at Aditi Hospital,
                        where you come first
                      </p>
                      <div className="flex items-center gap-4">
                        {/* <Link to="/login"> */}
                        <button onClick={AppointmentRequest} className="btn w-1/2 text-sm sm:text-base">
                          Request Appointment
                        </button>
                        {/* </Link> */}
                        {isUserLoggedIn && (
                          <button className="btn w-1/2 text-sm sm:text-base">Appointment Status</button>
                        )}
                      </div>
                    </div>

                    {/* hero countter */}
                    <div className="mt-[20px] lg:mt-[20px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                      <div>
                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                          {val.year}
                          {val.year === 30 && <span>+</span>}
                        </h2>
                        <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                        <p className="text_para">Years of Experience</p>
                      </div>
                      <div>
                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                          {val.clinical}
                          {val.clinical === 15 && <span>+</span>}
                        </h2>
                        <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                        <p className="text_para">Clinical Experience</p>
                      </div>
                      <div>
                        <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                          {val.patient}
                          {val.patient === 15 && <span>+</span>}
                        </h2>
                        <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                        <p className="text_para">Patient's Satisfaction</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px] justify-end ">
                    <div>
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="w-full mt-[30px]"
                        src={heroimg1}
                        alt="hero1"
                      />
                      {/* <img className="w-full mt-[30px]" src={heroimg1} alt="hero1" /> */}
                    </div>
                    <div className="mt-[10px]">
                      <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full mb-[30px]"
                        src={heroimg2}
                        alt="hero1"
                      />
                      <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full mb-[30px]"
                        src={heroimg3}
                        alt="hero1"
                      />
                      {/* <img className="w-full mb-[30px]" src={heroimg2} alt="hero1" /> */}
                      {/* <img className="w-full" src={heroimg3} alt="hero1" /> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* HERO SECTION KHATAM  */}
          <section ref={ref}>
            <div className="container">
              <div className="lg:w-[470px] mx-auto">
                <h2 className="heading text-center">
                  Providing the Best Medical Services
                </h2>
                <p className="text-para text-center mt-4 font-[500] text-[20px]">
                  World Class care for Everyone. our Healthsystem offers
                  unmatched , expert health care.
                </p>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:[mt-55px]"
                // initial={{ opacity: 0, y: 50 }}
                // animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                // transition={{ duration: 0.7 }}
              >
                {/*  Card 1 */}
                <motion.div
                  className="py-[30px] px-5 w-full max-w-[400px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center">
                    <img src={icon1} alt=" " />
                  </div>
                  <div className="mt-[10px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Find A Doctor
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      Experience unparalleled care with cutting-edge facilities
                      and personalized treatment from our expert team. Trust us
                      to blend compassion with innovation for your well-being.
                    </p>
                    <Link
                      to="/doctors"
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowBarRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  className="py-[30px] px-5 w-full max-w-[400px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center">
                    <img src={icon2} alt=" " />
                  </div>
                  <div className="mt-[10px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Book An Appointment
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      Secure your appointment hassle-free with our streamlined
                      booking system. Enjoy convenience and peace of mind as you
                      schedule your visit with just a few clicks.
                    </p>
                    <Link
                      to="/login"
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowBarRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </motion.div>

                {/*  Card 3 */}
                <motion.div
                  className="py-[30px] px-5 w-full max-w-[400px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center">
                    <img src={icon3} alt=" " />
                  </div>
                  <div
                    className="mt-[10px]"
                    onClick={() =>
                      (window.location.href =
                        "https://maps.app.goo.gl/cB3FTihgeeU9ngQw5")
                    }
                  >
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Navigate Us
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      Effortlessly navigate through our user-friendly platform
                      for streamlined access to comprehensive healthcare
                      resources. Reach us out!
                    </p>
                    <Link
                      to="/"
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowBarRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          
          
            <About></About>
            <AllServices></AllServices>
            <Doctors></Doctors>
            <Footer></Footer>

          
            




          </div>
        </>
      )}
    </>
  );
}
export default Home;
