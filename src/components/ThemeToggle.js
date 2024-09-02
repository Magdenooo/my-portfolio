import React from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button
    className={`p-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}
    onClick={toggleTheme}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {isDark ? <FaSun className="text-gray-800" /> : <FaMoon className="text-white" />}
  </motion.button>
);

export default ThemeToggle;