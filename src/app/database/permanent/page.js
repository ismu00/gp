'use client'
import React, { useEffect, useState } from 'react'
import { Plus, Trash, Edit, Search, Users, CircleX } from 'lucide-react'
import { motion } from 'motion/react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useData } from '@/app/context/DataContext'

const Class = [
    'All Areas', 'Masjid', 'MNC Ground Floor', 'MNC First Floor', 'MNC Second Floor', 'MNC Outside'
]

const CleaningCategories = [
    'Masjid', 'MNC Ground Floor', 'MNC First Floor', 'MNC Second Floor', 'MNC Outside'
]

const Levels = ['BS 1', 'BS 2', 'BS 3', "BS 4", "BS 5"]

function Page() {
    const [areaData, setAreaData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filterMenu, setFilterMenu] = useState('All Areas')
    const [addArea, setAddArea] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    
    const { studentsNames, setStudentsNames } = useData()
    
    const [formData, setFormData] = useState({
        cleaningCategory: 'Masjid',
        cleaningArea: '',
        level: '',
        student1: '',
        student2: ''
    })

    const resetForm = () => {
        setFormData({
            cleaningCategory: 'Masjid',
            cleaningArea: '',
            level: '',
            student1: '',
            student2: ''
        })
        setEditingItem(null)
    }
    
    const fetchAreas = async () => {
        try {
            const res = await fetch('/api/permanent')
            const json = await res.json()
            if (json.success) {
                setAreaData(json.result)
            } else {
                console.error(json.error)
            }
        } catch (error) {
            console.error('Areas fetch failed:', error)
        }
    }

    useEffect(() => {
        fetchAreas()
    }, [])


    
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

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/permanent/${id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            
            if (res.ok) {
                Swal.fire('Deleted!', 'Area has been deleted successfully.', 'success')
                fetchAreas()
            } else {
                Swal.fire('Error!', `Delete failed: ${data.message}`, 'error')
            }
        } catch (err) {
            Swal.fire('Error!', 'Something went wrong while deleting.', 'error')
            console.error(err)
        }
    }

    const handleEdit = (item) => {
        setFormData({
            cleaningCategory: item.category,
            cleaningArea: item.place,
            level: item.level,
            student1: item.cleaner[0] || '',
            student2: item.cleaner[1] || ''
        })
        setEditingItem(item)
        setAddArea(true)
    }

    const handleFormChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
            ...(field === 'cleaningCategory' ? { cleaningArea: '' } : {})
        }))
    }
    
    const handleSubmit = async () => {
        if (!formData.cleaningCategory || !formData.cleaningArea || !formData.level || !formData.student1) {
            return Swal.fire('Error!', 'Please fill in all required fields!', 'error')
        }

        setIsSubmitting(true)

        const cleaners = [formData.student1]
        if (formData.student2) {
            cleaners.push(formData.student2)
        }

        const dataToSend = {
            place: formData.cleaningArea,
            noPerson: cleaners.length.toString(),
            category: formData.cleaningCategory,
            level: formData.level,
            cleaner: cleaners
        }

        try {
            const url = editingItem ? `/api/permanent/${editingItem._id}` : '/api/permanent'
            const method = editingItem ? 'PUT' : 'POST'
            
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingItem ? dataToSend : [dataToSend]),
            })

            const result = await res.json()
            if (result.success) {
                Swal.fire('Success!', editingItem ? 'Area updated!' : 'Area added!', 'success')
                setAddArea(false)
                resetForm()
                fetchAreas()
            } else {
                console.error(result.error)
                Swal.fire('Error!', 'Something went wrong', 'error')
            }
        } catch (err) {
            console.error(err)
            Swal.fire('Error!', 'Failed to submit', 'error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteConfirm = (id) => {
        Swal.fire({
            title: 'Are you sure to Delete?',
            text: 'Once deleted, you will not be able to recover this area!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id)
            }
        })
    }

    const filterData = filterMenu === "All Areas"
        ? areaData
        : areaData.filter(area => area.category === filterMenu)
        
        const displayedArea = filterData?.filter(area =>
            area.place.toLowerCase().includes(searchQuery.toLowerCase())
        )
        
        const filterStudents = studentsNames.filter((a)=> a.className === formData.level)
    return (
        <div>
            <div className={`${addArea ? 'blur-sm' : ''} mx-4`}>
                <div className='mx-8 my-8 flex justify-end'>
                    <button 
                        onClick={() => setAddArea(true)}
                        className='bg-[#1f1f1f] hover:bg-[#2d2d2d] text-sm py-3 font-semibold rounded-md px-6 flex items-center gap-2'
                    >
                        <Plus size={18} strokeWidth={3} />
                        <span>Add New</span>
                    </button>
                </div>

                <div className='flex justify-between mx-10 my-8'>
                    <div>
                        <select 
                            className='bg-[#1e1e1e] py-2 px-4 rounded text-md text-gray-200' 
                            onChange={(e) => setFilterMenu(e.target.value)}
                            value={filterMenu}
                        >
                            {Class.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )}
                        </select>
                        <p className='text-sm font-extralight mt-2 text-gray-300 text-right'>
                            Showing <span className='font-semibold'>{displayedArea?.length}</span> Areas
                        </p>
                    </div>
                    
                    <div className='relative w-full sm:w-auto'>
                        <input
                            type="text"
                            placeholder='Search areas'
                            className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                </div>

                <motion.div 
                    className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2 sm:mx-4 md:mx-8 pb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {displayedArea?.map((item, index) =>
                        <div key={index} className='bg-[#1e1e1e] py-6 px-8 rounded-xl'>
                            <div className='grid grid-cols-5'>
                                <div className='col-span-4'>
                                    <h1 className='text-sm sm:text-base md:text-lg font-semibold font-sans'>{item.place}</h1>
                                    <p className='text-gray-300'>{item.category}</p>
                                    <p className='text-xs text-gray-400 mb-2'>{item.level}</p>
                                    {item.cleaner && item.cleaner.map((cleaner, idx) => 
                                        <p key={idx} className='text-sm text-blue-300'>{cleaner}</p>
                                    )}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Edit 
                                        size={16} 
                                        className='cursor-pointer hover:text-blue-300 transition-colors duration-300' 
                                        onClick={() => handleEdit(item)}
                                    />
                                    <Trash 
                                        size={16} 
                                        className='cursor-pointer hover:text-red-300 transition-colors duration-300' 
                                        onClick={() => handleDeleteConfirm(item._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {addArea && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
                        <div className='flex justify-between items-center'>
                            <p className='flex text-xl font-semibold gap-2'>
                                <Users />
                                {editingItem ? 'Edit Permanent Cleaner' : 'Add Permanent Cleaner'}
                            </p>
                            <CircleX 
                                className='cursor-pointer hover:text-red-300' 
                                onClick={() => {
                                    setAddArea(false)
                                    resetForm()
                                }} 
                            />
                        </div>

                        <div className='mt-6'>
                            <h3 className='text-lg font-semibold mb-4'>Area</h3>
                            
                            <div className='mb-4'>
                                <select
                                    value={formData.cleaningCategory}
                                    onChange={(e) => handleFormChange('cleaningCategory', e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select cleaning category</option>
                                    {CleaningCategories.map((category, index) =>
                                        <option key={index} value={category}>{category}</option>
                                    )}
                                </select>
                            </div>

                            <div className='mb-4'>
                                <input 
                                    className='w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                    type="text" 
                                    placeholder="Enter cleaning area"
                                    value={formData.cleaningArea}
                                    onChange={(e) => handleFormChange('cleaningArea', e.target.value)}
                                />
                            </div>

                            <h3 className='text-lg font-semibold mb-4 mt-6'>Cleaner</h3>
                            
                            <div className='mb-4'>
                                <select
                                    value={formData.level}
                                    onChange={(e) => handleFormChange('level', e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Level</option>
                                    {Levels.map((level, index) =>
                                        <option key={index} value={level}>{level}</option>
                                    )}
                                </select>
                            </div>

                            <div className='mb-4'>
                                <select
                                    value={formData.student1}
                                    onChange={(e) => handleFormChange('student1', e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select student 1</option>
                                    {filterStudents?.map((student) =>
                                        <option key={student._id} value={student.name}>{student.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='mb-4'>
                                <select
                                    value={formData.student2}
                                    onChange={(e) => handleFormChange('student2', e.target.value)}
                                    className="w-full border px-3 py-2 rounded text-gray-50 bg-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select student 2 (optional)</option>
                                    {studentsNames?.filter(student => student.name !== formData.student1).map((student) =>
                                        <option key={student._id} value={student.name}>{student.name}</option>
                                    )}
                                </select>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className='bg-blue-600 w-full py-3 rounded text-white mt-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
                            >
                                {isSubmitting ? "Processing..." : (editingItem ? "Update" : "Submit")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page