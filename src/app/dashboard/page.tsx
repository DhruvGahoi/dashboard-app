// src/app/dashboard/page.tsx
import React from 'react'
import { withAuth } from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/DashboardLayout'
import CustomBarChart from '../../components/BarChart'
import CustomPieChart from '../../components/PieChart'
import RealTimeData from '../../components/RealTimeData'
import DataInputForm from '@/components/DataInputForm'

function Dashboard() {
  // This data should come from your Supabase database in a real application
  const barChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
  ]

  const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <CustomBarChart data={barChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Distribution</h2>
          <CustomPieChart data={pieChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
          <RealTimeData />
        </div>
        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Add New Data</h2>
          <DataInputForm />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(Dashboard)