'use client'
import {
  LayoutDashboard,
  Settings,
  HelpCircleIcon,
  DatabaseIcon,
  User,
  Info,
  House,
  List,
  Menu,
  GaugeIcon,
  ListTodo,
  Bot,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const ICONS = {
  LayoutDashboard,
  Settings,
  HelpCircleIcon,
  DatabaseIcon,
  User,
  Info,
  House,
  List,
  GaugeIcon,
  ListTodo,
  Bot,
}

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
]

const secondaryNav = [
  {
    name: 'Settings',
    path: '/settings',
    icon: 'Settings',
  },

  {
    name: 'Help',
    path: '/Info',
    icon: 'Info',
  },
]

export default function Sidebar() {
  const [isOpen, setIsopen] = useState(true)
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div
      className={`relative z-10 transition-all duration-600 ease-in-out flex-shrink-0 ${
        isOpen ? 'w-64' : 'w-21'
      }`}
    >
      <div className='h-full  bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r-1 border-[#2f2f2f]'>
        <button
          onClick={() => setIsopen(!isOpen)}
          className='p-2 rounded-full hover:bg-[#2f2f2f] transition-colors ml-[7px] max-w-fit cursor-pointer'
        >
          <Menu size={24} />
        </button>

        <nav className='relative mt-5 flex-grow  space-y-4'>
          {primaryNav.map(({ name, path, icon }) => {
            const IconComponent = ICONS[icon]
            return (
              <Link key={name} href={path}>
                <div
                  className={`flex  items-center p-4  text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                    pathname === path ? 'bg-[#2f2f2f]' : ''
                  }`}
                >
                  <IconComponent
                    size={20}
                    style={{ minWidth: '20px' }}
                    className=''
                  />
                  {isOpen && (
                    <span className='ml-4 whitespace-nowrap '>{name}</span>
                  )}
                  {/* <span className="absolute left-14 whitespace-nowrap text-xs font-light text-[#6c6b6b] bg-[#2e2e2e] ">{name}</span>  */}
                </div>
              </Link>
            )
          })}
        </nav>
        <nav className='mt-5 flex-grow-1 space-y-4'>
          <hr className='text-[#2f2f2f]' />
          {secondaryNav.map(({ name, path, icon }) => {
            const IconComponent = ICONS[icon]
            return (
              <Link key={name} href={path}>
                <div
                  className={`flex  items-center p-4  text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                    pathname === path ? 'bg-[#2f2f2f]' : ''
                  }`}
                >
                  <IconComponent
                    size={20}
                    style={{ minWidth: '20px' }}
                    className=''
                  />
                  {isOpen && (
                    <span className='ml-4 whitespace-nowrap'>{name}</span>
                  )}{' '}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
