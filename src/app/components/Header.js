'use client'
import { Bell, ChevronLeft, CircleChevronLeft,ClipboardList, MoveLeft, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNav = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard',
  },
  {
    name: 'Task Schedule',
    path: '/task-schedule',
    icon: 'ListTodo',
  },
  {
    name: 'Database',
    path: '/database',
    icon: 'DatabaseIcon',
  },
  {
    name: 'Performance',
    path: '/performance',
    icon: 'GaugeIcon',
  },
  {
    name: 'AI Assistance',
    path: '/assit',
    icon: 'Bot',
  },
  {
    name: 'Students Database',
    path: '/database/students',
    icon: 'Bot',

  },{
    name: 'Area Database',
    path: '/database/area',
    icon: 'Bot',

  },
  {
    name: 'Permanent List',
    path: '/database/permanent',
    icon: 'Bot',

  },
  {
    name: 'Create New Task',
    path: '/task-schedule/generate-task',
    icon: 'Bot',
  },
];

export default function Header() {
  const pathname = usePathname();
  const head = primaryNav.find((item) => pathname === item.path);
  console.log(head?.name);




  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl  mx-auto py-6 px-4 sm:px-6 flex items-center justify-between">
     <div className="flex items-center gap-2">
{(pathname === '/database/students' || pathname === '/database/area'  || pathname === '/database/permanent') && (
  <Link href='/database'>
    <CircleChevronLeft />
  </Link>
)}
   <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          {head?.name || 'Dashboard'}
        </h2>
     </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
          
          {pathname !=="/task-schedule/generate-task" &&    <Link href='/task-schedule/generate-task' className="flex gap-2 backdrop-blur-lg shadow-md bg-blue-800 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer duration-300">  Create Task                           <ClipboardList />
            </Link> }
         
          </div>
        </div>
      </div>
   </header>
  );
}
