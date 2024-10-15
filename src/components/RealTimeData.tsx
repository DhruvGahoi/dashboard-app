"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CustomLineChart from './LineChart'

type DataPoint = {
  name: string
  value: number
}

export default function RealTimeData() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    fetchData()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dashboard_data' }, payload => {
        console.log('Change received!', payload)
        fetchData()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_data_table')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      setData(data.map(item => ({ name: item.name, value: item.value })))
    }
  }

  return (
    <div>
      <h2>Real-time Data</h2>
      <CustomLineChart data={data} />
    </div>
  )
}