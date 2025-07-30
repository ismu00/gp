'use client'
import { motion } from 'motion/react'
import StateCart from '@/components/StateCart'
import {
  IndianRupee,
  BrushCleaning,
  CalendarFold,
  ClockAlert,
  CalendarDays,
} from 'lucide-react'
import TasksOverview from '@/components/TasksOverview'
import CategoryDistributionChart from '@/components/categoryDistriutionChart'

export default function Overview() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:py-8'>
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCart name='Total Tasks' icon={BrushCleaning} value='20' />
          <StateCart name='Weekly Tasks' icon={CalendarDays} value='2' />
          <StateCart name='Upcoming Tasks' icon={CalendarFold} value='1' />
          <StateCart name='Pending' icon={ClockAlert} value='0' />
        </motion.div>
      </main>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden '>
        <TasksOverview />
        <CategoryDistributionChart />
      </div>
    </div>
  )
}
