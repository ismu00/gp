'use client'
import React, { useEffect, useState } from 'react'
import { SquarePlus, CircleX, Plus, Trash, CirclePlus, Edit, Search, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useData } from '@/app/context/DataContext'

const Class = [
    'All Areas', 'MASJID', 'MNC Ground Floor', 'MNC 1st Floor', 'MNC 2nd Floor', 'MNC Outside'
]



function Page() {

    const { areaData, setAreaData } = useData()
    const [searchQuery, setSearchQuery] = useState("");
    const [fillterMenu, setfillterMenu] = useState('All Areas');
    const [addArea, setAddArea] = useState(false);
    const [addExtraArea, setaddExtraArea] = useState([{ area: "", noPerson:"" }]);
    const [studentClass, setStudentClass] = useState('Masjid');
    
    const handleToggleAddStudent = () => {
        setAddArea(!addArea);
    }
    const handleAddInput = () => {
        setaddExtraArea([...addExtraArea, { place: "", noPerson: "" }])
    }
    const handleInputChange = (input, index) => {
        const { name, value } = input.target;
        const list = [...addExtraArea];
        list[index][name] = value;
        setaddExtraArea(list);

    }

    useEffect(() => {
        if (!areaData || areaData.length === 0) {
            const fetchAreas = async () => {
                try {
                    const res = await fetch('/api/areas');
                    const json = await res.json();
                    if (json.success) {
                        setAreaData(json.result);
                    } else {
                        console.error(json.error);
                    }
                } catch (error) {
                    console.error('Areas fetch failed:', error);
                }
            };

            fetchAreas();
        }
    }, []);


    const fetchAreas = async () => {
        try {
            const res = await fetch('/api/areas');
            const json = await res.json();
            if (json.success) {
                setAreaData(json.result);
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Areas fetch failed:', error);
        }
    };

 const handleSubmit = async () => {
        if (!studentClass) return alert("Please select a Area!");

        const dataToSend = addExtraArea.map((s) => ({
            place: s.place,
            noPerson: s.noPerson,
            category: studentClass
        }));

        try {
            const res = await fetch("/api/areas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await res.json();
            if (result.success) {
                alert("Area added!");
                setAddArea(false);
                setaddExtraArea([{ place: "", noPerson: '' }])
                fetchAreas();



                // Optional: Reload or refetch
            } else {
                console.error(result.error);
                alert("Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to submit");
        }

    };


      const filterData = fillterMenu === "All Areas"
        ? areaData
        : areaData.filter(area => area.category === fillterMenu);

    const displayedArea = filterData?.filter(area =>
        area.place.toLowerCase().includes(searchQuery.toLowerCase())
    );


//     const filterData = areaData?.filter(area => {
//     const matchesCategory = fillterMenu === "All Areas" || area.area === fillterMenu;
//     const matchesSearch = area.place?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           area.category?.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
// });


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
                                <p className='text-sm font-extralight  mt-2 text-gray-300   text-right '>Showing <span className='font-semibold'>{filterData?.length} </span>Areas</p>

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


                                {displayedArea?.map((item, index) =>
                                    <div key={index} className={`bg-[#1e1e1e]  py-6 px-8  rounded-xl`}>
                                        <div className='grid grid-cols-5'>
                                            <div className='col-span-4'>
                                                <h1 className='text-sm sm:text-base md:text-lg font-semibold font-sans'>{item.place}</h1>
                                                <p className='inline text-gray-300'>{item.category}</p>
<h1>{item.noPerson}</h1>
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
              
                <div className="fixed top-50 right-0 left-0  flex items-center justify-center ">
                    <div className="bg-[#1e1e1e]  p-6 rounded-lg shadow-lg w-100 ">
                        <div className='flex  justify-between'>
                            <p className='flex text-xl font-semibold mt-4 gap-2'> <Users />   Add Area</p>
                            <CircleX className='mt-4 cursor-pointer' onClick={() => {
                                setAddArea(!addArea), setaddExtraArea([{ place: "", noPerson: '' }])
                              fetchAreas();
                            }} />
                        </div>
                        <div className='mt-6'><label className='w-full'>Level</label>
                            <select
                                value={studentClass}
                                onChange={(e) => setStudentClass(e.target.value)}
                                className="w-full border px-3 py-2 mb-4 rounded text-gray-50 bg-[#2e2e2e]">

                                {Class.map((cls, index) =>
                                    cls === 'All Areas' ? null : <option key={index} value={cls}>{cls}</option>
                                )}
                            </select></div>
                        <div className='max-h-60 overflow-auto'>
                            {/* Adding Extra student inputs */}

                            {addExtraArea.map((item, index) =>
                                <div className='grid grid-cols-11 items-center overflow-auto ' key={index}>

                                    <div className='col-span-1 mr-0'>
                                        {index + 1}
                                    </div>
                                    <div className='col-span-7 mr-1'>
                                        <input
                                            type='text'
                                            name='place'
                                            value={item.place}
                                            onChange={(e) => handleInputChange(e, index)}
                                            placeholder='area'
                                            className='w-full border px-3 py-2 rounded' />
                                    </div>
                                    <div className='col-span-3'>
                                        <input
                                            type='number'
                                            name='noPerson'
                                            placeholder='Quota '
                                            value={item.noPerson}
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

                        <button
                            onClick={handleSubmit}
                            className='bg-indigo-700 w-full py-2 rounded text-white mt-2 hover:opacity-80 cursor-pointer'
                        >
                            Add Areas
                        </button>


                    </div>
                </div>
            }
        </div>
    )
}

export default Page