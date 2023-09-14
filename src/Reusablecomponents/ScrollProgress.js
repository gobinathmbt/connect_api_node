import React, { useState, useEffect } from 'react';
import "../Reusablecomponents/Page404.css"

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScrollPosition = window.scrollY;
    const scrollPercentage = (currentScrollPosition / totalScrollHeight) * 100;
    setScrollProgress(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}>
      <div className="scroll-progress-indicator" />
    </div>
  );
};

export default ScrollProgress;
