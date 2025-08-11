import TableData from '@/app/components/TableData'
import { notFound } from 'next/navigation'
import EachTaskData from '../page'
import { Edit, Printer, Search, Trash2 } from 'lucide-react'

// simulate DB/API call
async function getTaskById(id) {
    const res = await fetch(`http://localhost:3000/api/taskList/${id}`, {
        cache: 'no-store',
    })

    if (!res.ok) return null
    const json = await res.json()
    return json.result
}

export default async function ItemPage({ params }) {
    const { id } = await params

    const item = await getTaskById(id)

    if (!item) {
        return notFound()
    }

    return (
        <div className="p- 2">


            <div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className='bg-[#1e1e1e] h-150 overflow-y-scroll
                 mt-8 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-6 my-4'
            >
            

                <div className=''>
                    <table className='min-w-full divide-y divide-gray-700'>
                        <thead>
                            <tr>
                                {["No", "Task", "Assignment"].map((item, index) => (
                                    <th
                                        key={index}
                                        className='px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell'
                                    >
                                        {item}
                                    </th>


                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y  divide-gray-700'>

                            <tr
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
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
                                            <button className='text-sm   text-indigo-500 hover:text-indigo-300'><Edit size={16} /></button>
                                            <button className='text-sm  text-gray-500   hover:text-gray-300  px-3 py-1 rounded-md'><Trash2 size={16} /></button>

                                        </div>

                                    </div>
                                </td>

                            

                            </tr>



                            {item.cleaningList.map((item, index) => (
                                <tr
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    className='hidden overflow-auto sm:table-row mb-4 sm:mb-0 border-b-0 border=gray-700 sm:border-none p-2 sm:p-0 hover:bg-[#2b2b2b]'
                                >
                                    <td className='align-top px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>{index + 1}</td>
                                    <td className='align-top px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>{item.place}</td>
                                    <td className='align-top px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>
                                        {item.cleaner.map((person, idx) => (
                                            <p key={idx}>{person}</p>
                                        ))}
                                    </td>
                                    <td className='align-top px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>

                                    </td>
                                    <td className='align-top px-3 sm:px-6 py-2 sm:py-3 text-white hidden sm:table-cell'>


                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
                    <div> 
                    </div>
 <button className='text-sm absolute   text-indigo-500 hover:text-indigo-300'><Printer size={16} /></button>                       
            </div>
        </div>
    )
}
