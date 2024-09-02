"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCode, FaProjectDiagram, FaDownload } from 'react-icons/fa';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ThemeToggle from '../components/ThemeToggle';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('about');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const tabContent = {
    about: <About isDarkTheme={isDarkTheme} />,
    skills: <Skills isDarkTheme={isDarkTheme} />,
    projects: <Projects isDarkTheme={isDarkTheme} />
  };

  const tabIcons = {
    about: FaUser,
    skills: FaCode,
    projects: FaProjectDiagram
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={styles.backgroundAnimation}></div>
      <motion.div
        className={`w-full max-w-4xl ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} text-gray-300 flex justify-between items-center`}>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
          </div>
          <span className={`text-sm font-mono ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>magdi-atef-portfolio.js</span>
          <ThemeToggle isDark={isDarkTheme} toggleTheme={toggleTheme} />
        </div>
        <div className="flex border-b border-gray-700">
          {Object.keys(tabContent).map(tab => {
            const Icon = tabIcons[tab];
            return (
              <motion.button
                key={tab}
                className={`px-4 py-2 font-mono text-sm flex items-center ${
                  selectedTab === tab 
                    ? isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'
                    : isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
                onClick={() => setSelectedTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="mr-2" />
                {tab}.js
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[selectedTab]}
          </motion.div>
        </AnimatePresence>
        <motion.div
          className={`p-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} flex justify-between items-center`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex space-x-6">
            {/* Social media icons here */}
          </div>
          <motion.button
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              isDarkTheme ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold transition-colors duration-200`}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
          >
            <FaDownload />
            <span>تحميل السيرة الذاتية</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal for CV download */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal content */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}