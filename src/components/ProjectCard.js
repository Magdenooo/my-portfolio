import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, isDarkTheme }) => (
  <motion.div 
    className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg overflow-hidden`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className={`font-bold text-xl mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{project.name}</h3>
      <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-base`}>{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech, index) => (
          <span key={index} className={`text-xs px-2 py-1 rounded ${isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <a href={project.link} className="text-blue-500 hover:underline">مشاهدة المشروع</a>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;