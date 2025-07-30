'use client'
import React, { useState } from 'react'
import { SquarePlus,CircleX,UserRoundPlus,Trash,CirclePlus } from 'lucide-react'

const Class = [
  'All Areas', 'MASJID','MNC Ground Floor','MNC 1st Floor','MNC 2nd Floor','MNC Outside'
]
let studentsNames = [
    {name:'Varanda', area:'MASJID'},
    {name:'Step Right', area:'MNC Ground Floor'},
    {name:'class 5', area:'MNC 2nd Floor'},
    {name:'M', area:'MNC Outside'},
    {name:'Muflish', area:'MNC 1st Floor'}
]


function Page() {
    const [fillterMenu, setfillterMenu] = useState('All Areas');
    const [addArea, setaddArea] = useState(false);
    const [addExtraArea, setaddExtraArea] = useState([{name:""}]);
    // Add Data
    const [studentClass, setStudentClass] = useState('');
    const handleToggleAddStudent = () => {
        setaddArea(!addArea);
    }
    const handleAddInput = () => {
        setaddExtraArea([...addExtraArea, {name:""}])
    }
    const handleInputChange = (input, index) => {
        const {name, value} = input.target;
        const list  = [...addExtraArea];
        list[index][name] = value;
        setaddExtraArea(list);

    }
    const fillterData = fillterMenu === "All Areas" ? studentsNames : studentsNames.filter(student => student.area === fillterMenu);
    return (
        <div >
            <div className={`${addArea ? 'blur-sm' : ''} mx-4  ` }>
                <div className='mx-4 my-8 flex justify-end'>  
                    <div onClick={handleToggleAddStudent}>
                        <button className={` bg-gray-500  min-w-28 text-sm py-2 font-semibold rounded-md cursor-pointer px-4`}><SquarePlus size={18} strokeWidth={2} className='inline' /> <span className='pt-1'>Add Area</span></button>
                    </div>
                </div>
                <div>
                    <div> 
                        <div className='mt-8 mb-2 flex justify-end'>
                            <select className={`bg-gray-500  h-9  0 px-6 rounded `} onChange={(e) => setfillterMenu(e.target.value)} >
                                {Class.map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <p className='font-xl  mb-2 text-right'>Showing <span className='font-semibold'>{fillterData.length} </span>Areas</p>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ' >
                    
                                {fillterData.map((item, index)=>
                                    <div key={index} className={`bg-gray-500  py-6 px-8  rounded-xl`}>
                                        <div className='grid grid-cols-5'>
                                            <div className='col-span-4'>
                                                <h1 className='text-xl font-semibold'>{item.name}</h1>
                                                <p className='inline'>{item.area}</p>
                                            </div>
                                            <div className='flex items-center justify-end'>
                                                
                                                <Trash  className='cursor-pointer w-8' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                
                </div>            
            </div> 
            {addArea && 
            <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black">
                    <div className='flex  justify-between'>
                        <p className='text-xl font-semibold my-2 inline'>Add details of Area</p>
                        <CircleX  className='mb-2 cursor-pointer' onClick={()=> setaddArea(!addArea)} />
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
                    <button onClick={()=> handleAddInput()} className="flex  w-full justify-end items-center " >
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
                
                <button className='bg-gray-500 w-full py-2 rounded text-white mt-2 hover:opacity-80 cursor-pointer'  type='submit'>Add Area</button>

                


                
            </div>
            </div>
            }
        </div>
  )
}

export default Page