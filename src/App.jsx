import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const env = import.meta.env;
  
  // Get environment color
  const getEnvColor = (envName) => {
    switch(envName?.toLowerCase()) {
      case 'development': return '#22c55e'; // green
      case 'qa': return '#eab308'; // yellow
      case 'uat': return '#f97316'; // orange
      case 'production': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  // Log environment variables on mount
  console.log('Environment Variables:', {
    MODE: env.MODE,
    APP_ENV: env.VITE_APP_ENV,
    API_URL: env.VITE_API_URL,
    APP_TITLE: env.VITE_APP_TITLE,
    APP_DEBUG: env.VITE_APP_DEBUG,
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem', 
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        backgroundColor: getEnvColor(env.VITE_APP_ENV),
        color: 'white',
        fontSize: '0.875rem',
        fontWeight: 'bold'
      }}>
        {env.VITE_APP_ENV?.toUpperCase()}
      </div>
      <h1>{env.VITE_APP_TITLE || 'Vite + React'}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <div style={{ 
          textAlign: 'left', 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#1a1a1a', 
          borderRadius: '8px',
          border: `1px solid ${getEnvColor(env.VITE_APP_ENV)}` 
        }}>
          <pre style={{ margin: 0 }}>
            <strong>Environment Configuration:</strong>
            {'\n'}
            • Environment: {env.VITE_APP_ENV || 'Not set'}
            {'\n'}
            • API URL: {env.VITE_API_URL || 'Not set'}
            {'\n'}
            • Mode: {env.MODE || 'Not set'}
            {'\n'}
            • Debug: {env.VITE_APP_DEBUG ? 'true' : 'false'}
          </pre>
        </div>
      </div>
      <p className="read-the-docs">
        Running in {env.MODE} mode
      </p>
    </>
  );
}

export default App;
// New feature added
