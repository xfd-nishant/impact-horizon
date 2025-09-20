import { motion } from "framer-motion";

export default function StakeholderSprite({ type = "scientist", size = "medium", position = "static", className = "" }) {
  const getSpriteContent = () => {
    switch (type) {
      case "scientist":
        return (
          <div className="relative w-full h-full">
            {/* Lab coat */}
            <div className="w-8 h-12 bg-white rounded-t-full mx-auto"></div>
            {/* Head */}
            <div className="w-6 h-6 bg-yellow-200 rounded-full mx-auto -mt-3"></div>
            {/* Glasses */}
            <div className="w-4 h-2 border-2 border-gray-600 rounded-full mx-auto -mt-1"></div>
            {/* Hair */}
            <div className="w-6 h-3 bg-gray-600 rounded-full mx-auto -mt-2"></div>
            {/* Lab coat details */}
            <div className="w-1 h-8 bg-gray-300 mx-auto -mt-8"></div>
          </div>
        );
      case "manager":
        return (
          <div className="relative w-full h-full">
            {/* Suit */}
            <div className="w-8 h-12 bg-blue-600 rounded-t-full mx-auto"></div>
            {/* Head */}
            <div className="w-6 h-6 bg-yellow-200 rounded-full mx-auto -mt-3"></div>
            {/* Tie */}
            <div className="w-1 h-6 bg-red-600 mx-auto -mt-2"></div>
            {/* Hair */}
            <div className="w-6 h-3 bg-brown-600 rounded-full mx-auto -mt-2"></div>
          </div>
        );
      case "resident":
        return (
          <div className="relative w-full h-full">
            {/* Casual shirt */}
            <div className="w-8 h-12 bg-green-500 rounded-t-full mx-auto"></div>
            {/* Head */}
            <div className="w-6 h-6 bg-yellow-200 rounded-full mx-auto -mt-3"></div>
            {/* Hair */}
            <div className="w-6 h-3 bg-blonde-400 rounded-full mx-auto -mt-2"></div>
            {/* Hat */}
            <div className="w-8 h-2 bg-blue-400 rounded-full mx-auto -mt-1"></div>
          </div>
        );
      case "mayor":
        return (
          <div className="relative w-full h-full">
            {/* Formal suit */}
            <div className="w-8 h-12 bg-gray-800 rounded-t-full mx-auto"></div>
            {/* Head */}
            <div className="w-6 h-6 bg-yellow-200 rounded-full mx-auto -mt-3"></div>
            {/* Bow tie */}
            <div className="w-3 h-2 bg-red-600 rounded-full mx-auto -mt-1"></div>
            {/* Hair */}
            <div className="w-6 h-3 bg-gray-500 rounded-full mx-auto -mt-2"></div>
            {/* Chain of office */}
            <div className="w-6 h-1 bg-yellow-400 mx-auto -mt-1"></div>
          </div>
        );
      case "farmer":
        return (
          <div className="relative w-full h-full">
            {/* Overalls */}
            <div className="w-8 h-12 bg-blue-800 rounded-t-full mx-auto"></div>
            {/* Head */}
            <div className="w-6 h-6 bg-yellow-200 rounded-full mx-auto -mt-3"></div>
            {/* Hat */}
            <div className="w-8 h-3 bg-brown-600 rounded-full mx-auto -mt-2"></div>
            {/* Overalls straps */}
            <div className="w-1 h-4 bg-blue-900 mx-auto -mt-6"></div>
          </div>
        );
      case "activist":
        return (
          <div className="relative w-full h-full">
            {/* T-shirt */}
            <div className="w-8 h-12 bg-green-400 rounded-t-full mx-auto"></div>
            {/* Head */}
            <div className="w-6 h-6 bg-yellow-200 rounded-full mx-auto -mt-3"></div>
            {/* Hair */}
            <div className="w-6 h-3 bg-black rounded-full mx-auto -mt-2"></div>
            {/* Protest sign */}
            <div className="w-2 h-4 bg-white border border-gray-400 mx-auto -mt-4"></div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-full">
            <div className="w-6 h-8 bg-gray-400 rounded-t-full mx-auto"></div>
            <div className="w-4 h-4 bg-yellow-200 rounded-full mx-auto -mt-2"></div>
          </div>
        );
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "scale-75";
      case "large":
        return "scale-125";
      case "xlarge":
        return "scale-150";
      default:
        return "scale-100";
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "floating":
        return "nature-float";
      case "pulsing":
        return "nature-pulse";
      case "glowing":
        return "nature-glow";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className={`${getSizeClasses()} ${getPositionClasses()} ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      {getSpriteContent()}
    </motion.div>
  );
}