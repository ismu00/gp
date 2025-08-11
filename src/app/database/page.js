'use client'
import Link from 'next/link';
import { motion } from 'motion/react'

import { BrushCleaning, ToolCase, UsersRound } from 'lucide-react';
let studentAreaAssignments = [
    { label: "Students Database", icon: UsersRound, href: "/database/students", no: 291 },
    { label: "Area Database", icon: BrushCleaning, href: "/database/area", no: 291 },
    { label: "Equipments Database", icon: ToolCase, href: "/database/equipments", no: 291 },
]

export default function Database() {
    return (

        <div className='flex overflow-hidden relative z-10'>


            <main className='max-w-7xl mx-8 py-6 px-4 lg:py-8'>
                <motion.div className='flex  gap-1 flex-wrap cursor-pointer '
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}>
                    {studentAreaAssignments.map((item, index) =>
                        <Link key={index} href={item.href}>
                            <div className='bg-[#1e1e1e] hover:bg-[#2f2f2f] backdrop-blur-md  shadow-lg transition-colors duration-300  min-h-60 min-w-60 flex flex-col items-center justify-center flex-wrap gap-4  m-2 ml-0 rounded-lg p-6 px-4 text-gray-100 ' >

                                <item.icon size={40} className='text-gray-100' />

                                <p >{item.label}</p>
                            </div>
                        </Link>
                    )}
                </motion.div>

            </main>

        </div>
    )
}