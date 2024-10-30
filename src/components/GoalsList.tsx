import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Goal } from '../types';

export default function GoalsList() {
  const { goals } = useStore();

  const getProgressColor = (goal: Goal) => {
    const completed = goal.steps.filter(s => s.status === 'completed').length;
    const total = goal.steps.length;
    const progress = (completed / total) * 100;
    
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{goal.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`${getProgressColor(goal)} h-2 rounded-full`}
                    style={{
                      width: `${(goal.steps.filter(s => s.status === 'completed').length / goal.steps.length) * 100}%`
                    }}
                  />
                </div>
                <span className="ml-4 text-sm text-gray-600">
                  {goal.steps.filter(s => s.status === 'completed').length}/{goal.steps.length} steps
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}