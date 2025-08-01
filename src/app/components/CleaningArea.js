import React from 'react'
import Link from 'next/link';
import { BrushCleaning,UsersRound } from 'lucide-react';

let  studentAreaAssignments = [
    { label:"Areas" ,icon: BrushCleaning, href:"/database/area"},
    {label:"Students List", icon: UsersRound, href:"/database/students"},
    {label:"Equipments", icon: UsersRound, href:"/database/equipments"}
]
function CleaningArea() {
  return (
    <div  className='cursor-pointer '>
            {studentAreaAssignments.map((item,index) => 
                <Link key={index} href={item.href}>
                    <div className='bg-[#1e1e1e]  min-h-20 min-w-3xs  m-2 ml-0 rounded-lg p-6 px-4 text-gray-100 ' > 
                           
                        <item.icon className='text-gray-100' />

                        <p>{item.label}</p>
                    </div>
                </Link>
            )}
    </div>
  )
}

export default CleaningArea