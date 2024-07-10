import React from 'react';
import { services } from '../../../assets/data/services';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Services() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5 // Adjust this value as needed
  });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gp-[30px] mt-[30px] lg:mt-[25px]">
      {services.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ServiceCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}

export default Services;
