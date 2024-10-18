'use client'
import React, { useState } from 'react';
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', sales: 400, revenue: 2400 },
  { name: 'Feb', sales: 300, revenue: 1398 },
  { name: 'Mar', sales: 200, revenue: 9800 },
  { name: 'Apr', sales: 278, revenue: 3908 },
  { name: 'May', sales: 189, revenue: 4800 },
];

const Charts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 hidden md:block">
        <nav className="mt-5">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">
            Overview
          </Link>
          <Link href="/dashboard/charts" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">
            Charts
          </Link>
          <Link href="/dashboard/data" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">
            Data Management
          </Link>
        </nav>
      </aside>
      <div className={`fixed inset-0 z-20 transition-opacity ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <aside className={`absolute top-0 left-0 w-64 h-full bg-gray-800 shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-300" />
            </button>
          </div>
          <nav className="mt-5">
            <Link href="/dashboard" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">
              Overview
            </Link>
            <Link href="/dashboard/charts" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">
              Charts
            </Link>
            <Link href="/dashboard/data" className="block py-2 px-4 text-gray-300 hover:bg-gray-700">
              Data Management
            </Link>
          </nav>
        </aside>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 md:hidden">
          <div className="p-4 flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="mr-4">
              <Menu className="h-6 w-6 text-gray-300" />
            </button>
            <h1 className="text-xl font-semibold">Charts</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6 md:hidden">Charts</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Charts;