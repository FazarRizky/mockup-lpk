import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, GraduationCap, Briefcase, ArrowRight,
  Users, Database, Sparkles,
} from 'lucide-react';
import { useKandidat } from '../context/KandidatContext';

const ROLES = [
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Dashboard SIMPEL-LPK lengkap dengan modul recruitment, finance, accounting, monitoring, dan reporting.',
    cta: 'Masuk Dashboard Admin',
    path: '/admin',
    icon: Shield,
    gradient: 'from-blue-500 to-indigo-600',
    bullets: ['Pool Kandidat', 'Approval', 'Reporting'],
  },
  {
    key: 'siswa',
    label: 'Siswa',
    desc: 'Halaman publik untuk calon siswa mendaftarkan diri ke program pelatihan kerja Jepang.',
    cta: 'Daftar Sebagai Siswa',
    path: '/siswa',
    icon: GraduationCap,
    gradient: 'from-orange-500 to-amber-500',
    bullets: ['Form Pendaftaran', 'Upload Foto', 'Pilih Keahlian'],
  },
  {
    key: 'sales',
    label: 'Sales',
    desc: 'Browse daftar siswa siap salur, filter berdasarkan keahlian dan nilai untuk matching mitra Jepang.',
    cta: 'Lihat Daftar Siswa',
    path: '/sales',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-teal-600',
    bullets: ['Card Grid', 'Filter Skill', 'Tandai Tertarik'],
  },
];

export default function RoleLanding() {
  const { kandidatList } = useKandidat();
  const total = kandidatList.length;
  const approved = kandidatList.filter((k) => k.status === 'Approved').length;
  const pending = kandidatList.filter((k) => k.status === 'Pending Review').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-y-1/4 -translate-x-1/4" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Mockup Demo · Multi-Role
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            SIMPEL-<span style={{ color: '#FF6B00' }}>LPK</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Sistem Informasi Manajemen Pelatihan Kerja Jepang. Pilih role di bawah untuk
            menjelajahi mockup berdasarkan perspektif pengguna yang berbeda.
          </p>

          {/* Mini stats */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-orange-100">
              <Users className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-semibold text-gray-700">{total} Kandidat</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-orange-100">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold text-gray-700">{approved} Approved</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-orange-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-semibold text-gray-700">{pending} Pending</span>
            </div>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.key}
                to={role.path}
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${role.gradient}`} />
                <div className="p-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-1">{role.label}</h2>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed min-h-[60px]">
                    {role.desc}
                  </p>

                  <ul className="space-y-1.5 mb-5">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.gradient}`} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 group-hover:text-orange-600">
                    {role.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500">
            Data tersimpan di <span className="font-semibold text-gray-700">localStorage</span> browser.
            Pendaftaran dari role Siswa otomatis muncul di Admin & Sales.
          </p>
        </div>
      </div>
    </div>
  );
}
