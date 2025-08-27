'use client'

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { ClipboardPen, Printer } from 'lucide-react'

function PrintComp({ data, filterMenu }) {
    const contentRef = useRef()

    const handlePrint = useReactToPrint({
        contentRef, // ✅ v3+ API
    })


    const category = ["Masjid", "MNC Ground Floor", "MNC First Floor", "MNC Second Floor", "MNC Outside"]


    const leaders = ["Midlaj Muhyudheen (4)", "Salim Abdul Rahman (4)", "Muhammed Jouhar (5)","Muhammed Bilal (5)","Muhammed Shahid (5)"        ]


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
                            <p className="px-8 font-black text-3xl rounded-full py-2 bg-black text-gray-50 flex items-center justify-center">
                                {cat}
                            </p>
                            <p className='text-black mt-2'>Supervisor: {leaders[index]}</p>
                        </div>

                        <div className="min-w-full border-gray-700">
                            <div className='px-12'>
                                <thead>
                                    <tr>
                                        {["No", "Place", "", "Cleaning Crew"].map((item, index) => (
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
                                                    <p>{i}</p>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-1 text-gray-950 ">
                                            {(task.place === "Bathroom" || task.place === "Toilet") && (
                                                <>
                                                    {task.cleaner.map((i, idx) => {
                                                        let bath = idx + 1
                                                        return (
                                                            <div key={idx}>
                                                                {"["+ bath + "]"}
                                                            </div>
                                                        )
                                                    })}
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
                    className="bg-blue-600 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2     rounded"
                >
                    <Printer size={16} />
                </button>
            </div>
        </div>
    )
}

export default PrintComp
