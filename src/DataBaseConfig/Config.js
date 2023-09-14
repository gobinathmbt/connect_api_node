// DatabaseContext.js
import { createContext, useState } from 'react';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [selectedDatabase, setSelectedDatabase] = useState(() => {
    return localStorage.getItem('selectedDatabase') || 'mongodb';
  });

  return (
    <DatabaseContext.Provider value={{ selectedDatabase, setSelectedDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;
