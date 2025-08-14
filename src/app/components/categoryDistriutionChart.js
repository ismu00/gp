'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'

function CategoryDistributionChart() {
  const [data, setData] = useState([
    { name: 'Task 1', students: 0 },
    { name: 'Task 2', students: 110 },
    { name: 'Task 3', students: 80 },
    { name: 'Task 4', students: 100 },
    { name: 'Task 5', students: 50 },
    { name: 'Task 6', students: 80 },
    { name: 'Task 7', students: 70 },
  ])

  return (
   
      <motion.div
      className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-6 my-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>
        Task Distriution
      </h2>
    </motion.div>
  )
}

export default CategoryDistributionChart
