'use client'


import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, PieChart, Zap, Sun, Lightbulb, Bell, FlaskConical } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/homepage_dashboard' },
    { id: 'virtual-tour', icon: Building2, label: 'Digital Twin', href: '/digital_twin' },
    { id: 'system', icon: Zap, label: 'System Care', href: '/system_care' },
    { id: 'solar', icon: Sun, label: 'Solar Insights', href: '/solar_insights' },
    { id: 'smart', icon: Lightbulb, label: 'Smart Solution', href: '/smart_assistance' },
    { id: 'laboratory',icon: FlaskConical, label: 'Laboratory', href: '/laboratory' },
  ]

  return (
    <div className="w-64 bg-white border-r flex flex-col h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Image src="/greenlight_logo.svg" alt="Farm-E Logo" width={32} height={32} className="rounded" />
          <span className="font-semibold text-xl text-green-500">GreenLight</span>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="bg-green-100 rounded-lg p-4 mb-4">
          <h3 className="font-medium mb-1 text-black">Need help?</h3>
          <p className="text-sm text-gray-600 mb-2">Please check our docs</p>
          <Link href="https://github.com/chenming7777/greenlight" target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-white text-green-600 px-4 py-2 rounded text-sm font-medium">
              DOCUMENTATION
            </button>
          </Link>
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              href="/notifications"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname === '/notifications'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notification</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

