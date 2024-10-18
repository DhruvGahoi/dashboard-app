import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Import Supabase client
import CustomLineChart from './LineChart';

type DataPoint = {
  name: string;
  value: number;
};

export default function LineChartContainer() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('dashboard_data')
        .select('name, value');
      
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      console.log('Fetched Data:', data);
      const formattedData = data?.map(item => ({
        name: item.name,
        value: item.value
      }));

      setChartData(formattedData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const subscription = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dashboard_data' }, payload => {
        console.log('Change received!', payload);
        fetchData();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading chart...</p>
      ) : chartData.length > 0 ? (
        <CustomLineChart data={chartData} />  // Pass chart data to the chart component
      ) : (
        <p>No data available</p>  // Display a message if no data is available
      )}
    </div>
  );
}
