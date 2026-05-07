import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function SiswaLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header brand */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/siswa" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-base leading-tight">SIMPEL-LPK</p>
              <p className="text-[11px] text-gray-500 leading-tight">
                Pendaftaran Calon Siswa Pelatihan Jepang
              </p>
            </div>
          </Link>
          <div className="hidden sm:block">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#FFF1E6', color: '#FF6B00' }}
            >
              Portal Pendaftaran
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-100 bg-white/60 py-4 px-6 mt-10">
        <p className="text-xs text-gray-500 text-center">
          © 2026 HAYASA-LPK · Sistem Informasi Manajemen Pelatihan Kerja Jepang
        </p>
      </footer>
    </div>
  );
}
