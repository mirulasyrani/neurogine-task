import { useState, useEffect } from 'react';
import { api } from '../api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  PENDING: '#FCD34D',
  IN_PROGRESS: '#60A5FA',
  COMPLETED: '#34D399',
  CANCELLED: '#EF4444',
  LOW: '#10B981',
  MEDIUM: '#F59E0B',
  HIGH: '#F97316',
  URGENT: '#DC2626'
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await api.getStatistics(token);
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-8">Failed to load statistics</div>;
  }

  const statusData = Object.entries(stats.byStatus || {}).map(([name, value]) => ({
    name,
    value
  }));

  const priorityData = Object.entries(stats.byPriority || {}).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Tasks</div>
          <div className="text-3xl font-bold mt-2 dark:text-white">{stats.totalTasks}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Overdue</div>
          <div className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">{stats.overdueTasksCount}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Due Today</div>
          <div className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">{stats.todayTasksCount}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">This Week</div>
          <div className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">{stats.weekTasksCount}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Tasks by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-2" 
                    style={{ backgroundColor: COLORS[item.name] }}
                  ></div>
                  <span className="text-sm dark:text-gray-300">{item.name}</span>
                </div>
                <span className="font-semibold dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Tasks by Priority</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {priorityData.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-2" 
                    style={{ backgroundColor: COLORS[item.name] }}
                  ></div>
                  <span className="text-sm dark:text-gray-300">{item.name}</span>
                </div>
                <span className="font-semibold dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
