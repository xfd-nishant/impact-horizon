import { motion } from "framer-motion";

export default function NatureSprite({ type = "tree", size = "medium", position = "static", className = "" }) {
  const getSpriteContent = () => {
    switch (type) {
      case "tree":
        return (
          <div className="relative">
            {/* Trunk */}
            <div className="w-2 h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-full mx-auto"></div>
            {/* Leaves */}
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full -mt-4 -ml-3"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full -mt-2 -ml-1"></div>
          </div>
        );
      case "flower":
        return (
          <div className="relative">
            {/* Stem */}
            <div className="w-1 h-6 bg-green-600 mx-auto"></div>
            {/* Flower */}
            <div className="w-4 h-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full -mt-2 -ml-1.5"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full -mt-3 -ml-0.5"></div>
          </div>
        );
      case "bird":
        return (
          <div className="relative">
            {/* Body */}
            <div className="w-3 h-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full"></div>
            {/* Wings */}
            <div className="w-2 h-1 bg-blue-300 rounded-full -mt-1 -ml-1 transform -rotate-12"></div>
            <div className="w-2 h-1 bg-blue-300 rounded-full -mt-1 -ml-1 transform rotate-12"></div>
          </div>
        );
      case "butterfly":
        return (
          <div className="relative">
            {/* Body */}
            <div className="w-1 h-3 bg-amber-600 mx-auto"></div>
            {/* Wings */}
            <div className="w-3 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full -mt-1 -ml-1 transform -rotate-12"></div>
            <div className="w-3 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full -mt-1 -ml-1 transform rotate-12"></div>
          </div>
        );
      case "leaf":
        return (
          <div className="w-4 h-2 bg-gradient-to-br from-green-400 to-green-500 rounded-full transform rotate-45"></div>
        );
      case "cloud":
        return (
          <div className="relative">
            <div className="w-6 h-3 bg-gradient-to-br from-white to-gray-100 rounded-full"></div>
            <div className="w-4 h-2 bg-gradient-to-br from-white to-gray-100 rounded-full -mt-1 -ml-1"></div>
            <div className="w-4 h-2 bg-gradient-to-br from-white to-gray-100 rounded-full -mt-1 -mr-1"></div>
          </div>
        );
      default:
        return <div className="w-4 h-4 bg-green-400 rounded-full"></div>;
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