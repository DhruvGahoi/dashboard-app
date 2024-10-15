"use client"
import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className={`w-64 bg-white shadow-md hidden md:block`}>
        <nav className="mt-5">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Overview
          </Link>
          <Link href="/dashboard/charts" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Charts
          </Link>
          <Link href="/dashboard/data" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Data Management
          </Link>
        </nav>
      </aside>

      {/* Collapsible sidebar for mobile */}
      <div className={`fixed inset-0 z-20 transition-opacity ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <aside className={`absolute top-0 left-0 w-64 h-full bg-white shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <nav className="mt-5">
            <Link href="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
              Overview
            </Link>
            <Link href="/dashboard/charts" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
              Charts
            </Link>
            <Link href="/dashboard/data" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
              Data Management
            </Link>
          </nav>
        </aside>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}