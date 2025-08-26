'use client';

import { useEffect, useState } from 'react';
import { useData } from './context/DataContext';
import Overview from './overview/page';
import Launch from './components/LaunchScreen';

export default function Home() {
  const { studentsNames, setStudentsNames, areaData, setAreaData, taskList, setTaskList } = useData();
  const [isLaunch, setIsLaunch]= useState(true)

  useEffect(() => {
            if (!studentsNames || studentsNames.length === 0) {

    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/studentsDB');
        const json = await res.json();
        if (json.success) {
          setStudentsNames(json.result);
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error('Students fetch failed:', error);
      }
    };

    const fetchAreas = async () => {
      try {
        const res = await fetch('/api/areas');
        const json = await res.json();
        if (json.success) {
          setAreaData(json.result);
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error('Areas fetch failed:', error);
      }
    };


   const fetchTaskList = async () => {
      try {
        const res = await fetch('api/taskList');
        const json = await res.json();
        if (json.success) {
          setTaskList(json.result);
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error('Tasklist fetch failed:', error);
      }
    };



    fetchStudents();
    fetchAreas();
    fetchTaskList();
  }
  }, []);

  useEffect(() => {
    console.log('Updated students from context:', studentsNames);
  }, [studentsNames]);

  useEffect(() => {
    console.log('Updated areas from context:', areaData);
  }, [areaData]);

  useEffect(() => {
    console.log('Updated Task List from context:', taskList);
  }, [taskList]);

  return (
    
    <div>
 <Overview />
      
    </div>
  );
}
