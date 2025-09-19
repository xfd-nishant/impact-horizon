import Link from "next/link";
import scenarios from "../data/scenarios.json";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

function ScenarioCard({ s, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getScenarioTheme = (id) => {
    switch(id) {
      case "1": return {
        gradient: "from-water-500/20 to-forest-500/20",
        border: "border-water-300/50",
        icon: "🏭",
        accentColor: "text-water-700"
      };
      case "2": return {
        gradient: "from-forest-500/20 to-earth-500/20", 
        border: "border-forest-300/50",
        icon: "☀️",
        accentColor: "text-forest-700"
      };
      default: return {
        gradient: "from-sky-500/20 to-forest-500/20",
        border: "border-sky-300/50", 
        icon: "🌍",
        accentColor: "text-sky-700"
      };
    }
  };

  const theme = getScenarioTheme(s.id);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        href={`/scenario/${s.id}`}
        className={`
          block nature-card p-8 relative overflow-hidden
          bg-gradient-to-br ${theme.gradient}
          border-2 ${theme.border}
          group
        `}
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          {theme.icon}
        </div>
        
        {/* Floating Particles */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-forest-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`text-4xl ${theme.accentColor}`}>
              {theme.icon}
            </div>
            <div className="text-right">
              <div className="text-xs font-display text-forest-600 uppercase tracking-wider">
                Scenario {s.id}
              </div>
            </div>
          </div>

          <h3 className="font-display font-bold text-2xl text-forest-900 mb-3 group-hover:text-glow transition-all duration-300">
            {s.title}
          </h3>
          
          <p className="text-forest-700 mb-6 font-nature leading-relaxed">
            {s.summary}
          </p>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-lg">👥</span>
                <span className="font-semibold text-forest-800">
                  {s.population.toLocaleString()}
                </span>
                <span className="text-forest-600">people</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-lg">💼</span>
                <span className="font-semibold text-forest-800">
                  {s.baseline_jobs}
                </span>
                <span className="text-forest-600">baseline jobs</span>
              </div>
            </div>

            <motion.div
              className="btn-nature text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore →
            </motion.div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, type: "spring" }
    }
  };

  return (
    <>
      <Head>
        <title>Impact Sandbox • Environmental Decision Making</title>
        <meta name="description" content="Explore environmental scenarios, chat with stakeholders, and predict impacts in this interactive sandbox." />
      </Head>
      
      <LoadingScreen isLoading={isLoading} message="Loading Impact Sandbox" />
      
      <div className="nature-bg min-h-screen">
        <motion.main 
          className="max-w-7xl mx-auto p-8"
          variants={containerVariants}
          initial="hidden" 
          animate="visible"
        >
          {/* Hero Header */}
          <motion.header 
            className="text-center mb-16 relative"
            variants={titleVariants}
          >
            {/* Floating Nature Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-20"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  {['🌿', '🌊', '🏔️', '🌱', '☀️', '🦋'][i]}
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              <motion.h1 
                className="text-7xl font-display font-black text-forest-900 mb-6 text-glow"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(54, 156, 54, 0.5)",
                    "0 0 20px rgba(54, 156, 54, 0.8)", 
                    "0 0 10px rgba(54, 156, 54, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                IMPACT
                <span className="block text-water-700 text-water-glow">
                  SANDBOX
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-forest-700 font-nature max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Navigate complex environmental decisions, engage with diverse stakeholders, 
                and witness the ripple effects of your choices in our immersive simulation platform.
              </motion.p>

              {/* Call-to-Action Stats */}
              <motion.div 
                className="flex justify-center space-x-12 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-forest-800">
                    {scenarios.length}
                  </div>
                  <div className="text-sm text-forest-600 font-nature">
                    Scenarios
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-water-700">
                    ∞
                  </div>
                  <div className="text-sm text-forest-600 font-nature">
                    Possibilities
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-earth-700">
                    3D
                  </div>
                  <div className="text-sm text-forest-600 font-nature">
                    Impact Modeling
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.header>

          {/* Scenarios Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-forest-900 mb-4">
                Choose Your Path
              </h2>
              <p className="text-lg text-forest-700 font-nature max-w-2xl mx-auto">
                Each scenario presents unique challenges where environmental, economic, 
                and social factors intersect. Your decisions matter.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {scenarios.map((s, index) => (
                <ScenarioCard key={s.id} s={s} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Enhanced Footer */}
          <motion.footer 
            className="mt-20 text-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="nature-card p-8 max-w-4xl mx-auto">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-display font-bold text-forest-900 mb-4">
                Ready to Shape the Future?
              </h3>
              <p className="text-forest-700 font-nature mb-6 text-lg">
                Every decision creates ripples across environmental, economic, and social dimensions. 
                Explore, learn, and discover the interconnected nature of our world.
              </p>
              <div className="text-sm text-forest-600 italic">
                💡 Pro tip: Start with Scenario 1 for the complete experience
              </div>
            </div>
          </motion.footer>
        </motion.main>
      </div>
    </>
  );
}
