import React from 'react';
import {
  Users, Briefcase, ArrowUp, ArrowDown,
  AlertTriangle, Clock, CheckCircle, DollarSign, Plane, Bell
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const statsData = [
    { id: 1, title: 'Total Siswa Aktif', value: '247', change: 8, icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
    { id: 2, title: 'Siap Berangkat', value: '34', change: 12, icon: Plane, bg: 'bg-indigo-50', color: 'text-indigo-600' },
    { id: 3, title: 'Di Jepang', value: '189', change: 5, icon: Briefcase, bg: 'bg-green-50', color: 'text-green-600' },
    { id: 4, title: 'Pendapatan Bulan Ini', value: 'Rp 842 JT', change: 15, icon: DollarSign, bg: 'bg-orange-50', color: 'text-orange-600' },
  ];

  const chartData = [
    { month: 'Sep', siswa: 38, berangkat: 12 },
    { month: 'Okt', siswa: 42, berangkat: 18 },
    { month: 'Nov', siswa: 55, berangkat: 22 },
    { month: 'Des', siswa: 48, berangkat: 15 },
    { month: 'Jan', siswa: 62, berangkat: 28 },
    { month: 'Feb', siswa: 71, berangkat: 34 },
  ];

  const cashflowData = [
    { month: 'Sep', masuk: 620, keluar: 420 },
    { month: 'Okt', masuk: 740, keluar: 510 },
    { month: 'Nov', masuk: 680, keluar: 480 },
    { month: 'Des', masuk: 800, keluar: 550 },
    { month: 'Jan', masuk: 750, keluar: 490 },
    { month: 'Feb', masuk: 842, keluar: 530 },
  ];

  const upcomingDepartures = [
    { name: 'Andi Pratama', company: 'Toyota Motor Corp', date: '28 Feb 2026', status: 'Siap' },
    { name: 'Dewi Rahayu', company: 'Panasonic Corp', date: '3 Mar 2026', status: 'Proses COE' },
    { name: 'Fajar Nugroho', company: 'Denso Corporation', date: '10 Mar 2026', status: 'Siap' },
    { name: 'Siti Aminah', company: 'Honda Motor Co', date: '15 Mar 2026', status: 'Dokumen' },
  ];

  const pendingTasks = [
    { title: 'Approval Dokumen COE', count: 5, priority: 'high' },
    { title: 'Review Interview Hasil', count: 3, priority: 'medium' },
    { title: 'Approval Budget Q1', count: 1, priority: 'high' },
    { title: 'Verifikasi Pembayaran', count: 8, priority: 'low' },
  ];

  const alerts = [
    { msg: '3 dokumen passport akan expired dalam 30 hari', type: 'warning' },
    { msg: '5 siswa belum melengkapi berkas keberangkatan', type: 'error' },
    { msg: 'Budget Operasional bulan ini sudah 87%', type: 'warning' },
    { msg: '2 incident report baru dari Jepang', type: 'error' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-36 -mt-36 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full -ml-28 -mb-28 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">Portal Internal</p>
          <h1 className="text-3xl font-bold mb-1">Selamat Datang, Admin 👋</h1>
          <p className="text-white/80 text-base">HAYASA-LPK — Sistem Manajemen Tenaga Kerja Jepang</p>
          <p className="text-white/50 text-sm mt-1 font-jp">日本就労支援管理システム</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-bold ${stat.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stat.change)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Siswa & Keberangkatan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-base font-bold text-gray-900 mb-1">Siswa Baru & Keberangkatan</h3>
          <p className="text-xs text-gray-400 mb-5">6 bulan terakhir</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="siswa" fill="#6366f1" radius={[6, 6, 0, 0]} name="Siswa Baru" />
              <Bar dataKey="berangkat" fill="#10b981" radius={[6, 6, 0, 0]} name="Berangkat" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />Siswa Baru</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />Berangkat</span>
          </div>
        </motion.div>

        {/* Cashflow */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-base font-bold text-gray-900 mb-1">Cashflow Overview</h3>
          <p className="text-xs text-gray-400 mb-5">Cash In vs Cash Out (juta Rp)</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Line type="monotone" dataKey="masuk" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Cash In" />
              <Line type="monotone" dataKey="keluar" stroke="#f97316" strokeWidth={2.5} dot={false} name="Cash Out" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-1.5 rounded bg-blue-500 inline-block" />Cash In</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-1.5 rounded bg-orange-400 inline-block" />Cash Out</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Keberangkatan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Upcoming Keberangkatan</h3>
              <p className="text-xs text-gray-400">30 hari ke depan</p>
            </div>
            <Plane className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-3">
            {upcomingDepartures.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{d.name}</p>
                  <p className="text-xs text-gray-400 truncate">{d.company}</p>
                  <p className="text-xs text-blue-500 font-medium mt-0.5">{d.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                  d.status === 'Siap' ? 'bg-green-100 text-green-700' :
                  d.status === 'Proses COE' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>{d.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Task & Approval Pending */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Task & Approval</h3>
              <p className="text-xs text-gray-400">Menunggu tindakan</p>
            </div>
            <Clock className="w-5 h-5 text-orange-400" />
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{task.title}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-50 text-red-600' :
                  task.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-gray-100 text-gray-500'
                }`}>{task.count}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Lihat Semua Task
          </button>
        </motion.div>

        {/* Alert & Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Alert & Reminder</h3>
              <p className="text-xs text-gray-400">Perlu perhatian segera</p>
            </div>
            <Bell className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                alert.type === 'error' ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'
              }`}>
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  alert.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <p className={`text-xs leading-relaxed ${
                  alert.type === 'error' ? 'text-red-700' : 'text-yellow-700'
                }`}>{alert.msg}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;