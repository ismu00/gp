'use client'
import React, { useEffect, useState } from 'react'
import { SquarePlus, CircleX, Plus, Trash, CirclePlus, Edit, Search } from 'lucide-react'
import { motion } from 'motion/react'
import { useData } from '@/app/context/DataContext'

const Class = [
    'All Areas', 'MASJID', 'MNC Ground Floor', 'MNC 1st Floor', 'MNC 2nd Floor', 'MNC Outside'
]
let areas = [
    { name: 'Varanda', area: 'MASJID' },
    { name: 'Step Right', area: 'MNC Ground Floor' },
    { name: 'class 5', area: 'MNC 2nd Floor' },
    { name: 'M', area: 'MNC Outside' },
    { name: 'Muflish', area: 'MNC 1st Floor' }
]


function Page() {

    const {areas, setAreas} = useData()
    const [searchQuery, setSearchQuery] = useState("");
    const [fillterMenu, setfillterMenu] = useState('All Areas');
    const [addArea, setaddArea] = useState(false);
    const [addExtraArea, setaddExtraArea] = useState([{ area: "" }]);
    const [studentClass, setStudentClass] = useState('');
    const handleToggleAddStudent = () => {
        setaddArea(!addArea);
    }
    const handleAddInput = () => {
        setaddExtraArea([...addExtraArea, { name: "", noPerson: ""}])
    }
    const handleInputChange = (input, index) => {
        const { name, value } = input.target;
        const list = [...addExtraArea];
        list[index][name] = value;
        setaddExtraArea(list);

    }

    useEffect(() => {
            if (!areas || areas.length === 0) {
                const fetchStudents = async () => {
                    try {
                        const res = await fetch('/api/areas');
                        const json = await res.json();
                        if (json.success) {
                            setAreas(json.result);
                        } else {
                            console.error(json.error);
                        }
                    } catch (error) {
                        console.error('Fetch failed:', error);
                    }
                };
    
                fetchStudents();
            }
        }, []);
    
    
        const fetchStudents = async () => {
            try {
                const res = await fetch('/api/areas');
                const json = await res.json();
                if (json.success) {
                    setAreas(json.result);
                } else {
                    console.error(json.error);
                }
            } catch (error) {
                console.error('Fetch failed:', error);
            }
        };
    

    const fillterData = fillterMenu === "All Areas" ? areas : areas.filter(student => student.area === fillterMenu);

    const filterData = fillterMenu === "All Areas"
        ? areas
        : areas.filter(student => student.area === fillterMenu);

    // const displayedStudents = filterData?.filter(student =>
    //     area.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <div >
            <div className={`${addArea ? 'blur-sm' : ''} mx-4  `}>
                <div className='mx-8 my-8 flex justify-end'>
                    <div onClick={handleToggleAddStudent}>
                        <button className={`bg-[#1f1f1f] hover:bg-[#2d2d2d] text-sm py-3 font-semibold rounded-md cursor-pointer px-6`}><Plus size={18} strokeWidth={3} className='inline' /> <span className='pt-1'>Add Area</span></button>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='flex justify-between mx-10 my-8 '>
                            <div>
                                <select className={`bg-[#1e1e1e] w-29  py-2 px-4 rounded text-md text-gray-200 `} onChange={(e) => setfillterMenu(e.target.value)} >
                                    {Class.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </select>
                                <p className='text-sm font-extralight  mt-2 text-gray-300   text-right '>Showing <span className='font-semibold'>{fillterData?.length} </span>Areas</p>

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
                            <motion.div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 mx-2 sm:mx-4 md:mx-8 pb-8'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }} >


                                {fillterData?.map((item, index) =>
                                    <div key={index} className={`bg-[#1e1e1e]  py-6 px-8  rounded-xl`}>
                                        <div className='grid grid-cols-5'>
                                            <div className='col-span-4'>
                                                <h1 className='text-sm sm:text-base md:text-lg font-semibold font-sans'>{item.place}</h1>
                                                <p className='inline text-gray-300'>{item.area}</p>
                                            </div>
                                            <div className='flex items-center gap-2 w-10'>
                                                <Edit size={16} className='cursor-pointer  hover:text-blue-300' />
                                                <Trash size={16} className='cursor-pointer hover:text-red-300 transition-colors duration-300' />

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
            {addArea &&
                <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black">
                        <div className='flex  justify-between'>
                            <p className='text-xl font-semibold my-2 inline'>Add details of Area</p>
                            <CircleX className='mb-2 cursor-pointer' onClick={() => setaddArea(!addArea)} />
                        </div>
                        {/* Adding Extra Area inputs */}
                        {addExtraArea.map((item, index) =>
                            <div className='grid grid-cols-10' key={index}>
                                <div className='col-span-10 mr-1'>

                                    <input
                                        type='text'
                                        name='name'
                                        value={item.name}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className='w-full border px-3 py-2 mb-1 rounded' />
                                </div>

                            </div>)}
                        <button onClick={() => handleAddInput()} className="flex  w-full justify-end items-center " >
                            <CirclePlus className="w-4 h-4 mx-1" />
                            <span className='text-sm'>Add</span>

                        </button>

                        <label className='w-full'>area</label>
                        <select
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                            className="w-full border px-3 py-2 mb-4 rounded">

                            {Class.map((cls, index) =>
                                cls === 'All Areas' ? null : <option key={index} value={cls}>{cls}</option>
                            )}
                        </select>

                        <button className='bg-gray-500 w-full py-2 rounded text-white mt-2 hover:opacity-80 cursor-pointer' type='submit'>Add Area</button>





                    </div>
                </div>
            }
        </div>
    )
}

export default Page