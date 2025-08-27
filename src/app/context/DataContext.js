'use client';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [studentsNames, setStudentsNames] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [areaPerData, setAreaPerData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  return (
    <DataContext.Provider value={{ studentsNames, setStudentsNames,
      areaData, setAreaData, taskList, setTaskList,areaPerData, setAreaPerData
     }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
