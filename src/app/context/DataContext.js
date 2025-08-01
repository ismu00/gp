'use client';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [studentsNames, setStudentsNames] = useState([]);
  const [areaData, setAreaData] = useState([]);
  return (
    <DataContext.Provider value={{ studentsNames, setStudentsNames,
      areaData, setAreaData
     }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
