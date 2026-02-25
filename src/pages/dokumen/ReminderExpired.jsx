import React, { useState, useMemo } from 'react';

const reminderData = [
  { id: 'REM-001', jenis: 'Dokumen Legal', nama: 'Surat Keterangan Domisili Perusahaan', pemilik: 'LPK SIMPEL', tanggalExpiry: '2025-01-31', daysLeft: -26, status: 'Expired', notified: true, prioritas: 'Kritis' },
  { id: 'REM-002', jenis: 'Dokumen Legal', nama: 'Perjanjian Kerja Sama dengan Disnaker Prov. Jabar', pemilik: 'LPK SIMPEL', tanggalExpiry: '2025-12-31', daysLeft: 308, status: 'Hampir Berakhir', notified: false, prioritas: 'Tinggi' },
  { id: 'REM-003', jenis: 'Dokumen Legal', nama: 'Dokumen Registrasi Sending Organization (SO)', pemilik: 'LPK SIMPEL', tanggalExpiry: '2025-08-31', daysLeft: 186, status: 'Hampir Berakhir', notified: true, prioritas: 'Tinggi' },
  { id: 'REM-004', jenis: 'Kontrak Perusahaan', nama: 'MOU Honda Motor Co., Ltd.', pemilik: 'Honda Motor / Saitama', tanggalExpiry: '2025-06-30', daysLeft: 124, status: 'Hampir Berakhir', notified: false, prioritas: 'Tinggi' },
  { id: 'REM-005', jenis: 'Kontrak Siswa', nama: 'Kontrak Kerja - Nurul Hidayah', pemilik: 'Nurul Hidayah / Suzuki Corp.', tanggalExpiry: '2025-06-01', daysLeft: 95, status: 'Hampir Berakhir', notified: false, prioritas: 'Normal' },
  { id: 'REM-006', jenis: 'Dokumen Siswa', nama: 'Paspor - Ahmad Fauzi', pemilik: 'Ahmad Fauzi', tanggalExpiry: '2025-09-15', daysLeft: 201, status: 'Normal', notified: false, prioritas: 'Normal' },
  { id: 'REM-007', jenis: 'Kontrak Siswa', nama: 'Kontrak Kerja - Ahmad Fauzi', pemilik: 'Ahmad Fauzi / Yamaha Motor', tanggalExpiry: '2026-03-01', daysLeft: 373, status: 'Normal', notified: false, prioritas: 'Rendah' },
  { id: 'REM-008', jenis: 'Dokumen Siswa', nama: 'SKCK - Hendra Wijaya', pemilik: 'Hendra Wijaya', tanggalExpiry: '2025-08-15', daysLeft: 170, status: 'Hampir Berakhir', notified: false, prioritas: 'Normal' },
  { id: 'REM-009', jenis: 'Kontrak Perusahaan', nama: 'MOU Toyota Housing Corp.', pemilik: 'Toyota Housing / Aichi', tanggalExpiry: '2026-02-28', daysLeft: 367, status: 'Normal', notified: false, prioritas: 'Rendah' },
  { id: 'REM-010', jenis: 'Dokumen Siswa', nama: 'Visa TKI - Dewi Lestari', pemilik: 'Dewi Lestari', tanggalExpiry: '2026-02-01', daysLeft: 340, status: 'Normal', notified: false, prioritas: 'Normal' },
];

const statusColor = {
  Expired: 'bg-red-100 text-red-700',
  'Hampir Berakhir': 'bg-orange-100 text-orange-700',
  Normal: 'bg-emerald-100 text-emerald-700',
};

const prioritasColor = {
  Kritis: 'bg-red-500 text-white',
  Tinggi: 'bg-orange-400 text-white',
  Normal: 'bg-blue-100 text-blue-700',
  Rendah: 'bg-gray-100 text-gray-500',
};

const jenisIcon = {
  'Dokumen Legal': '🏛️',
  'Kontrak Perusahaan': '🤝',
  'Kontrak Siswa': '👤',
  'Dokumen Siswa': '📄',
};

export default function ReminderExpired() {
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = useMemo(() => {
    const result = reminderData.filter((r) => {
      const matchJenis = filterJenis === 'Semua' || r.jenis === filterJenis;
      const matchStatus = filterStatus === 'Semua' || r.status === filterStatus;
      return matchJenis && matchStatus;
    });

    return [...result].sort((a, b) => a.daysLeft - b.daysLeft);
  }, [filterJenis, filterStatus]);

  const expired = useMemo(
    () => reminderData.filter((r) => r.status === 'Expired').length,
    []
  );

  const hampirBerakhir = useMemo(
    () => reminderData.filter((r) => r.status === 'Hampir Berakhir').length,
    []
  );

  const normal = useMemo(
    () => reminderData.filter((r) => r.status === 'Normal').length,
    []
  );

  const timelineData = useMemo(
    () => [...reminderData].sort((a, b) => a.daysLeft - b.daysLeft),
    []
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Reminder Expired
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Pantau dan kelola dokumen & kontrak yang akan berakhir
        </p>
      </div>

      {/* SUMMARY CARD (INI YANG MEMPERBAIKI ERROR ESLINT) */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Expired</p>
          <p className="text-xl font-bold text-red-600">{expired}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Hampir Berakhir</p>
          <p className="text-xl font-bold text-orange-600">
            {hampirBerakhir}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Normal</p>
          <p className="text-xl font-bold text-emerald-600">
            {normal}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Timeline Expiry
        </p>
        <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
          {timelineData.map((r) => (
            <div
              key={r.id}
              className={`flex-1 ${
                r.daysLeft < 0
                  ? 'bg-red-400'
                  : r.daysLeft <= 180
                  ? 'bg-orange-400'
                  : 'bg-emerald-400'
              }`}
              title={`${r.nama}`}
            />
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          className="border rounded-lg px-3 py-2 text-sm bg-white"
          value={filterJenis}
          onChange={(e) => setFilterJenis(e.target.value)}
        >
          {['Semua', 'Dokumen Legal', 'Kontrak Perusahaan', 'Kontrak Siswa', 'Dokumen Siswa'].map((j) => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-3 py-2 text-sm bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {['Semua', 'Expired', 'Hampir Berakhir', 'Normal'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl border shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {jenisIcon[r.jenis] || '📁'}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">
                  {r.nama}
                </p>
                <p className="text-xs text-gray-500">
                  {r.jenis} • {r.pemilik}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusColor[r.status]
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}