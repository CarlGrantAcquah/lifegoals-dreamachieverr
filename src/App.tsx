import React from 'react';
import { useStore } from './store/useStore';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

function App() {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App;