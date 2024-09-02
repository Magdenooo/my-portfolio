import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch } from 'react-icons/fa';

const ProjectCard = ({ project, isDarkTheme, onClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} transform transition duration-300 ease-in-out`}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <div className="relative overflow-hidden">
        <img className="w-full h-48 object-cover transform transition duration-300 ease-in-out hover:scale-110" src={project.image} alt={project.name} />
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${isDarkTheme ? 'bg-black bg-opacity-60' : 'bg-white bg-opacity-60'}`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-4 py-2 rounded-full ${isDarkTheme ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'} font-bold`}
          >
            View Details
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`font-bold text-xl mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{project.name}</h3>
        <p className={`text-sm mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>{project.description}</p>
        <div className="flex flex-wrap">
          {project.tech.map((tech, index) => (
            <span key={index} className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose, isDarkTheme }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className={`${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg w-full max-w-3xl shadow-lg overflow-hidden`}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 15 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <img className="w-full h-80 object-cover" src={project.image} alt={project.name} />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 p-2 rounded-full ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          onClick={onClose}
        >
          <FaTimes />
        </motion.button>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
        <p className="mb-6 text-lg">{project.description}</p>
        <div className="mb-6 flex flex-wrap">
          {project.tech.map((tech, index) => (
            <span key={index} className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-4 py-2 rounded-full ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="mr-2" />
            GitHub Repository
          </motion.a>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-4 py-2 rounded-full ${isDarkTheme ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="mr-2" />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function Projects({ isDarkTheme }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const projects = [
    {
      name: "نظام إدارة المهام الذكي",
      tech: ["React", "Node.js", "MongoDB", "Machine Learning"],
      description: "تطبيق ويب لإدارة المهام مع ميزات الذكاء الاصطناعي لتحسين الإنتاجية. يستخدم التعلم الآلي لتحليل أنماط إكمال المهام وتقديم اقتراحات مخصصة لتحسين الإنتاجية.",
      link: "https://smart-task-manager.com",
      github: "https://github.com/yourusername/smart-task-manager",
      image: "https://via.placeholder.com/300x200?text=Smart+Task+Manager"
    },
    {
      name: "منصة التعلم التفاعلي",
      tech: ["Vue.js", "Django", "PostgreSQL", "WebRTC"],
      description: "منصة تعليمية مع دورات فيديو تفاعلية ومنتديات نقاش في الوقت الفعلي. تتيح للمتعلمين التفاعل مباشرة مع المعلمين وزملاء الدراسة من خلال مؤتمرات الفيديو والدردشة النصية.",
      link: "https://interactive-learning-platform.com",
      github: "https://github.com/yourusername/interactive-learning-platform",
      image: "https://via.placeholder.com/300x200?text=Interactive+Learning+Platform"
    },
    {
      name: "محفظة العملات الرقمية",
      tech: ["React Native", "Blockchain", "Cryptography"],
      description: "تطبيق جوال آمن لإدارة وتداول العملات الرقمية. يوفر واجهة سهلة الاستخدام مع ميزات أمان متقدمة، بما في ذلك التشفير من طرف إلى طرف والمصادقة متعددة العوامل.",
      link: "https://crypto-wallet-app.com",
      github: "https://github.com/yourusername/crypto-wallet-app",
      image: "https://via.placeholder.com/300x200?text=Crypto+Wallet+App"
    }
  ];

  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  useEffect(() => {
    const results = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm]);

  return (
    <div className={`p-8 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen transition-colors duration-300`}>
      <motion.h2 
        className={`text-4xl font-bold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>
      <motion.div 
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={`relative ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-full shadow-md`}>
          <input
            type="text"
            placeholder="Search projects..."
            className={`w-64 py-2 px-4 rounded-full ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} focus:outline-none`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className={`absolute right-3 top-3 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </motion.div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            isDarkTheme={isDarkTheme} 
            onClick={setSelectedProject}
          />
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            isDarkTheme={isDarkTheme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}