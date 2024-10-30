import React from 'react';
import { Book, Tool, Briefcase } from 'lucide-react';

export default function ResourcesPanel() {
  const resources = [
    { type: 'skill', name: 'Public Speaking', acquired: false, icon: Book },
    { type: 'tool', name: 'Project Management Software', acquired: true, icon: Tool },
    { type: 'material', name: 'Business Plan Template', acquired: false, icon: Briefcase },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Required Resources</h2>
      
      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.name}
            className="flex items-center p-3 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className={`p-2 rounded-lg ${
              resource.acquired ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <resource.icon className={`h-5 w-5 ${
                resource.acquired ? 'text-green-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{resource.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
            </div>
            <div>
              {resource.acquired ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Acquired
                </span>
              ) : (
                <button className="text-xs text-indigo-600 hover:text-indigo-500">
                  Add Resource
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}