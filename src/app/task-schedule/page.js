'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useData } from '../context/DataContext'
import StateCart from '@/app/components/StateCart'
import TableData from '@/app/components/TableData'
import {
  IndianRupee,
  BrushCleaning,
  CalendarFold,
  ClockAlert,
  CalendarDays,
  Plus,
  History,
} from 'lucide-react'

export default function List() {
  const { taskList, setTaskList } = useData()
    const [loading, setLoading] = useState(false)

   const router = useRouter()

  useEffect(() => {



    if (!taskList.length) {

      const fetchTaskList = async () => {
        try {
          setLoading(true)
          const res = await fetch('/api/taskList');
          const json = await res.json();
          if (json.success) {
            setTaskList(json.result);
          } else {
            console.error(json.error);
          }
        } catch (error) {
          console.error('Tasklist fetch failed:', error);
        }finally{
                    setLoading(false)

        }
      };
      fetchTaskList();
    }


  }, [])

 const getEachTask = (item) => {
    router.push(`/task-schedule/${item._id}`)
  }


  return (
    <div className='flex-1 overflow-hidden relative z-10'>

      
      {/* <main className='max-w-7xl mx-auto py-6 px-4 lg:py-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCart name='Total Tasks' icon={BrushCleaning} value={taskList.length} />
          <StateCart name='Weekly Tasks' icon={CalendarDays} value='2' />
          <StateCart name='Upcoming Tasks' icon={CalendarFold} value='1' />
          <StateCart name='Pending' icon={ClockAlert} value='0' />
        </motion.div>
      </main> */}
 

        <div className='flex overflow-hidden'>
                <Link href='/task-schedule/generate-task'>

          <motion.div
            className='flex flex-col items-center mb-8 mt-6 h-40 w-40 justify-center  ml-12 cursor-pointer bg-[#1e1e1e] outline-1 outline-gray-600 transition-colors duration-300 hover:bg-[#2f2f2f] rounded-lg backdrop-blur-md shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
            <Plus className='text-gray-100 mt-2' size={40} />
            <h1 className='text-md font-medium text-gray-100 pt-2'>Create New</h1>
          </motion.div>

      </Link>

            <motion.div
            className='flex flex-col items-center mb-8 mt-6 h-40 w-40 justify-center  mx-10 cursor-pointer bg-[#1e1e1e] outline-1 outline-gray-600 transition-colors duration-300 hover:bg-[#2f2f2f] rounded-lg backdrop-blur-md shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
            <History className='text-gray-100 mt-2' size={40} />
            <h1 className='text-md font-medium text-gray-100 pt-2'>Use Existing</h1>
          </motion.div>

        </div>

        



      <hr className='mx-4 opacity-25' />
      <TableData taskList={taskList} getEachTask={getEachTask} loading={loading}/>
    </div>
  );
}
