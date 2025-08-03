'use client'
import { useData } from "@/app/context/DataContext";
import { MoveLeft, ClipboardList } from "lucide-react";
import { motion } from 'motion/react'
import { useState, useEffect } from "react";

export default function GenerateTask() {

    const [today, setToday] = useState("");
    const [taskName, setTaskName] = useState("Task 1");
    const [next, setNext] = useState(true)
    const { studentsNames, setStudentsNames } = useData()
    const { areaData, setAreaData } = useData()
    const [cleaningList, setCleaningList] = useState([])
    const [leftover, setLeftOver] = useState()

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        setToday(formattedDate);
    }, []);



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


    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
  
    function generates() {
        const assignedSet = new Set(); 

        const classMap = [...new Set(studentsNames.map(s => s.className))]
            .sort((a, b) => {
                const aNum = parseInt(a.match(/\d+/));
                const bNum = parseInt(b.match(/\d+/));
                return aNum - bNum;
            })
            .reduce((acc, className, index) => {
                acc[index + 1] = shuffle(studentsNames.filter(s => s.className === className));
                return acc;
            }, {});

        const roomMap = [...new Set(studentsNames.map(s => s.room))]
            .reduce((acc, room) => {
                acc[room] = shuffle(studentsNames.filter(s => s.room === room));
                return acc;
            }, {});


  console.log(

        "before generates",
        roomMap[16].filter(s => !assignedSet.has(s.name))

    )


        const sortedAreaData = areaData.sort((a, b) => {
            const getPriority = (place) => {
                const p = place.toLowerCase();
                if (p.startsWith("class")) return 0;
                if (p.startsWith("room")) return 1;
                return 2;
            };
            const priorityA = getPriority(a.place);
            const priorityB = getPriority(b.place);
            return priorityA !== priorityB
                ? priorityA - priorityB
                : a.place.localeCompare(b.place);
        });

        let remaining = [];

        const cleaningAssignments = sortedAreaData.map((area) => {
            const areaName = area.place.toLowerCase();
            let assigned = [];

            const assignFromClass = (classNum) => {
                const pool = classMap[classNum]?.filter(s => !assignedSet.has(s.name)) || [];
                const selected = pool.slice(0, area.noPerson);
                selected.forEach(s => assignedSet.add(s.name));
                return selected;
            };

            const assignFromRoom = (roomKey) => {
                const pool = roomMap[roomKey]?.filter(s => !assignedSet.has(s.name)) || [];
                const selected = pool.slice(0, area.noPerson);
                selected.forEach(s => assignedSet.add(s.name));
                return selected;
            };

            const classMatch = areaName.match(/class (\d+)/);
            const roomMatch = areaName.match(/room (\d+)/);

            if (classMatch) {
                const classNum = parseInt(classMatch[1]);
                assigned = assignFromClass(classNum);
            } else if (roomMatch) {
                const roomKey = roomMatch[1];
                assigned = assignFromRoom(roomKey);
            } else {
                if (remaining.length === 0) {
                    remaining = Object.values(classMap).flat();
                }
                const pool = remaining.filter(s => !assignedSet.has(s.name));
                assigned = pool.slice(0, area.noPerson);
                assigned.forEach(s => assignedSet.add(s.name));
            }

            return {
                ...area,
                cleaner: assigned.map((s) => s?.name || "—"),
            };
        });

        const unassigned = studentsNames.filter(s => !assignedSet.has(s.name));
        setCleaningList(cleaningAssignments);
        setLeftOver(unassigned.map((s) => s.name));

        
        console.log("Cleaning List",
            cleaningAssignments
            
        )
        
        
        console.log("After generates",
            roomMap[16].filter(s => !assignedSet.has(s.name))
            
        )

        console.log("Left over", unassigned.map((s) => s.name))
    }



    return (
        <div className="flex-1 relative">
            <main className="max-width-7xl  flex items-center justify-center px-8 py-10" >

                {next === true ?

                    <motion.div className="w-100 h-120 overflow-hidden  py-4 px-6 rounded-2xl backdrop-blur-lg shadow-lg bg-[#1e1e1e]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="flex justify-center gap-1 text-center text-lg font-bold  py-6 w-full"><ClipboardList /> New Task</h1>
                        <div className="bg-[#2e2e2e] mb-2 py-2 text-center rounded-lg ">
                            <p>Choose Levels for Task </p>
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">1. Level 1</label>
                            <input className="text-2xl w-5 h-5" type="checkbox" name="" id="" />
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">2. Level 2</label>
                            <input className="text-2xl w-5 h-5" type="checkbox" name="" id="" />
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">3. Level 3</label>
                            <input className="text-2xl w-5 h-5" type="checkbox" name="" id="" />
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">4. Level 4</label>
                            <input className="text-2xl w-5 h-5" type="checkbox" name="" id="" />
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">5. Level 5</label>
                            <input className="text-2xl w-5 h-5" type="checkbox" name="" id="" />
                        </div>
                        <div className="w-full px-6 py-4 mt-2">

                            <button onClick={() => setNext(!next)} className="font-bold w-full py-2 px-8 bg-green-800 rounded-lg cursor-pointer hover:bg-green-700 transition-colors">Next</button>
                        </div>
                    </motion.div>

                    :

                    <motion.div
                        className="w-100  h-120 overflow-hidden  py-4 px-6  rounded-2xl backdrop-blur-lg shadow-lg bg-[#1e1e1e] flex flex-col"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="flex justify-center gap-1 text-center text-lg font-bold  py-6 w-full"><ClipboardList /> New Task</h1>

                        <div className="bg-[#2e2e2e] mb-2 py-2 text-center rounded-lg">
                            <p>Enter Task Details</p>
                        </div>

                        <div className="flex gap-2 items-center px-4 py-3 border-gray-700">
                            <label className="text-sm w-20 text-gray-300">Task Name:</label>
                            <input
                                className="text-base outline rounded-lg h-8 px-2 focus:outline-none  focus:ring-2"
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 items-center px-4 py-3 border-gray-700">
                            <label className="text-sm w-20 text-gray-300">Date:</label>
                            <input className="text-base outline  rounded-lg h-8 px-2 focus:outline-none  focus:ring-2" type="date"

                                value={today}
                                onChange={(e) => setToday(e.target.value)} />
                        </div>

                        <div className="gap-2 items-center px-4 pt-3 border-gray-700">
                            <label className="text-sm w-20 text-gray-300">Discription:</label>
                            <textarea
                                placeholder=""
                                className="w-full h-26 px-3 py-2  text-gray-100  border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 "
                            />  </div>

                        {/* BUTTONS */}
                        <div className="mt-auto flex items-center justify-between px-6 pb-4 gap-2">
                            <div onClick={() => console.log("cleaningList", cleaningList)} className="flex gap-1 cursor-pointer">
                                <MoveLeft className="text-gray-400" />
                                <button className="flex font-extralight text-gray-400 cursor-pointer">Back</button>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => generates()}
                                    className="font-bold py-2 px-8 bg-green-800 hover:bg-green-700 transition-colors duration-300 rounded-lg cursor-pointer">Generate</button>
                            </div>
                        </div>
                    </motion.div>
                }

            </main>
        </div>
    )
} 