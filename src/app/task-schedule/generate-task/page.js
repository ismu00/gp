'use client'
import { useData } from "@/app/context/DataContext";
import { MoveLeft, ClipboardList } from "lucide-react";
import { motion } from 'motion/react'
import { useState, useEffect } from "react";

export default function GenerateTask() {

    const [today, setToday] = useState("");
    const [taskName, setTaskName] = useState("Task 1");
    const [next, setNext] = useState(true)
    const { studentsNames } = useData()

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        setToday(formattedDate);
    }, []);

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function generates() {
        const classMap = {
            1: shuffle(studentsNames.filter((s) => s.className === "BS 1")),
            2: shuffle(studentsNames.filter((s) => s.className === "BS 2")),
            3: shuffle(studentsNames.filter((s) => s.className === "BS 3")),
            4: shuffle(studentsNames.filter((s) => s.className === "BS 4")),
            5: shuffle(studentsNames.filter((s) => s.className === "BS 5")),
        };
        return console.log(classMap)
    }
    function generate() {
        const assignedSet = new Set(); // Track assigned student names or IDs

        const classMap = {
            1: shuffle(students.filter((s) => s.className === "BS 1")),
            2: shuffle(students.filter((s) => s.className === "BS 2")),
            3: shuffle(students.filter((s) => s.className === "BS 3")),
            4: shuffle(students.filter((s) => s.className === "BS 4")),
            5: shuffle(students.filter((s) => s.className === "BS 5")),
        };

        let remaining = [];

        const cleaningAssignments = areas.map((area) => {
            const areaName = area.area.toLowerCase();
            let assigned = [];

            const assignFromClass = (classNum) => {
                const pool = classMap[classNum].filter(s => !assignedSet.has(s.name));
                const selected = pool.slice(0, area.noPerson);
                selected.forEach(s => assignedSet.add(s.name));
                return selected;
            };

            if (areaName === "class 1") {
                assigned = assignFromClass(1);
            } else if (areaName === "class 2") {
                assigned = assignFromClass(2);
            } else if (areaName === "class 3") {
                assigned = assignFromClass(3);
            } else if (areaName === "class 4") {
                assigned = assignFromClass(4);
            } else if (areaName === "class 5") {
                assigned = assignFromClass(5);
            } else {
                if (remaining.length === 0) {
                    remaining = shuffle([
                        ...classMap[1],
                        ...classMap[2],
                        ...classMap[3],
                        ...classMap[4],
                        ...classMap[5],
                    ]);
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

        // Leftover students
        const unassigned = students.filter(s => !assignedSet.has(s.name));

        setCleaningList(cleaningAssignments);
        setLeftOver(unassigned.map((s) => s.name));
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
                            <div onClick={() => setNext(!next)} className="flex gap-1 cursor-pointer">
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