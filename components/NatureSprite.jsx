import { motion } from "framer-motion";

export default function NatureSprite({ type = "tree", size = "medium", position = "static", className = "" }) {
  const getSpriteContent = () => {
    switch (type) {
      case "tree":
        return <div className="nature-sprite-oak w-full h-full"></div>;
      case "pine":
        return <div className="nature-sprite-pine w-full h-full"></div>;
      case "oak":
        return <div className="nature-sprite-oak w-full h-full"></div>;
      case "flower":
        return <div className="nature-sprite-rose w-full h-full"></div>;
      case "rose":
        return <div className="nature-sprite-rose w-full h-full"></div>;
      case "bird":
        return <div className="nature-sprite-robin w-full h-full"></div>;
      case "robin":
        return <div className="nature-sprite-robin w-full h-full"></div>;
      case "butterfly":
        return <div className="nature-sprite-butterfly w-full h-full"></div>;
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