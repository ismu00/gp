'use client'
import { useData } from "@/app/context/DataContext";
import { MoveLeft, ClipboardList } from "lucide-react";
import { motion } from 'motion/react'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GenerateTask() {

    const [today, setToday] = useState("");
    const [taskName, setTaskName] = useState("");
    const [next, setNext] = useState(true)
    const { studentsNames, setStudentsNames } = useData()
    const { areaData, setAreaData } = useData()
    const { taskList, setTaskList } = useData()
    const [cleaningList, setCleaningList] = useState([])
    const [leftover, setLeftOver] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    // Add shuffle order state
    const [shuffleOrder, setShuffleOrder] = useState([null, null, null, null, null]);
    
    // Add category order state
    const [categoryOrder, setCategoryOrder] = useState(['Masjid', 'MNC Ground Floor', 'MNC First Floor', 'MNC Second Floor', 'MNC Outside']);

    // Get available class options for each dropdown
    const getAvailableOptions = (currentIndex) => {
        const usedClasses = shuffleOrder
            .map((classNum, index) => index !== currentIndex ? classNum : null)
            .filter(classNum => classNum !== null);
        
        return [1, 2, 3, 4, 5].filter(classNum => !usedClasses.includes(classNum));
    };
    
const navigation = useRouter()

    useEffect(() => {
  const fetchAllData = async () => {
    if (!studentsNames.length) {
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
    if (!areaData.length) {
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
    if (!taskList.length) {
      
            const fetchTaskList = async () => {
                try {
                    const res = await fetch('/api/taskList');
                    const json = await res.json();
                    if (json.success) {
                        setTaskList(json.result);
                    } else {
                        console.error(json.error);
                    }
                } catch (error) {
                    console.error('Tasklist fetch failed:', error);
                }
            };
            fetchTaskList();

            setTaskName(`Task ${taskList?.length}`);
    }
  };
  fetchAllData();
}, []);


    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        setToday(formattedDate);
    }, []);

    useEffect(() => {
        if (cleaningList.length > 0) {
            saveTaskToDB();

        }
    }, [cleaningList]);



    useEffect(() => {

        if (taskList.length === 0) {

        } else {

            setTaskName(`Task ${taskList?.length}`);
        }
    }, [taskList]);


useEffect(() => {
  if (taskList && taskList.length >= 0) {
    setTaskName(`Task ${taskList.length + 1}`);
  }
}, [taskList]);


    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Function to shuffle students based on shuffleOrder
    function shuffleStudentsByOrder(students, shuffleOrder) {
        // Group students by class
        const classesByNumber = {};
        students.forEach(student => {
            const classNum = parseInt(student.className.match(/\d+/));
            if (!classesByNumber[classNum]) {
                classesByNumber[classNum] = [];
            }
            classesByNumber[classNum].push(student);
        });

        // Reorder based on shuffleOrder and flatten
        const shuffledStudents = [];
        shuffleOrder.forEach(classNum => {
            if (classNum && classesByNumber[classNum]) {
                shuffledStudents.push(...classesByNumber[classNum]);
            }
        });

        return shuffledStudents;
    }

    function generates() {
        setIsSubmitting(true)
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

            // Get category priority based on categoryOrder state
            const getCategoryPriority = (area) => {
                if (!area.category) return 999; // Items without category go last
                
                const categoryIndex = categoryOrder.indexOf(area.category);
                return categoryIndex === -1 ? 999 : categoryIndex; // Unknown categories go last
            };

            const priorityA = getPriority(a.place);
            const priorityB = getPriority(b.place);
            
            // If different main priorities, sort by priority
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }
            
            // If both are general areas (priority 2), sort by category first
            if (priorityA === 2 && priorityB === 2) {
                const categoryA = getCategoryPriority(a);
                const categoryB = getCategoryPriority(b);
                
                if (categoryA !== categoryB) {
                    return categoryA - categoryB;
                }
            }
            
            // Within same priority and category, sort alphabetically
            return a.place.localeCompare(b.place);
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
                    // Shuffle students based on shuffleOrder before flattening
                    const shuffledStudents = shuffleStudentsByOrder(studentsNames, shuffleOrder);
                    remaining = shuffledStudents;
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

    const saveTaskToDB = async () => {
        const description = document.querySelector("textarea").value;

        const data = {
            taskName,
            status: false,
            date: today,
            description,
            cleaningList,
            leftover,
        };

        try {
            const res = await fetch('/api/taskList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                alert("Task saved to database!");


            } else {
                alert(`Failed to save: ${result.error}`);
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("An error occurred while saving.");
        }finally{
                    setIsSubmitting(false)
                    navigation.push("/task-schedule")

        }
    };

    // Function to change category order (you can call this from UI if needed)
    const updateCategoryOrder = (newOrder) => {
        setCategoryOrder(newOrder);
    };

    // Function to change shuffle order (you can call this from UI if needed)
    const updateShuffleOrder = (newOrder) => {
        setShuffleOrder(newOrder);
    };

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
                            <p>Select Class Preference</p>
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">1. MNC Ground Floor</label>
                            <select 
                                className="bg-gray-700 text-white rounded px-2 py-1"
                                value={shuffleOrder[0] || ""}
                                onChange={(e) => {
                                    const newOrder = [...shuffleOrder];
                                    newOrder[0] = e.target.value ? parseInt(e.target.value) : null;
                                    setShuffleOrder(newOrder);
                                }}
                            >
                                <option value="">Select Class</option>
                                {getAvailableOptions(0).map(classNum => (
                                    <option key={classNum} value={classNum}>Class {classNum}</option>
                                ))}
                                {shuffleOrder[0] && !getAvailableOptions(0).includes(shuffleOrder[0]) && (
                                    <option key={shuffleOrder[0]} value={shuffleOrder[0]}>Class {shuffleOrder[0]}</option>
                                )}
                            </select>
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">2. MNC First Floor</label>
                            <select 
                                className="bg-gray-700 text-white rounded px-2 py-1"
                                value={shuffleOrder[1] || ""}
                                onChange={(e) => {
                                    const newOrder = [...shuffleOrder];
                                    newOrder[1] = e.target.value ? parseInt(e.target.value) : null;
                                    setShuffleOrder(newOrder);
                                }}
                            >
                                <option value="">Select Class</option>
                                {getAvailableOptions(1).map(classNum => (
                                    <option key={classNum} value={classNum}>Class {classNum}</option>
                                ))}
                                {shuffleOrder[1] && !getAvailableOptions(1).includes(shuffleOrder[1]) && (
                                    <option key={shuffleOrder[1]} value={shuffleOrder[1]}>Class {shuffleOrder[1]}</option>
                                )}
                            </select>
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">3. MNC Second Floor</label>
                            <select 
                                className="bg-gray-700 text-white rounded px-2 py-1"
                                value={shuffleOrder[2] || ""}
                                onChange={(e) => {
                                    const newOrder = [...shuffleOrder];
                                    newOrder[2] = e.target.value ? parseInt(e.target.value) : null;
                                    setShuffleOrder(newOrder);
                                }}
                            >
                                <option value="">Select Class</option>
                                {getAvailableOptions(2).map(classNum => (
                                    <option key={classNum} value={classNum}>Class {classNum}</option>
                                ))}
                                {shuffleOrder[2] && !getAvailableOptions(2).includes(shuffleOrder[2]) && (
                                    <option key={shuffleOrder[2]} value={shuffleOrder[2]}>Class {shuffleOrder[2]}</option>
                                )}
                            </select>
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">4. MNC Outside</label>
                            <select 
                                className="bg-gray-700 text-white rounded px-2 py-1"
                                value={shuffleOrder[3] || ""}
                                onChange={(e) => {
                                    const newOrder = [...shuffleOrder];
                                    newOrder[3] = e.target.value ? parseInt(e.target.value) : null;
                                    setShuffleOrder(newOrder);
                                }}
                            >
                                <option value="">Select Class</option>
                                {getAvailableOptions(3).map(classNum => (
                                    <option key={classNum} value={classNum}>Class {classNum}</option>
                                ))}
                                {shuffleOrder[3] && !getAvailableOptions(3).includes(shuffleOrder[3]) && (
                                    <option key={shuffleOrder[3]} value={shuffleOrder[3]}>Class {shuffleOrder[3]}</option>
                                )}
                            </select>
                        </div>
                        <div className=" flex justify-between px-8 py-3  border-b-1 border-gray-700 ">
                            <label className="text-gray-400" htmlFor="">5. Masjid</label>
                            <select 
                                className="bg-gray-700 text-white rounded px-2 py-1"
                                value={shuffleOrder[4] || ""}
                                onChange={(e) => {
                                    const newOrder = [...shuffleOrder];
                                    newOrder[4] = e.target.value ? parseInt(e.target.value) : null;
                                    setShuffleOrder(newOrder);
                                }}
                            >
                                <option value="">Select Class</option>
                                {getAvailableOptions(4).map(classNum => (
                                    <option key={classNum} value={classNum}>Class {classNum}</option>
                                ))}
                                {shuffleOrder[4] && !getAvailableOptions(4).includes(shuffleOrder[4]) && (
                                    <option key={shuffleOrder[4]} value={shuffleOrder[4]}>Class {shuffleOrder[4]}</option>
                                )}
                            </select>
                        </div>
                        <div className="w-full px-6 py-4 mt-2">
                            <button 
                                onClick={() => {
                                    // Update categoryOrder based on the selected shuffle order
                                    const newCategoryOrder = [];
                                    if (shuffleOrder[0]) newCategoryOrder.push('MNC Ground Floor');
                                    if (shuffleOrder[1]) newCategoryOrder.push('MNC First Floor');
                                    if (shuffleOrder[2]) newCategoryOrder.push('MNC Second Floor');
                                    if (shuffleOrder[3]) newCategoryOrder.push('MNC Outside');
                                    if (shuffleOrder[4]) newCategoryOrder.push('Masjid');
                                    
                                    setCategoryOrder(newCategoryOrder);
                                    setNext(!next);
                                }} 
                                disabled={shuffleOrder.includes(null)}
                                className={`font-bold w-full py-2 px-8 rounded-lg transition-colors ${
                                    shuffleOrder.includes(null) 
                                        ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                                        : 'bg-green-800 hover:bg-green-700 cursor-pointer text-white'
                                }`}
                            >
                                {shuffleOrder.includes(null) ? 'Select All Classes' : 'Next'}
                            </button>
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
                            <label className="text-sm w-20 text-gray-300">Description:</label>
                            <textarea
                                placeholder=""
                                className="w-full h-26 px-3 py-2  text-gray-100  border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 "
                            />  </div>

                        {/* Debug section - you can remove this in production */}
                        {/* <div className="gap-2 items-center px-4 pt-2 border-gray-700">
                            <div className="text-xs text-gray-500">
                                <p>Current Category Order: {categoryOrder.join(' → ')}</p>
                                <p>Current Shuffle Order: [{shuffleOrder.join(', ')}]</p>
                            </div>
                        </div> */}

                        {/* BUTTONS */}
                        <div className="mt-auto flex items-center justify-between px-6 pb-4 gap-2">
                            <div onClick={() => setNext(!next)} className="flex gap-1 cursor-pointer">
                                <MoveLeft className="text-gray-400" />
                                <button className="flex font-extralight text-gray-400 cursor-pointer">Back</button>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => {
                                        generates();
                                        // delay to ensure state update
                                    }}

                                    disabled={isSubmitting}

                                    className={`font-bold py-2 px-8 ${isSubmitting?"bg-gray-400  hover:bg-gray-400":"bg-green-800 hover:bg-green-700" }  transition-colors duration-300 rounded-lg cursor-pointer`}
                                >
                                    {isSubmitting ? "Generating..." : "Generate"}
                                </button>

                            </div>
                        </div>
                    </motion.div>
                }

            </main>
        </div>
    )
}