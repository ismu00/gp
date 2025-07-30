'use client'
import React, { useState } from 'react'
import {  CircleX, UserRoundPlus, Trash, Plus, Search } from 'lucide-react'

const Class = [
    'All Classes', 'BS 1', 'BS 2', 'BS 3', 'BS 4', 'BS 5'
]
let studentsNames = [
    { name: 'Shameem Ali', level: 'BS 5', rollNo: 34 },
    { name: 'Shibili Erkm', level: 'BS 4', rollNo: 34 },
    { name: 'Shabeer Ali', level: 'BS 2', rollNo: 34 },
    { name: 'Muhsin', level: 'BS 1', rollNo: 34 },
    { name: 'Muflish', level: 'BS 3', rollNo: 34 }
]




function Page() {
    const [searchQuery, setSearchQuery] = useState("")

    const [fillterMenu, setfillterMenu] = useState('All Classes');
    const [addStudnet, setAddStudnet] = useState(false);
    const [addExtraStd, setaddExtraStd] = useState([{ name: "", RoomNumber: '' }]);
    // Add Data
    const [studentClass, setStudentClass] = useState('');
    const handleToggleAddStudent = () => {
        setAddStudnet(!addStudnet);
    }
    const handleAddInput = () => {
        setaddExtraStd([...addExtraStd, { name: "", RoomNumber: '' }])
    }
    const handleInputChange = (input, index) => {
        const { name, value } = input.target;
        const list = [...addExtraStd];
        list[index][name] = value;
        setaddExtraStd(list);

    }
    const fillterData = fillterMenu === "All Classes" ? studentsNames : studentsNames.filter(student => student.level === fillterMenu);
    return (
        <div >
            <div className={`${addStudnet ? 'blur-sm' : ''} mx-4  `}>
                <div className='mx-8 my-8 flex justify-end'>
                    <div onClick={handleToggleAddStudent}>
                        <button className={`bg-indigo-700  text-sm py-3 font-semibold rounded-md cursor-pointer px-6`}><Plus size={18} strokeWidth={3} className='inline' /> <span className='pt-1'>Add Student</span></button>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='flex justify-between mx-10 my-8 '>
                            <div>
                                <select className={`bg-[#1e1e1e]   py-2 px-4 rounded text-md text-gray-200 `} onChange={(e) => setfillterMenu(e.target.value)} >
                                    {Class.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </select>
                                <p className='text-sm font-extralight  mt-2 text-gray-300   text-right '>Showing <span className='font-semibold'>{fillterData.length} </span>students</p>

                            </div>
                            <div className='relative w-full sm:w-auto'>
                                <input
                                    type="text"
                                    placeholder='Search students'
                                    className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-2 mx-8 ' >

                                {fillterData.map((item, index) =>
                                    <div key={index} className={`bg-[#1e1e1e]  py-6 px-8  rounded-xl`}>
                                        <div className='grid grid-cols-5'>
                                            <div className='col-span-4'>
                                                <h1 className='text-lg font-semibold font-sans'>{item.name}</h1>
                                                <p className='inline text-gray-300'>{item.level}</p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <UserRoundPlus size={16} className='cursor-pointer' />
                                                <Trash size={16} className='cursor-pointer hover:text-red-300 transition-colors duration-300' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {addStudnet &&
                <div className="fixed top-50 right-0 left-0  flex items-center justify-center ">
                    <div className="bg-[#1e1e1e]  p-6 rounded-lg shadow-lg w-100 h ">
                        <div className='flex  justify-between'>
                            <p className='text-xl font-semibold mt-4 inline'>Add Students</p>
                            <CircleX className='mt-4 cursor-pointer' onClick={() => setAddStudnet(!addStudnet)} />
                        </div>

                        <div className='max-h-60 mt-6 overflow-auto'>
                        {/* Adding Extra student inputs */}
                        {addExtraStd.map((item, index) =>
                                <div className='grid grid-cols-11 items-center overflow-auto ' key={index}>
                                
                                <div className='col-span-1 mr-0'>
                                    {index+1}
                                </div>
                                <div className='col-span-7 mr-1'>
                                    <input
                                        type='text'
                                        name='name'
                                        value={item.name}
                                        onChange={(e) => handleInputChange(e, index)}
                                        placeholder='Name'
                                        className='w-full border px-3 py-2 rounded' />
                                </div>
                                <div className='col-span-3'>
                                    <input
                                        type='number'
                                        name='RoomNumber'
                                        placeholder='Room '
                                        value={item.RoomNumber}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className='w-full  border px-3 py-2  rounded' />

                                </div>
                            </div>
                            
                            )}
                            </div>
                        <button onClick={() => handleAddInput()} className="flex  w-full justify-end items-center my-2" >
                            <Plus className="w-4 h-4 mx-1" />
                            <span>Add</span>

                        </button>

                        <label className='w-full'>Level</label>
                        <select
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                            className="w-full border px-3 py-2 mb-4 rounded text-gray-50 bg-[#2e2e2e]">

                            {Class.map((cls, index) =>
                                cls === 'All Classes' ? null : <option key={index} value={cls}>{cls}</option>
                            )}
                        </select>

                        <button className='bg-indigo-700 w-full py-2 rounded text-white mt-2 hover:opacity-80 cursor-pointer' type='submit'>Add Student</button>





                    </div>
                </div>
            }
        </div>
    )
}

export default Page