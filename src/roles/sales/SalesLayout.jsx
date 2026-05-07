import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { Briefcase, Users, Heart, Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Daftar Siswa', path: '/sales', icon: Users, end: true },
  { label: 'Tertarik', path: '/sales/tertarik', icon: Heart },
];

export default function SalesLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar minimal */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100">
          <Link to="/sales" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
            >
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm leading-tight">SIMPEL-LPK</p>
              <p className="text-[10px] text-gray-500 leading-tight">Portal Sales</p>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }
                    : {}
                }
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
              style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
            >
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">Sales User</p>
              <p className="text-xs text-gray-400 truncate">sales@hayasa-lpk.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {location.pathname === '/sales/tertarik' ? 'Daftar Tertarik' : 'Daftar Siswa'}
              </h1>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Pool kandidat siap salur ke perusahaan Jepang
              </p>
            </div>
          </div>
          <span
            className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#FFF1E6', color: '#FF6B00' }}
          >
            Mode Sales
          </span>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <p className="text-xs text-gray-500 text-center">
            © 2026 HAYASA-LPK · Portal Sales
          </p>
        </footer>
      </div>
    </div>
  );
}
