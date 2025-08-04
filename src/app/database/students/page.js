'use client'
import React, { useState, useEffect } from 'react'
import { CircleX, UserRoundPlus, Trash, Plus, Search, ClipboardList, Users, Edit } from 'lucide-react'
import { useData } from '@/app/context/DataContext';
import { motion } from 'motion/react'

const Class = [
    'All Classes', 'BS 1', 'BS 2', 'BS 3', 'BS 4', 'BS 5'
]




function Page() {

    const [searchQuery, setSearchQuery] = useState("");
    const [vip, setVip] = useState(true);
    const { studentsNames, setStudentsNames } = useData()
    const [fillterMenu, setfillterMenu] = useState('All Classes');
    const [addStudent, setAddStudent] = useState(false);
    const [addExtraStd, setaddExtraStd] = useState([{ name: "", RoomNumber: '' }]);
    const [studentClass, setStudentClass] = useState('BS 1');

    useEffect(() => {
        if (!studentsNames || studentsNames.length === 0) {
            const fetchStudents = async () => {
                try {
                    const res = await fetch('/api/studentsDB');
                    const json = await res.json();
                    if (json.success) {
                        setStudentsNames(json.result);
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
            const res = await fetch('/api/studentsDB');
            const json = await res.json();
            if (json.success) {
                setStudentsNames(json.result);
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    // useEffect(() => {
    //     fetchStudents();
    // }, []);


    const handleToggleAddStudent = () => {
        setAddStudent(!addStudent);
        console.log(studentsNames)
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


    // Add this inside your component:
    const handleSubmit = async () => {
        if (!studentClass) return alert("Please select a class!");

        const dataToSend = addExtraStd.map((s) => ({
            name: s.name,
            room: s.RoomNumber,
            className: studentClass
        }));

        try {
            const res = await fetch("/api/studentsDB", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await res.json();
            if (result.success) {
                alert("Students added!");
                setAddStudent(false);
                setaddExtraStd([{ name: "", RoomNumber: '' }])
                fetchStudents();



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


    const filterData = fillterMenu === "All Classes"
        ? studentsNames
        : studentsNames.filter(student => student.className === fillterMenu);

    const displayedStudents = filterData?.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div >
            <div className={`${addStudent ? 'blur-sm' : ''} mx-4  `}>
                <div className='mx-8 my-8 flex justify-end'>
                    <div onClick={handleToggleAddStudent}>
                        <button className={`bg-[#1f1f1f] hover:bg-[#2d2d2d] text-sm py-3 font-semibold rounded-md cursor-pointer px-6`}><Plus size={18} strokeWidth={3} className='inline' /> <span className='pt-1'>Add Student</span></button>
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
                                <p className='text-sm font-extralight  mt-2 text-gray-300   text-right '>Showing <span className='font-semibold'>{displayedStudents?.length} </span>students</p>

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

                                {displayedStudents?.map((item, index) =>
                                    <div key={index} className={`${item.vip ? "bg-red-900" : "bg-[#1e1e1e]"}  py-6 px-8 rounded-xl`}>
                                        <div className='grid grid-cols-5'>
                                            <div className='col-span-4'>
                                                <h1 className='text-sm sm:text-base md:text-lg font-semibold font-sans'>{item.name}</h1>
                                                <p className='inline text-gray-300'>{item.className}</p>
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
            {addStudent &&
                <div className="fixed top-50 right-0 left-0  flex items-center justify-center ">
                    <div className="bg-[#1e1e1e]  p-6 rounded-lg shadow-lg w-100 ">
                        <div className='flex  justify-between'>
                            <p className='flex text-xl font-semibold mt-4 gap-2'> <Users />   Add Students</p>
                            <CircleX className='mt-4 cursor-pointer' onClick={() => {
                                setAddStudent(!addStudent), setaddExtraStd([{ name: "", RoomNumber: '' }])
                                fetchStudents();
                            }} />
                        </div>
                        <div className='mt-6'><label className='w-full'>Level</label>
                            <select
                                value={studentClass}
                                onChange={(e) => setStudentClass(e.target.value)}
                                className="w-full border px-3 py-2 mb-4 rounded text-gray-50 bg-[#2e2e2e]">

                                {Class.map((cls, index) =>
                                    cls === 'All Classes' ? null : <option key={index} value={cls}>{cls}</option>
                                )}
                            </select></div>
                        <div className='max-h-60 overflow-auto'>
                            {/* Adding Extra student inputs */}

                            {addExtraStd.map((item, index) =>
                                <div className='grid grid-cols-11 items-center overflow-auto ' key={index}>

                                    <div className='col-span-1 mr-0'>
                                        {index + 1}
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

                        <button
                            onClick={handleSubmit}
                            className='bg-indigo-700 w-full py-2 rounded text-white mt-2 hover:opacity-80 cursor-pointer'
                        >
                            Add Student
                        </button>


                    </div>
                </div>
            }
        </div>
    )
}

export default Page