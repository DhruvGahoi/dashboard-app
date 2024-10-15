"use client"
import React, { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Sample chart data to be exported
  const chartData = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 200 },
    { label: 'Apr', value: 278 },
    { label: 'May', value: 189 },
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },

  ]

  // Convert chart data to CSV format
  const convertToCSV = (data: { label: string; value: number }[]) => {
    const header = ['Label', 'Value']
    const rows = data.map(row => [row.label, row.value])

    // Create CSV content
    const csvContent = [header, ...rows]
      .map(row => row.join(','))
      .join('\n')

    return csvContent
  }

  // Trigger CSV download
  const downloadCSV = () => {
    const csv = convertToCSV(chartData)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)

    // Create a hidden download link
    const a = document.createElement('a')
    a.href = url
    a.download = 'chart-data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Apply dark mode to the HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <aside className={`w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block`}>
          <nav className="mt-5">
            <Link href="/dashboard" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              Overview
            </Link>
            <Link href="/dashboard/charts" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              Charts
            </Link>
            <Link href="/dashboard/data" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              Data Management
            </Link>
          </nav>
        </aside>

        <div className={`fixed inset-0 z-20 transition-opacity ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <aside className={`absolute top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="flex justify-end p-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-500 dark:text-gray-300" />
              </button>
            </div>
            <nav className="mt-5">
              <Link href="/dashboard" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Overview
              </Link>
              <Link href="/dashboard/charts" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Charts
              </Link>
              <Link href="/dashboard/data" className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Data Management
              </Link>
            </nav>
          </aside>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6 text-gray-500 dark:text-gray-300" />
              </button>
              <div className="flex items-center space-x-4">
                <button onClick={() => setDarkMode(!darkMode)} className="flex items-center">
                  {darkMode ? (
                    <Sun className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                  )}
                </button>
                {/* CSV Download Button */}
                <button onClick={downloadCSV} className="flex items-center text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-md">
                  <Download className="h-6 w-6 mr-2" />
                  Download CSV
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
