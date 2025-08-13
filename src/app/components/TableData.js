'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit, Search, Trash2, Loader2 } from 'lucide-react'

function TableData({ taskList, getEachTask, loading }) {
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate loading state until taskList arrives
  // useEffect(() => {
  //   if (taskList && taskList.length >= 0) {
  //     // Small delay for smooth UX
  //     const timer = setTimeout(() => setLoading(false), 1000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [taskList])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='bg-[#1e1e1e] mt-8 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-6 my-4'
    >
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0'>
        <h2 className='text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left'>
          Task Schedules
        </h2>
        <div className='relative w-full sm:w-auto'>
          <input
            type="text"
            placeholder='Search Here'
            className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      {/* Loader */}
      {loading ? (
          <div className='flex flex-col justify-center items-center py-10 gap-2'>
    <Loader2 className='animate-spin text-gray-300' size={36} />
    <span className='text-gray-400 text-sm'>Loading...</span>
  </div>
      ) : (
        <div className='overflow-x-none'>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr>
                {["No", "Task", "Date", "Status", "Action"].map((item, index) => (
                  <th
                    key={index}
                    className='px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell'
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {taskList.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className='hidden sm:table-row hover:bg-[#2b2b2b]'
                >
                  <td className='px-3 sm:px-6 py-2 sm:py-3 text-white'>{index + 1}</td>
                  <td className='px-3 sm:px-6 py-2 sm:py-3 text-white'>{item.taskName}</td>
                  <td className='px-3 sm:px-6 py-2 sm:py-3 text-white'>{item.date}</td>
                  <td className='px-3 sm:px-6 py-2 sm:py-3 text-white'>
                    <button
                      className={`text-sm px-3 py-1 rounded-md ${
                        item.status ? "bg-green-700" : "bg-amber-700"
                      }`}
                    >
                      {item.status ? "Complete" : "Pending"}
                    </button>
                  </td>
                  <td className='px-3 sm:px-6 py-2 sm:py-3 text-white'>
                    <button
                      onClick={() => getEachTask(item)}
                      className='text-sm bg-blue-700 hover:bg-blue-800 transition-colors duration-200 px-3 py-1 rounded-md'
                    >
                      Open
                    </button>
                    <button className='text-sm px-3 py-1 rounded-md'>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

export default TableData
