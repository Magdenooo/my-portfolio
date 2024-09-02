import React, { useState, useEffect } from 'react';
import CodeBlock from './CodeBlock';
import { motion } from 'framer-motion';

export default function About({ isDarkTheme }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const aboutCode = `
class MagdiAtef extends Developer {
  constructor() {
    this.name = "مجدي عاطف زهران";
    this.title = "مطور ويب Full Stack";
    this.experience = 5; // سنوات
    this.passion = "بناء تطبيقات ويب مبتكرة";
    this.hobbies = [
      "قراءة الكتب التقنية",
      "التصوير الفوتوغرافي",
      "العزف على الجيتار"
    ];
  }

  introduce() {
    return \`مرحبًا! أنا \${this.name},
\${this.title} بخبرة \${this.experience} سنوات.
شغفي هو \${this.passion}.
في وقت فراغي، أستمتع بـ \${this.hobbies.join(", ")}\`;
  }

  getSkills() {
    return {
      frontend: ["React", "Next.js", "Vue.js"],
      backend: ["Node.js", "Express", "Django"],
      databases: ["MongoDB", "PostgreSQL", "Redis"],
      other: ["Docker", "AWS", "GraphQL"]
    };
  }
}

const magdi = new MagdiAtef();
console.log(magdi.introduce());
console.log("المهارات:", JSON.stringify(magdi.getSkills(), null, 2));
  `;

  useEffect(() => {
    setLines(aboutCode.split('\n'));
    setCurrentLine(0);
  }, []);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowExplanation(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <CodeBlock
        code={lines.slice(0, currentLine).join('\n')}
        language="javascript"
        isDarkTheme={isDarkTheme}
      />
      {showExplanation && (
        <motion.div
          className={`mt-4 p-4 ${
            isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'
          } rounded-lg shadow-lg`}
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-2">شرح:</h3>
          <p>هذا الكود يُعرّف فئة `MagdiAtef` التي تمثل ملف تعريف المطور. يتضمن معلومات شخصية ومهنية، بالإضافة إلى دالة `introduce()` التي تقدم نبذة مختصرة، ودالة `getSkills()` التي تعرض المهارات التقنية.</p>
        </motion.div>
      )}
      {showExplanation && (
        <motion.div
          className="mt-4"
          variants={itemVariants}
        >
          <button
            className={`px-4 py-2 rounded ${
              isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold transition-colors duration-300`}
            onClick={() => {
              const magdi = new (Function(`return ${aboutCode}`)())();
              alert(magdi.introduce());
            }}
          >
            تشغيل الكود
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}