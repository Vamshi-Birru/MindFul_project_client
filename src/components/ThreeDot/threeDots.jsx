import React, { useState } from 'react';

import './ThreeDotMenu.css'; // Import your CSS styles

function ThreeDotMenu() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Close the dropdown if the user clicks outside of it
  const handleDocumentClick = (event) => {
    if (!event.target.matches('.dropbtn')) {
      setIsDropdownVisible(false);
    }
  };

  // Attach the document click event listener when the component mounts
  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="header">
      <div className={`dropdown ${isDropdownVisible ? 'show' : ''}`}>
        <ul className="dropbtn icons btn-right" onClick={showDropdown}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className="dropdown-content">
          <a href="#home">Go To</a>
          <a href="#about">About</a>
          <li className="divider"></li>
          <a href="#contact">Save as Draft</a>
        </div>
      </div>
    </div>
  );
}

export default ThreeDotMenu;
