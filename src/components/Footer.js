import React from 'react';
import './style-components/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="VK" target="_blank" rel="noopener noreferrer">
          <span role="img" aria-label="ВКонтакте">&#128125;</span>
        </a>
        <a href="Tg" target="_blank" rel="noopener noreferrer">
          <span role="img" aria-label="Telegram">&#128172;</span>
        </a>
        <a href="YT" target="_blank" rel="noopener noreferrer">
          <span role="img" aria-label="YouTube">&#127909;</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;