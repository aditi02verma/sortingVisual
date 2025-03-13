import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Ball = ({ value, isActive, isSwapping }) => {
  const ballStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 5px",
    backgroundColor: isSwapping ? "#DE3163" : isActive ? "#E195AB" : "#FFEDFA",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    border: "2px solid #FFEDFA",
    transition: "transform 0.2s, background-color 0.2s",
    transform: isActive ? "scale(1.1)" : "scale(1)",
    backgroundImage: isSwapping
      ? "none"
      : "linear-gradient(145deg, #FFEDFA, #E195AB)",
    color: "#000000",
    fontWeight: "bold",
  };

  return (
    <motion.div
      className="ball d-flex align-items-center justify-content-center"
      style={ballStyle}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.div>
  );
};

Ball.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  isSwapping: PropTypes.bool,
};

Ball.defaultProps = {
  isActive: false,
  isSwapping: false,
};

export default Ball;
