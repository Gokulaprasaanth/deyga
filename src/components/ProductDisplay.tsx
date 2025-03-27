
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Renewing Serum",
    description: "Revitalize your skin with our premium serum, enriched with natural ingredients.",
    image: "/placeholder.svg",
    category: "Face Care"
  },
  {
    id: 2,
    name: "Hydrating Cream",
    description: "Deeply hydrating formula that nourishes and protects your skin all day long.",
    image: "/placeholder.svg",
    category: "Face Care"
  },
  {
    id: 3,
    name: "Purifying Cleanser",
    description: "Gently removes impurities while maintaining your skin's natural balance.",
    image: "/placeholder.svg",
    category: "Face Care"
  },
  {
    id: 4,
    name: "Revitalizing Mask",
    description: "Weekly treatment to boost radiance and restore your skin's natural glow.",
    image: "/placeholder.svg",
    category: "Face Care"
  }
];

const categories = ["All", "Face Care", "Body Care", "Hair Care"];

const ProductDisplay = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section 
      id="products" 
      ref={ref} 
      className="py-24 bg-beige-100"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-cream-200 text-brown-500 rounded-full text-sm font-medium mb-3">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6">Premium Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of luxury skincare products, carefully formulated with the finest ingredients for exceptional results.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-2"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={fadeInUp}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-brown-400 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-brown-100"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover-lift"
            >
              <div className="aspect-square bg-beige-200 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-2/3 h-2/3"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-brown-500 uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-xl font-medium mt-2 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-brown-500 hover:text-brown-700 transition-colors font-medium text-sm"
                >
                  Explore
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDisplay;
