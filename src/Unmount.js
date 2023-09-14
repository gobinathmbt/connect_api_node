import React, { useState, useEffect } from 'react';

const UnmountComponent = () => {
  const [showModal, setShowModal] = useState(false);

  // Event handler for the beforeunload event
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; // Needed for Chrome
    setShowModal(true);
  };

  // Event handler when user confirms leaving the website
  const handleConfirmLeave = () => {
    setShowModal(false);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    // Add any additional clean-up code or redirection logic here if needed.
  };

  // Event handler when user cancels leaving the website
  const handleCancelLeave = () => {
    setShowModal(false);
  };

  // Attach the beforeunload event listener when the component mounts
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="app">
      {showModal && (
        <div className="modal">
          <h3>Are you sure you want to leave this website?</h3>
          <button onClick={handleCancelLeave}>Cancel</button>
          <button onClick={handleConfirmLeave}>Leave</button>
        </div>
      )}
    </div>
  );
};

export default UnmountComponent;
