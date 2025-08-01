'use client';

import { useEffect } from 'react';
import { useData } from './context/DataContext';
import Overview from './overview/page';

export default function Home() {
  const { studentsNames, setStudentsNames, areaData, setAreaData } = useData();

  useEffect(() => {
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

    fetchStudents();
    fetchAreas();
  }, []);

  useEffect(() => {
    console.log('Updated students from context:', studentsNames);
  }, [studentsNames]);

  useEffect(() => {
    console.log('Updated areas from context:', areaData);
  }, [areaData]);

  return (
    <div>
      <Overview />
    </div>
  );
}
