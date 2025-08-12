// app/item/[id]/ClientItemPage.jsx (Client Component)
'use client'

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ClipboardPen, PrinterIcon } from 'lucide-react'

const PrintableSection = React.forwardRef(({ item }, ref) => (
  <div ref={ref} className="p-6 bg-white text-black">
    <h1 className="text-xl font-bold mb-4">Invoice</h1>
    <p className="mb-4">Cleaning Task Assignment</p>
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {["No", "Task", "Assignment"].map((col, index) => (
            <th key={index} className="px-4 py-2 border border-gray-300 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {item.cleaningList.map((task, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
            <td className="px-4 py-2 border border-gray-300">{task.place}</td>
            <td className="px-4 py-2 border border-gray-300">
              {task.cleaner.map((person, idx) => (
                <p key={idx}>{person}</p>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))
PrintableSection.displayName = 'PrintableSection'

export default function ClientItemPage({ item }) {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Task Report',
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { font-family: sans-serif; }
      table { border-collapse: collapse; width: 100%; }
      th, td { padding: 6px; border: 1px solid #ccc; }
    `,
  })

  return (
    <div className="flex flex-col h-[calc(100vh-115px)] text-white p-4">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-[#1e1e1e] rounded-xl shadow-md border border-[#1f1f1f] p-4">
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {["No", "Task", "Assignment"].map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {item.cleaningList.map((task, index) => (
                  <tr key={index} className="hover:bg-[#2b2b2b]">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{task.place}</td>
                    <td className="px-4 py-2">
                      {task.cleaner.map((person, idx) => (
                        <p key={idx}>{person}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hidden Printable Section */}
      <div style={{ display: 'none' }}>
        <PrintableSection ref={componentRef} item={item} />
      </div>

      {/* Buttons */}
      <div className="w-full gap-1.5 p-4 flex justify-end">
        <button className="bg-blue-500 flex gap-2 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Report <ClipboardPen />
        </button>
        <button onClick={handlePrint} className="bg-red-500 flex gap-2 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Print <PrinterIcon />
        </button>
      </div>
    </div>
  )
}
