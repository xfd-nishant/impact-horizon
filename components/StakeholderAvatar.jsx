import { motion } from "framer-motion";

const stakeholderSprites = {
  CEO: {
    icon: "🏭",
    gradient: "from-earth-600 to-earth-800",
    borderColor: "border-earth-400",
    description: "Industrial Leader",
    personality: "Focused on growth and efficiency"
  },
  Villager: {
    icon: "🏘️",
    gradient: "from-forest-600 to-forest-800", 
    borderColor: "border-forest-400",
    description: "Community Representative",
    personality: "Protective of local environment"
  },
  Mayor: {
    icon: "🏛️",
    gradient: "from-sky-600 to-sky-800",
    borderColor: "border-sky-400", 
    description: "Political Leader",
    personality: "Balancing multiple interests"
  },
  Developer: {
    icon: "⚡",
    gradient: "from-water-600 to-water-800",
    borderColor: "border-water-400",
    description: "Energy Developer", 
    personality: "Innovation and sustainability focused"
  },
  Farmer: {
    icon: "🌾",
    gradient: "from-earth-500 to-earth-700",
    borderColor: "border-earth-300",
    description: "Agricultural Producer",
    personality: "Land stewardship and livelihood"
  },
  "Local NGO": {
    icon: "🌱",
    gradient: "from-forest-500 to-forest-700",
    borderColor: "border-forest-300", 
    description: "Environmental Advocate",
    personality: "Biodiversity and conservation"
  }
};

export default function StakeholderAvatar({ 
  stakeholder, 
  size = "lg", 
  showDetails = false, 
  isActive = false,
  onClick 
}) {
  const sprite = stakeholderSprites[stakeholder] || stakeholderSprites.CEO;
  
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-2xl", 
    lg: "w-20 h-20 text-3xl",
    xl: "w-24 h-24 text-4xl"
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${sprite.gradient}
          border-4 ${sprite.borderColor}
          rounded-full 
          flex items-center justify-center
          cursor-pointer
          shadow-xl
          relative
          transition-all duration-300
          ${isActive ? 'ring-4 ring-white ring-opacity-60 shadow-2xl' : ''}
        `}
        onClick={onClick}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Emoji Sprite */}
        <span className="relative z-10 filter drop-shadow-lg">
          {sprite.icon}
        </span>
        
        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-forest-400 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        
        {/* Floating Particles */}
        {isActive && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
      
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-32"
        >
          <h4 className="font-display font-semibold text-sm text-forest-800">
            {stakeholder}
          </h4>
          <p className="text-xs text-forest-600 font-nature">
            {sprite.description}
          </p>
          {size === "xl" && (
            <p className="text-xs text-forest-500 mt-1 italic">
              {sprite.personality}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}