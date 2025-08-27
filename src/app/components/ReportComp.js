'use client'

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ClipboardPen, Printer } from 'lucide-react'

function ReportComp({ data, filterMenu }) {
    const contentRef = useRef()

    const handlePrint = useReactToPrint({
        contentRef, // ✅ v3+ API
    })

    const category = ["Masjid", "MNC Ground Floor", "MNC First Floor", "MNC Second Floor", "MNC Outside"]

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
        <div className=" text-gray-950">
            {/* Hidden on screen but visible in print */}
            <div
                ref={contentRef}
                className="hidden print:block"
            >
                

                {category.map((cat, index) => (
                    <div
                        key={index}
                        className={`${index !== 0 ? "print:break-before-page" : ""} "px-8"`} // 🚀 force new page for each category except first
                    >
                        
                <div className='flex items-center gap-5 mt- p-6'>


                </div>
                        <div className="flex flex-col w-full items-center justify-center pb-4">
                            <p className="px-8 font-black text-3xl rounded-full py-2 bg-blue-900 text-gray-50 flex items-center justify-center">
                                {cat}
                            </p>
                            <p className='text-black mt-2'>Superviser: Ahmed Yaseen</p>
                        </div>

                        <div className="min-w-full border-gray-700">
                            <div className='px-12'>
                                <thead>
                                    <tr>
                                        {["No", "Place", "", "Attendants", "Status"].map((item, index) => (
                                            <th
                                                key={index}
                                                className='px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell'
                                            >
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {cleaningData.filter(area => area.category === cat).map((task, index) => (
                                    <tr className='p-8' key={index}>
                                        <td className="px-2 py-1 text-left text-gray-950 ">{index + 1}.</td>
                                        <td className="py-1 w-50  font-semibold text-gray-950 ">{task.place === "Room 33" ? "Clock Room" : task.place === "Room 32" ? "Sick Room" : task.place}</td>
                                        <td className=" py-1 text-gray-950 ">:</td>
                                        <td className="px-4 py-1 text-gray-950 ">
                                            {task.cleaner.map((i, idx) => (
                                                <div className='flex gap-2' key={idx}>
                                                    <input className="w-5 h-5 accent-indigo-600" type="checkbox" />
                                                    <p>{i}</p>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-2 text-gray-950 ">
                                            {task.place === "Bathroom" || task.place === "Toilet" ? (
                                                <>
                                                    {task.cleaner.map((i, idx) => (
                                                        <div key={idx}>
                                                            <input className="w-8 h-5 border border-amber-700 mr-2 accent-indigo-600" type="text" />
                                                            <input className="w-8 h-5 border accent-indigo-600" type="text" />
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    <input className="w-8 h-5 border border-amber-700 accent-indigo-600 mr-2" type="text" />
                                                    <input className="w-8 h-5 border accent-indigo-600" type="text" />
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}




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