'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion' // fixed import
import { DeleteIcon, Edit, Search, SearchCheck, Trash2 } from 'lucide-react'

function Performance() {
  const demiData = [
    { id: 1, name: "Week 01", date: "July 21 Wed ", email: "midl@example.com" },
    { id: 1, name: "Week 01", date: "July 21 Wed ", email: "john@example.com" },
    { id: 1, name: "Week 01", date: "July 21 Wed ", email: "john@example.com" },
    { id: 1, name: "Week 01", date: "July 21 Wed ", email: "john@example.com" },


  ]

    const [searchQuery, setSearchQuery] = useState("")


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-6 my-4'
    >
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0'>
        <h2 className='text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left'>
         Students Performance
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

      <div className='overflow-x-none'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              {["No", "Task", "Date", "Email", "Action"].map((item) => (
                <th
                  key={item}
                  className='px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell'
                >
                  {item}
                </th>


              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>

            {demiData.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className='flex flex-col sm:table-row mb-4 sm:mb-0 border-b sm:border-b-0 border-gray-700
              sm:border-none p-2 sm:p-0'>

                {/* mobile View */}

                <td className='sm:hidden px-3 py-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='ml-3'>
                        <div className='text-sm font-medium text-gray-100'>{item.name}</div>
                        <div className='text-sm font-medium text-gray-400'>{item.date}</div>
                      </div>
                    </div>
                    <div className='flex space-x-1 -mt-5 -mr-5 '>
                        <button className='text-sm   text-indigo-500 hover:text-indigo-300'><Edit size={16}/></button>
                        <button className='text-sm  text-gray-500   hover:text-gray-300  px-3 py-1 rounded-md'><Trash2 size={16}/></button>

                    </div>

                  </div>
                </td>

                {/* ============== */}

                {/* <td className='hidden sm:table-cell px-6 py-4 whitespace-now'></td> */}

              </motion.tr>
            ))}


            {demiData.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className='hidden  sm:table-row mb-4 sm:mb-0   border-b-0 border=gray-700 sm:border-none p-2 sm:p-0 hover:bg-[#2b2b2b]'>
                <td className='px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>{index + 1}</td>
                <td className='px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>{item.name}</td>
                <td className='px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>{item.date}</td>
                <td className='px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>{item.email}</td>
                <td className='px-3 sm:px-6 py-2 sm:py-3  text-white hidden sm:table-cell  '>
                  <div className='flex items-center'>
                    <button className='text-sm   bg-indigo-600 hover:bg-blue-700 px-3 py-1 rounded-md'>View</button>
                    <button className='text-sm   px-3 py-1 rounded-md'><Trash2 size={18} className='' /></button>

                  </div>
                </td>

              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default Performance
