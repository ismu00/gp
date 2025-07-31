'use client'
import { motion } from 'motion/react'
import StateCart from '@/components/StateCart'
import {
  IndianRupee,
  BrushCleaning,
  CalendarFold,
  ClockAlert,
  CalendarDays,
  Plus,
} from 'lucide-react'
import TableData from '@/components/TableData'
import Link from 'next/link'
export default function List() {
  return (
    <div className='flex-1 overflow-hidden relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:py-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCart
            name='Total Tasks'
            icon={BrushCleaning}
            value='20'
          />
          <StateCart name='Weekly Tasks' icon={CalendarDays} value='2' />
          <StateCart name='Upcoming Tasks' icon={CalendarFold} value='1' />
          <StateCart name='Pending' icon={ClockAlert} value='0' />
        </motion.div>
      </main>

    <Link href='/task-schedule/generate-task'>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden'>
        <motion.div
          className='flex flex-col items-center mb-8 mt-1 h-40 w-40 justify-center  mx-10 cursor-pointer bg-[#1e1e1e] outline-1 outline-gray-600   transition-colors duration-300 hover:bg-[#2f2f2f] rounded-lg backdrop-blur-md shadow-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Plus className='text-gray-100 mt-2 ' size={40} />
          <h1 className='text-md font-medium text-gray-100 pt-2'>Create New</h1>
        </motion.div>
      </div></Link>
      <hr className=' mx-4 opacity-25' />
      <TableData />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden '></div>
    </div>
  )
}
