'use client'
import { Bell, ChevronLeft, CircleChevronLeft, MoveLeft } from "lucide-react";
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
  },
];

export default function Header() {
  const pathname = usePathname();
  const head = primaryNav.find((item) => pathname === item.path);
  console.log(head?.name);




  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
     <div className="flex items-center gap-2">
{(pathname === '/database/students' || pathname === '/database/area') && (
  <Link href='/database'>
    <CircleChevronLeft />
  </Link>
)}
   <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          {head?.name || 'Dashboard'}
        </h2>
     </div>
        <div className="flex items-center space-x-3">
          <h1 className="hidden sm:block font-medium">admin</h1>
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 hover:text-white" />
          </div>
        </div>
      </div>
   </header>
  );
}
