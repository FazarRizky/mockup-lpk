import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Shield, GraduationCap, Briefcase, X } from 'lucide-react';
import { getItem, setItem } from '../utils/localStorage';

const ROLES = [
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Dashboard SIMPEL-LPK',
    path: '/admin',
    icon: Shield,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    key: 'siswa',
    label: 'Siswa',
    desc: 'Form pendaftaran calon siswa',
    path: '/siswa',
    icon: GraduationCap,
    color: 'from-orange-500 to-amber-500',
  },
  {
    key: 'sales',
    label: 'Sales',
    desc: 'List siswa & matching',
    path: '/sales',
    icon: Briefcase,
    color: 'from-emerald-500 to-teal-600',
  },
];

export default function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const currentRole = (() => {
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/siswa')) return 'siswa';
    if (location.pathname.startsWith('/sales')) return 'sales';
    return getItem('simpel_lpk_role', null);
  })();

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const handleSwitch = (role) => {
    setItem('simpel_lpk_role', role.key);
    navigate(role.path);
    setOpen(false);
  };

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[100]">
      {open && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-sm">Switch Role Demo</p>
              <p className="text-orange-50 text-xs">Pilih role untuk preview</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2 space-y-1">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const isActive = currentRole === role.key;
              return (
                <button
                  key={role.key}
                  onClick={() => handleSwitch(role)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left
                    ${isActive ? 'bg-orange-50 ring-1 ring-orange-200' : 'hover:bg-gray-50'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-sm flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{role.label}</p>
                    <p className="text-xs text-gray-500 truncate">{role.desc}</p>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      AKTIF
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
            <p className="text-[10px] text-gray-500 text-center">
              Mode demo &middot; data tersimpan di browser
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="Switch Role"
        title="Switch Role"
      >
        <Users className="w-6 h-6" />
      </button>
    </div>
  );
}
