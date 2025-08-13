'use client'

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ClipboardPen, Printer } from 'lucide-react'

function PrintComp({ data }) {
    const contentRef = useRef()

    const handlePrint = useReactToPrint({
        contentRef, // ✅ v3+ API
    })

    const sampleData = {
        cleaningList: [
            { place: "Kitchen", cleaner: ["John", "Mary"] },
            { place: "Bathroom", cleaner: ["Alice"] },
            { place: "Living Room", cleaner: ["Bob", "Charlie"] },
            { place: "Bedroom 1", cleaner: ["David"] },
            { place: "Bedroom 2", cleaner: ["Eve", "Frank"] },
        ]
    }

    const cleaningData = data || sampleData

    return (
        <div className="px-8 text-gray-950">
            {/* Hidden on screen but visible in print */}
            <div
                ref={contentRef}
                className="hidden print:block"
            >

                
                <table className="min-w-full border border-gray-700">
                    <thead className="bg-gray-900">
                        <tr>
                            {["No", "Task", "Assignment"].map((col, index) => (
                                <th key={index} 
                                className="px-4 py-2 border border-gray-300 text-left">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cleaningData.map((task, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2  text-gray-950 border border-gray-300">{index + 1}</td>
                                <td className="px-4 py-2  text-gray-950 border border-gray-300">{task.place}</td>
                           <td className="px-4 py-2 text-gray-950 border border-gray-300">
    {task.cleaner.join(", ")}
</td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>

            {/* Buttons */}
           
            <div className="flex gap-4 ">
                <button className="bg-blue-500 flex gap-2 items-center hover:bg-blue-700 text-white font-bold  px-4 rounded">
                     <ClipboardPen size={16} />
                </button>
                <button
                    onClick={handlePrint}
                    className="bg-red-500 flex gap-2 items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                     <Printer size={16} />
                </button>
            </div>
        </div>
    )
}

export default PrintComp
