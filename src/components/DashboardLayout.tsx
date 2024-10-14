import React, { ReactNode } from 'react'
import Link from 'next/link'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
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
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}