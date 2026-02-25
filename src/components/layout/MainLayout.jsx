import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* 
        Sidebar width:
        - Collapsed  → w-20  = 80px  → ml-20
        - Expanded   → w-72  = 288px → ml-72
        Transition duration matches sidebar (300ms)
      */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}
      >
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm text-gray-500">
              © 2026 <span className="font-semibold text-gray-700">HAYASA-LPK</span>. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}