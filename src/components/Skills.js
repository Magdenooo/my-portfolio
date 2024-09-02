import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaCloud, FaCogs, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const SkillBar = ({ skill, level, color, onClick }) => {
  return (
    <motion.div 
      className="mb-4 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(skill)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm font-medium">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
        <motion.div 
          className={`h-2.5 ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category, skills, isDarkTheme, color, icon: Icon, onSkillClick }) => (
  <motion.div 
    className="mb-8"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-800'} flex items-center`}>
      <Icon className="mr-2" /> {category}
    </h3>
    {skills.map((skill, index) => (
      <SkillBar key={index} skill={skill} level={skill.level} color={color} onClick={onSkillClick} />
    ))}
  </motion.div>
);

const SkillModal = ({ skill, onClose, isDarkTheme }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className={`${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6 rounded-lg w-full max-w-md shadow-lg`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{skill.name}</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-1 rounded-full ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={onClose}
        >
          <FaTimes />
        </motion.button>
      </div>
      <p className="mb-4 text-sm">{skill.description}</p>
      <h3 className="text-xl font-semibold mb-2">Projects:</h3>
      <ul className="list-disc list-inside mb-4 space-y-2">
        {skill.projects.map((project, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2">{project}</span>
            <motion.a
              href="#" // Replace with actual project link
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`text-sm ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
            >
              <FaExternalLinkAlt />
            </motion.a>
          </li>
        ))}
      </ul>
      <motion.button
        className={`px-4 py-2 rounded ${isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white w-full`}
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Close
      </motion.button>
    </motion.div>
  </motion.div>
);

export default function Skills({ isDarkTheme }) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const skills = {
    Frontend: [
      { name: "HTML", level: 95, description: "The standard markup language for Web pages.", projects: ["Responsive Website", "Landing Page"] },
      { name: "CSS", level: 90, description: "Stylesheet language used for describing the presentation of a document.", projects: ["Custom CSS Framework", "Interactive UI Components"] },
      { name: "JavaScript", level: 90, description: "High-level, interpreted programming language.", projects: ["Dynamic Web Application", "Interactive Data Visualization"] },
      { name: "React JS", level: 85, description: "A JavaScript library for building user interfaces.", projects: ["Single Page Application", "E-commerce Platform"] },
      { name: "TypeScript", level: 80, description: "A typed superset of JavaScript that compiles to plain JavaScript.", projects: ["Large-scale Web Application", "Type-safe API Integration"] },
      { name: "Next.js", level: 85, description: "The React Framework for Production.", projects: ["Server-side Rendered React App", "Static Site Generation"] },
      { name: "Bootstrap", level: 90, description: "The most popular CSS Framework for developing responsive and mobile-first websites.", projects: ["Responsive Dashboard", "Quick Prototyping"] },
      { name: "SASS", level: 85, description: "A preprocessor scripting language that is interpreted or compiled into CSS.", projects: ["Custom Theming System", "Large-scale CSS Architecture"] },
      { name: "State Management", level: 80, description: "Techniques and libraries for managing application state.", projects: ["Complex React Application", "Real-time Data Sync"] },
      { name: "Web Performance", level: 75, description: "Techniques to improve website speed and responsiveness.", projects: ["Performance Optimization", "Lazy Loading Implementation"] },
      { name: "Figma", level: 80, description: "User Interface and User Experience design principles.", projects: ["User-Centered Design Process", "Accessibility Improvements"] },
      { name: "Package Management", level: 85, description: "Tools for managing project dependencies.", projects: ["Custom NPM Package", "Yarn Workspace Setup"] },
      { name: "Git", level: 90, description: "Distributed version control system.", projects: ["Open Source Contribution", "Git Workflow Implementation"] },
      { name: "REST API", level: 85, description: "Representational State Transfer API design.", projects: ["RESTful Service Design", "API Integration"] },
    ],
    // ... (other categories remain unchanged)
  };
  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-purple-600"
  ];

  const icons = {
    Frontend: FaCode,
    Backend: FaServer,
    Databases: FaDatabase,
    Cloud: FaCloud,
    Other: FaCogs
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  return (
    <div className={`p-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen transition-colors duration-300`}>
      <motion.h2 
        className={`text-3xl font-bold mb-8 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>
      {Object.entries(skills).map(([category, skillList], index) => (
        <CategorySection 
          key={category} 
          category={category} 
          skills={skillList} 
          isDarkTheme={isDarkTheme}
          color={colors[index % colors.length]}
          icon={icons[category]}
          onSkillClick={handleSkillClick}
        />
      ))}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)} 
            isDarkTheme={isDarkTheme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}