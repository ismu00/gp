'use client'
import { useState } from 'react'
import PrintComp from '@/app/components/PrintComp'

export default function FilterTable({ item }) {
  const [filterMenu, setFilterMenu] = useState('MNC Ground Floor')
  const filterData = item.cleaningList.filter(area => area.category === filterMenu)

  return (
    <div className="flex flex-col h-[calc(100vh-115px)] text-white p-4">
      <div className='flex w-full justify-between  items-center gap-0.5 px-4'>
    <div className='flex'>
            {['Masjid', 'MNC Ground Floor', 'MNC First Floor', 'MNC Second Floor', 'MNC Outside'].map((i)=>(
            <p className={` hover:bg-[#1e1e1e] py-2 transition-colors duration-300 ${filterMenu === i ? "bg-[#1e1e1e]" : "bg-[#2f2f2f]"}  px-6 cursor-pointer`} onClick={()=> setFilterMenu(i)}>{i}</p>
        ))}
    </div>
 <PrintComp data={filterData} />
      </div>
      <div className="flex-1  px-4">
        <div className="bg-[#1e1e1e]  shadow-md border border-[#1f1f1f] p-4">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {["No", "Task", "Assignment"].map((col, index) => (
                  <th key={index} className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filterData.map((task, index) => (
                <tr key={index} className="hover:bg-[#2b2b2b]">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{task.place}</td>
                  <td className="px-4 py-2">{task.cleaner.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full gap-1.5 p-4 flex justify-end">
       
      </div>
    </div>
  )
}
