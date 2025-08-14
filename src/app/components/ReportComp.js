'use client'

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ClipboardPen, Printer } from 'lucide-react'

function ReportComp({ data, filterMenu }) {
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
        <div className="px-8  text-gray-950">
            {/* Hidden on screen but visible in print */}
            <div
                ref={contentRef}
                className="hidden print:block"
            ><div className='flex items-center gap-5 mt- p-6'>


                    <div className='text-black'>Green Sphere</div>
                    <div className='bg-gray-950 flex-1 h-1'></div>
                </div>
                <div className="flex flex-col w-full items-center justify-center pb-4">
                    <p className="px-6 font-bold text-xl rounded-full py-2 bg-black text-gray-50 flex items-center justify-center">
                        {filterMenu}  </p>
                        <p className='text-black mt-2'>Superviser: Ahmed Yaseen</p>
                </div>


                <div className="min-w-full  border-gray-700">
                  
                    <div className='px-12'>
                        {cleaningData.map((task, index) => (
                            <tr className='p-8' key={index}>
                                <td className="px-4 py-2 text-left text-gray-950 ">{index + 1}.</td>
                                <td className="px-4 py-2 w-40 font-semibold  text-gray-950 ">{task.place}</td>
                                <td className="px-4 py-2  text-gray-950 ">:</td>
                                <td className="px-4 py-2 text-gray-950 ">
                                    {task.cleaner.join(', ')}
                                    
                                </td>
                            </tr>
                        ))}
                    </div>

                </div>
            </div>

            {/* Buttons */}

            <div className="flex">
                <button
                
                                               onClick={handlePrint}
                                               className="bg-red-500 flex items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                           >
                                               <ClipboardPen size={16} />
                                           </button>
            </div>
        </div>
    )
}

export default ReportComp
