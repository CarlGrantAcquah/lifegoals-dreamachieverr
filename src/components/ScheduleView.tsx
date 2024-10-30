import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ScheduleView() {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Weekly Schedule</h2>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Clock className="h-4 w-4 mr-2" />
            Auto-Schedule
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-[auto,repeat(5,1fr)] gap-2">
            <div className="sticky left-0 bg-white z-10"></div>
            {days.map(day => (
              <div key={day} className="text-center font-medium text-gray-600">
                {day}
              </div>
            ))}
            
            {timeSlots.map(hour => (
              <React.Fragment key={hour}>
                <div className="sticky left-0 bg-white z-10 text-right pr-4 text-sm text-gray-500">
                  {format(new Date().setHours(hour, 0), 'h a')}
                </div>
                {days.map(day => (
                  <div
                    key={`${day}-${hour}`}
                    className="h-12 border-t border-gray-100 relative group hover:bg-gray-50"
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}