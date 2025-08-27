'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts'

function CategoryDistributionChart() {
  const [data, setData] = useState([
    { name: 'Class 1', students: 26 },
    { name: 'Class 2', students: 23 },
    { name: 'Class 3', students: 20 },
    { name: 'Class 4', students: 46 },
    { name: 'Class 5', students: 56 },
  ])

  const colors = ['#00d2ff', '#ff7f50', '#32cd32', '#ffa500', '#9370db'] // 5 colors

  return (
    <motion.div
      className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-6 my-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left'>
        Students Data
      </div>
      <div className='h-64 md:h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='name'
              stroke='#8884d8'
              tick={{ fontSize: 12, fill: '#ccc' }}
              interval='preserveStartEnd'
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#8884d8'
              tick={{ fontSize: 12, fill: '#ccc' }}
              width={40}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2e2e2e',
                borderColor: '#444',
                fontSize: '14px',
              }}
            />
            <Legend />
            <Bar dataKey='students' barSize={40} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default CategoryDistributionChart
