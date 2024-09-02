import React, { useState, useCallback } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({ code, language, isDarkTheme }) => {
  const [copied, setCopied] = useState(false);
  const theme = isDarkTheme ? atomOneDark : atomOneLight;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const getLanguageColor = () => {
    const colors = {
      javascript: '#f7df1e',
      python: '#3776ab',
      java: '#007396',
      cpp: '#00599c',
      csharp: '#239120',
      html: '#e34c26',
      css: '#264de4',
      typescript: '#007acc',
      ruby: '#cc342d',
      go: '#00add8',
      default: isDarkTheme ? '#c0c0c0' : '#333333'
    };
    return colors[language.toLowerCase()] || colors.default;
  };

  return (
    <div className={`code-block-container ${isDarkTheme ? 'dark' : 'light'}`}
         style={{
           border: `1px solid ${isDarkTheme ? '#444' : '#e0e0e0'}`,
           borderRadius: '8px',
           overflow: 'hidden',
           boxShadow: isDarkTheme ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
         }}>
      <div className="code-block-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: isDarkTheme ? '#2a2a2a' : '#f5f5f5',
        borderBottom: `1px solid ${isDarkTheme ? '#444' : '#e0e0e0'}`,
      }}>
        <div className="language-badge" style={{
          backgroundColor: getLanguageColor(),
          color: isDarkTheme ? '#fff' : '#000',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '0.8em',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: isDarkTheme ? '#fff' : '#000',
          }}></span>
          {language}
        </div>
        <button 
          className="copy-button"
          onClick={copyToClipboard}
          style={{
            backgroundColor: copied ? '#4CAF50' : 'transparent',
            color: copied ? '#fff' : (isDarkTheme ? '#fff' : '#333'),
            border: `1px solid ${copied ? '#4CAF50' : (isDarkTheme ? '#fff' : '#333')}`,
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9em',
            fontWeight: 'bold',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={copied ? "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" : "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"} fill="currentColor" />
          </svg>
          {copied ? 'تم النسخ!' : 'نسخ الكود'}
        </button>
      </div>
      <div className="code-block-content">
        <SyntaxHighlighter
          language={language}
          style={theme}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            padding: '1.5em',
            fontSize: '0.95em',
            lineHeight: '1.6',
            overflow: 'auto',
            maxHeight: '400px',
            transition: 'all 0.3s ease',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            textAlign: 'right',
            color: isDarkTheme ? '#6c7280' : '#a0a0a0',
            borderRight: isDarkTheme ? '1px solid #444' : '1px solid #e0e0e0',
            marginRight: '1em',
          }}
          codeTagProps={{
            style: {
              fontFamily: "'Fira Code', 'Consolas', monospace",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;