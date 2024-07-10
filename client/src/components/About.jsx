import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/images/about.png';
import { useInView } from 'react-intersection-observer';

function About() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4
  });

  return (
    <section ref={ref}>
      <div className="container">
        <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* Animated image */}
          <motion.div
            className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img src={aboutImg} alt="aboutimg" />
          </motion.div>

          {/* Animated text */}
          <motion.div
            className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h2 className="heading text-center mb-8">Proud to be Mumbai's finest</h2>
            <motion.p
              className="text_para font-[600] "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
For over three decades, our steadfast dedication to excellence has been the cornerstone of our success. With a proud legacy spanning thirty years of exceptional service, we've consistently set new standards in healthcare delivery, fostering unwavering trust within the communities we serve.            </motion.p>
            <motion.p
              className="text_para font-[600] mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
For the past thirty years, our relentless pursuit of excellence has been the driving force behind our remarkable achievements. With a rich history of serving our community with distinction, we've consistently pushed boundaries in healthcare, earning the enduring trust of our patrons.            </motion.p>
            <motion.p
              className="text_para font-[600] mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
For three decades, our unwavering commitment to excellence has been the bedrock of our success story. With a thirty-year legacy of exceptional service, we've continuously elevated healthcare standards, garnering the unwavering trust of the communities we proudly serve.            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
