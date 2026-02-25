import React, { useState, useMemo } from 'react';

const exportTemplates = [
  {
    kategori: 'Akademik',
    icon: '🎓',
    color: 'bg-blue-50 border-blue-200',
    items: [
      { id: 'ak1', nama: 'Data Nilai Seluruh Siswa', format: ['Excel', 'PDF'], deskripsi: 'Rekap nilai bahasa, teknis, budaya per siswa per batch', estimasi: '~2 detik' },
      { id: 'ak2', nama: 'Rekap Kehadiran Bulanan', format: ['Excel', 'PDF'], deskripsi: 'Data absensi harian dan rekap bulanan seluruh siswa', estimasi: '~3 detik' },
      { id: 'ak3', nama: 'Sertifikat Kelulusan Massal', format: ['PDF'], deskripsi: 'Cetak sertifikat kelulusan untuk semua siswa yang lulus', estimasi: '~10 detik' },
      { id: 'ak4', nama: 'Laporan Perkembangan Siswa', format: ['PDF'], deskripsi: 'Progress report per individu untuk dikirim ke orang tua', estimasi: '~8 detik' },
    ]
  },
  {
    kategori: 'Recruitment & Placement',
    icon: '✈️',
    color: 'bg-purple-50 border-purple-200',
    items: [
      { id: 'rp1', nama: 'Database Kandidat Siap Salur', format: ['Excel', 'PDF'], deskripsi: 'Profil lengkap kandidat untuk dikirim ke perusahaan Jepang', estimasi: '~3 detik' },
      { id: 'rp2', nama: 'Laporan Placement per Perusahaan', format: ['Excel', 'PDF'], deskripsi: 'Rekap TKI yang ditempatkan per mitra perusahaan', estimasi: '~4 detik' },
      { id: 'rp3', nama: 'Status Proses Dokumen Keberangkatan', format: ['Excel', 'PDF'], deskripsi: 'Checklist kelengkapan COE, Visa, MCU, Tiket per siswa', estimasi: '~3 detik' },
      { id: 'rp4', nama: 'Rekap Hasil Interview', format: ['Excel', 'PDF'], deskripsi: 'Nilai dan keputusan interview dari semua perusahaan', estimasi: '~2 detik' },
    ]
  },
  {
    kategori: 'Keuangan',
    icon: '💰',
    color: 'bg-emerald-50 border-emerald-200',
    items: [
      { id: 'keu1', nama: 'Laporan Keuangan Bulanan', format: ['Excel', 'PDF'], deskripsi: 'Rekap pemasukan, pengeluaran, dan saldo per bulan', estimasi: '~2 detik' },
      { id: 'keu2', nama: 'Report Cashflow', format: ['Excel', 'PDF'], deskripsi: 'Arus kas masuk dan keluar dengan saldo harian/bulanan', estimasi: '~3 detik' },
      { id: 'keu3', nama: 'Budget vs Realisasi', format: ['Excel', 'PDF'], deskripsi: 'Perbandingan anggaran dan realisasi per kategori', estimasi: '~2 detik' },
      { id: 'keu4', nama: 'Invoice & Tagihan Siswa', format: ['PDF'], deskripsi: 'Cetak invoice per siswa atau massal', estimasi: '~5 detik' },
      { id: 'keu5', nama: 'Laporan Pembayaran Masuk', format: ['Excel'], deskripsi: 'Rekap seluruh cash in dan virtual account terkonfirmasi', estimasi: '~2 detik' },
    ]
  },
  {
    kategori: 'Dokumen & Legal',
    icon: '📄',
    color: 'bg-orange-50 border-orange-200',
    items: [
      { id: 'dl1', nama: 'Daftar Dokumen Legal LPK', format: ['Excel', 'PDF'], deskripsi: 'Status dan masa berlaku semua dokumen legalitas', estimasi: '~2 detik' },
      { id: 'dl2', nama: 'Kontrak Siswa Massal', format: ['PDF'], deskripsi: 'Cetak semua kontrak kerja siswa sekaligus', estimasi: '~15 detik' },
      { id: 'dl3', nama: 'Reminder Dokumen Expired', format: ['Excel', 'PDF'], deskripsi: 'List dokumen yang akan/sudah expired dalam 90 hari', estimasi: '~1 detik' },
    ]
  },
];

const recentExports = [
  { id: 1, nama: 'Database Kandidat Siap Salur', format: 'Excel', tanggal: '2025-02-14 14:22', oleh: 'Admin Penyaluran', ukuran: '245 KB' },
  { id: 2, nama: 'Laporan Keuangan Bulanan - Jan 2025', format: 'PDF', tanggal: '2025-02-12 09:05', oleh: 'Direktur Keuangan', ukuran: '1.2 MB' },
  { id: 3, nama: 'Data Nilai Seluruh Siswa - Batch Jan', format: 'Excel', tanggal: '2025-02-10 16:44', oleh: 'Admin Akademik', ukuran: '180 KB' },
  { id: 4, nama: 'Kontrak Siswa Massal - 8 Siswa', format: 'PDF', tanggal: '2025-02-08 11:30', oleh: 'Admin Penyaluran', ukuran: '8.4 MB' },
];

export default function ExportData() {
  const [loadingId, setLoadingId] = useState(null);
  const [doneId, setDoneId] = useState(null);
  const [filterFormat, setFilterFormat] = useState('Semua');
  const [selectedPeriod, setSelectedPeriod] = useState('Feb 2025');

  const handleExport = (id, format) => {
    const key = `${id}-${format}`;
    setLoadingId(key);

    setTimeout(() => {
      setLoadingId(null);
      setDoneId(key);
      setTimeout(() => setDoneId(null), 3000);
    }, 1500);
  };

  const filteredTemplates = useMemo(() => {
    if (filterFormat === 'Semua') return exportTemplates;

    return exportTemplates.map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.format.includes(filterFormat)
      )
    })).filter(group => group.items.length > 0);
  }, [filterFormat]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Export PDF / Excel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Unduh laporan dan data dalam berbagai format
          </p>
        </div>

        <div className="flex gap-3">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
          >
            {['Semua', 'Excel', 'PDF'].map(f => (
              <option key={f}>{f}</option>
            ))}
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {['Feb 2025', 'Jan 2025', 'Des 2024', 'Nov 2024', 'Custom...'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          📋 Export Terakhir
        </p>

        <div className="space-y-2">
          {recentExports.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {r.format === 'Excel' ? '📊' : '📄'}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.nama}</p>
                  <p className="text-xs text-gray-400">
                    {r.tanggal} · {r.oleh} · {r.ukuran}
                  </p>
                </div>
              </div>

              <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                r.format === 'Excel'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {r.format}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="space-y-5">
        {filteredTemplates.map((group) => (
          <div key={group.kategori} className={`rounded-xl border p-5 ${group.color}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{group.icon}</span>
              <h3 className="font-bold text-gray-800">{group.kategori}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    {item.nama}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {item.deskripsi}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      ⏱️ {item.estimasi}
                    </span>

                    <div className="flex gap-2">
                      {item.format.map((fmt) => {
                        const key = `${item.id}-${fmt}`;
                        const isLoading = loadingId === key;
                        const isDone = doneId === key;

                        return (
                          <button
                            key={fmt}
                            onClick={() => handleExport(item.id, fmt)}
                            disabled={isLoading}
                            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                              isDone
                                ? 'bg-emerald-500 text-white'
                                : isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : fmt === 'Excel'
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white'
                            }`}
                          >
                            {isLoading
                              ? '⏳ Proses...'
                              : isDone
                              ? '✅ Berhasil!'
                              : fmt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}