'use client';

import { useEffect } from 'react';
import { useData } from './context/DataContext';
import Overview from './overview/page';

export default function Home() {
  const { studentsNames, setStudentsNames } = useData();
  const { areaData, setAreaData } = useData();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/studentsDB');
        const json = await res.json();
        if (json.success) {
          setStudentsNames(json.result); // ✅ Works now
        } else {
          console.error(json.error);
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    console.log('Updated students from context:', studentsNames);
  }, [studentsNames]);

  return (
    <div>
      <Overview />
    </div>
  );
}
