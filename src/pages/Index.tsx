
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

const Index = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Navbar />
      <Hero />
    </motion.div>
  );
};

export default Index;
