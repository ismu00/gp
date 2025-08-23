'use client'
import React, { useState, useEffect } from 'react'
import { CircleX, UserRoundPlus, Trash, Plus, Search, ClipboardList, Users, Edit } from 'lucide-react'
import { useData } from '@/app/context/DataContext';
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)

    // Edit state
    const [editMode, setEditMode] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        room: '',
        className: ''
    });

    useEffect(() => {
        if (studentsNames || studentsNames.lenght > 0) {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!studentsNames || studentsNames.length === 0) {
            const fetchStudents = async () => {
                try {
                    setLoading(true);
                    const res = await fetch('/api/studentsDB');
                    const json = await res.json();
                    if (json.success) {
                        setStudentsNames(json.result);
                    } else {
                        console.error(json.error);
                    }
                } catch (error) {
                    console.error('Fetch failed:', error);
                } finally {
                    setLoading(false)
                }
            };

            fetchStudents();
        }
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/studentsDB');
            const json = await res.json();
            if (json.success) {
                setStudentsNames(json.result);
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Fetch failed:', error);
        } finally {
            setLoading(false);
        }
    };

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

    // Edit handlers
    const handleEditClick = (student) => {
        setEditingStudent(student);
        setEditFormData({
            name: student.name,
            room: student.room,
            className: student.className
        });
        setEditMode(true);
    }

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleEditSubmit = async () => {
        if (!editFormData.name || !editFormData.className) {
            alert("Please fill all fields!");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/studentsDB/${editingStudent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editFormData),
            });

            const result = await res.json();
            if (result.success) {
                alert("Student updated successfully!");
                setEditMode(false);
                setEditingStudent(null);
                setEditFormData({ name: '', room: '', className: '' });
                fetchStudents();
            } else {
                console.error(result.error);
                alert("Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleEditCancel = () => {
        setEditMode(false);
        setEditingStudent(null);
        setEditFormData({ name: '', room: '', className: '' });
    }

    // Delete handlers
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/studentsDB/${id}`, { method: 'DELETE' });
            const data = await res.json();

            if (res.ok) {
                setStudentsNames(prev => prev.filter(student => student._id !== id));
            } else {
                Swal.fire("Failed!", data.message || "Delete failed", "error");
            }
        } catch (err) {
            Swal.fire("Error!", "Something went wrong while deleting.", "error");
            console.error(err);
        }
    };

    const handleDeletes = (id) => {
        Swal.fire({
            title: 'Are you sure to Delete?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: '#fff',
            color: '#000',
            customClass: {
                popup: 'rounded-lg p-2 bg-red-200',
                title: 'text-lg font-semibold text-red-100',
                htmlContainer: 'text-sm text-gray-700',
                confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded',
                cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded ml-2',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
                Swal.fire('Deleted!', 'Student has been deleted.', 'success');
            }
        });
    };

    const handleSubmit = async () => {
        if (!studentClass) return alert("Please select a class!");
        setIsSubmitting(true);

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
            } else {
                console.error(result.error);
                alert("Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to submit");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filterData = fillterMenu === "All Classes"
        ? studentsNames
        : studentsNames.filter(student => student.className === fillterMenu);

    const displayedStudents = filterData?.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className={`${addStudent || editMode ? 'blur-sm' : ''} mx-4`}>
                <div className='mx-8 my-8 flex justify-end'>
                    <div onClick={handleToggleAddStudent}>
                        <button className={`bg-[#1f1f1f] hover:bg-[#2d2d2d] text-sm py-3 font-semibold rounded-md cursor-pointer px-6`}>
                            <Plus size={18} strokeWidth={3} className='inline' /> <span className='pt-1'>Add Student</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='flex justify-between mx-10 my-8'>
                            <div>
                                <select className={`bg-[#1e1e1e] py-2 px-4 rounded text-md text-gray-200`} onChange={(e) => setfillterMenu(e.target.value)}>
                                    {Class.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </select>
                                <p className='text-sm font-extralight mt-2 text-gray-300 text-right'>Showing <span className='font-semibold'>{displayedStudents?.length} </span>students</p>
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
                            {loading ? (
                                <div className="flex flex-col justify-center items-center py-10 gap-2 h-[calc(100vh-400px)] w-full">
                                    <Loader2 className="animate-spin text-gray-300" size={36} />
                                    <span className="text-gray-400 text-sm">Loading...</span>
                                </div>
                            ) : displayedStudents?.length === 0 ? (
                                <div className="flex flex-col justify-center items-center py-10 gap-3 h-[calc(100vh-400px)] w-full text-center">
                                    <p className="text-gray-400">No students found.
                                        <br /> This might be due to a network issue.
                                    </p>
                                    <button
                                        onClick={fetchStudents}
                                        className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : (
                                <motion.div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2 sm:mx-4 md:mx-8 pb-8'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}>
                                    {displayedStudents?.map((item, index) =>
                                        <div key={index} className={`${item.vip ? "bg-red-900" : "bg-[#1e1e1e]"} py-6 px-8 rounded-xl`}>
                                            <div className='grid grid-cols-5'>
                                                <div className='col-span-4'>
                                                    <h1 className='text-sm sm:text-base md:text-lg font-semibold font-sans'>{item.name}</h1>

                                                    <div className='flex gap-1.5 text-gray-300'>
                                                     <p className='text-gray-300'>{item.className}</p>   
                                                     <p className='text-gray-400'>Room: {item.room}</p>

                                                     </div>
                                                  
                                                </div>
                                                <div className='flex items-center gap-2 w-10'>
                                                    <Edit 
                                                        size={16} 
                                                        className='cursor-pointer hover:text-blue-300' 
                                                        onClick={() => handleEditClick(item)}
                                                    />
                                                    <Trash 
                                                        size={16} 
                                                        className='cursor-pointer hover:text-red-300 transition-colors duration-300' 
                                                        onClick={() => handleDeletes(item._id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Student Modal */}
            {addStudent &&
                <div className="fixed top-50 right-0 left-0 flex items-center justify-center">
                    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-100">
                        <div className='flex justify-between'>
                            <p className='flex text-xl font-semibold mt-4 gap-2'><Users /> Add Students</p>
                            <CircleX className='mt-4 cursor-pointer' onClick={() => {
                                setAddStudent(!addStudent), setaddExtraStd([{ name: "", RoomNumber: '' }])
                                fetchStudents();
                            }} />
                        </div>
                        <div className='mt-6'>
                            <label className='w-full'>Level</label>
                            <select
                                value={studentClass}
                                onChange={(e) => setStudentClass(e.target.value)}
                                className="w-full border px-3 py-2 mb-4 rounded text-gray-50 bg-[#2e2e2e]">
                                {Class.map((cls, index) =>
                                    cls === 'All Classes' ? null : <option key={index} value={cls}>{cls}</option>
                                )}
                            </select>
                        </div>
                        <div className='max-h-60 overflow-auto'>
                            {addExtraStd.map((item, index) =>
                                <div className='grid grid-cols-11 items-center overflow-auto' key={index}>
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
                                            placeholder='Room'
                                            value={item.RoomNumber}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className='w-full border px-3 py-2 rounded' />
                                    </div>
                                </div>
                            )}
                        </div>
                        <button onClick={() => handleAddInput()} className="flex w-full justify-end items-center my-2">
                            <Plus className="w-4 h-4 mx-1" />
                            <span>Add</span>
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`bg-indigo-700 w-full py-2 rounded text-white mt-2 hover:opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? "Adding..." : "Add Students"}
                        </button>
                    </div>
                </div>
            }

            {/* Edit Student Modal */}
            {editMode && (
                <div className="fixed top-50 right-0 left-0 flex items-center justify-center">
                    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-100">
                        <div className='flex justify-between'>
                            <p className='flex text-xl font-semibold mt-4 gap-2'><Edit /> Edit Student</p>
                            <CircleX className='mt-4 cursor-pointer' onClick={handleEditCancel} />
                        </div>
                        
                        <div className='mt-6'>
                            <label className='w-full block mb-2'>Student Name</label>
                            <input
                                type='text'
                                name='name'
                                value={editFormData.name}
                                onChange={handleEditInputChange}
                                placeholder='Student name'
                                className='w-full border px-3 py-2 mb-4 rounded text-gray-50 bg-[#2e2e2e]'
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='w-full block mb-2'>Room Number</label>
                            <input
                                type='number'
                                name='room'
                                value={editFormData.room}
                                onChange={handleEditInputChange}
                                placeholder='Room number'
                                className='w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e]'
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='w-full block mb-2'>Class</label>
                            <select
                                name='className'
                                value={editFormData.className}
                                onChange={handleEditInputChange}
                                className="w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e]">
                                {Class.map((cls, index) =>
                                    cls === 'All Classes' ? null : <option key={index} value={cls}>{cls}</option>
                                )}
                            </select>
                        </div>

                        <div className='flex gap-3'>
                            <button
                                onClick={handleEditCancel}
                                className="bg-gray-600 hover:bg-gray-700 w-full py-2 rounded text-white cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                disabled={isSubmitting}
                                className={`bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isSubmitting ? "Updating..." : "Update Student"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page