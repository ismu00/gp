'use client'
import { useState } from 'react'
import PrintComp from '@/app/components/PrintComp'
import ReportComp from './ReportComp'

export default function FilterTable({ item }) {
  const [filterMenu, setFilterMenu] = useState('Masjid')
  const filterData = item.cleaningList.filter(area => area.category === filterMenu)

  return (
    <div className="flex flex-col h-[calc(100vh-115px)] text-white p-8">
      <div className='flex w-full justify-between  items-center  px-4'>
<div className="flex">
  {[
    { label: 'Masjid', active: true },
    { label: 'MNC Ground Floor' },
    { label: 'MNC First Floor' },
    { label: 'MNC Second Floor' },
    { label: 'MNC Outside' },
  ].map((tab, idx, arr) => {
    let clip;
    if (idx === 0) {
      // First tab: curve left, slope right
      clip = 'polygon(0% 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)';
    } else if (idx === arr.length - 1) {
      // Last tab: slope left, curve right
      clip = 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)';
    } else {
      // Middle tabs: slope left and slope right
      clip = 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)';
    }

    return (
      <div onClick={()=>setFilterMenu(tab.label)}
        key={tab.label}
        className={`flex items-center px-4 py-2 cursor-pointer transition-all duration-200
          ${filterMenu === tab.label
            ? 'bg-blue-600 text-white'
            : 'bg-[#2e2e2e] text-gray-100 hover:bg-gray-800'
          } ${idx === 0 ? 'rounded-tl-xl' : ''} ${idx === arr.length - 1 ? 'rounded-tr-xl' : ''} 
          ${idx !== 0 ? '-ml-2' : ''}`}
        style={{ clipPath: clip }}
      >
        <span>{tab.label}</span>
      </div>
    );
  })}
</div>

<div className='flex'> <ReportComp data={filterData} filterMenu={filterMenu}/>
 <PrintComp data={filterData} filterMenu={filterMenu}/></div>
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
