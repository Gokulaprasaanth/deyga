
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VapiButton from './VapiButton';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading to allow for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/44f43f8e-a718-413f-bd2d-86e2a9e0c79b.png" 
          alt="Luxury skincare store interior" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Only the Vapi Button */}
      <div className="relative z-10">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <VapiButton 
                apiKey="9b90dc3f-2288-4009-9088-17663dd0426a" 
                assistantId="04dac8fe-ebfc-44a0-91e3-b39e14555de4"
                className="text-base"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
