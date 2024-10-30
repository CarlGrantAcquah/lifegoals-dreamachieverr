import React from 'react';
import { Calendar, Target, Clock, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import GoalsList from './GoalsList';
import ScheduleView from './ScheduleView';
import ResourcesPanel from './ResourcesPanel';

export default function Dashboard() {
  const { user, goals } = useStore();
  
  const stats = [
    { icon: Target, label: 'Active Goals', value: goals.filter(g => g.status === 'in-progress').length },
    { icon: Clock, label: 'Hours Invested', value: '127' },
    { icon: Calendar, label: 'Tasks This Week', value: '23' },
    { icon: BookOpen, label: 'Resources Added', value: '15' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Your journey to success continues</p>
            </div>
            {user?.premium && (
              <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-medium">
                Premium Member
              </span>
            )}
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                        <dd className="text-lg font-semibold text-gray-900">{value}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GoalsList />
            <ScheduleView />
          </div>
          <div>
            <ResourcesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}