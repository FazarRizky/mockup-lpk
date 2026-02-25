import React, { useState, useMemo } from 'react';

const cashInData = [
  { id: 'CI-2025-001', tanggal: '2025-02-01', sumber: 'Ahmad Fauzi', keterangan: 'Pembayaran biaya pendidikan - Termin 1', kategori: 'Biaya Pendidikan', jumlah: 8000000, rekening: 'BCA - 1234567890', bukti: 'bukti_tf_001.pdf' },
  { id: 'CI-2025-002', tanggal: '2025-02-03', sumber: 'Dewi Lestari', keterangan: 'Pelunasan biaya pendidikan', kategori: 'Biaya Pendidikan', jumlah: 25000000, rekening: 'Mandiri - 0987654321', bukti: 'bukti_tf_002.pdf' },
  { id: 'CI-2025-003', tanggal: '2025-02-05', sumber: 'PT. Yamaha Motor Japan', keterangan: 'Fee penempatan - Batch Jan 2025 (5 orang)', kategori: 'Fee Penempatan', jumlah: 50000000, rekening: 'BNI - 1122334455', bukti: 'bukti_tf_003.pdf' },
  { id: 'CI-2025-004', tanggal: '2025-02-07', sumber: 'Nurul Hidayah', keterangan: 'Pembayaran biaya pendidikan - Termin 2', kategori: 'Biaya Pendidikan', jumlah: 10000000, rekening: 'BCA - 1234567890', bukti: 'bukti_tf_004.pdf' },
  { id: 'CI-2025-005', tanggal: '2025-02-08', sumber: 'Rizki Pratama', keterangan: 'Pembayaran uang muka pendidikan', kategori: 'Biaya Pendidikan', jumlah: 5000000, rekening: 'BRI - 5544332211', bukti: 'bukti_tf_005.pdf' },
  { id: 'CI-2025-006', tanggal: '2025-02-10', sumber: 'Kemnaker RI', keterangan: 'Subsidi pelatihan - Program G to G 2025', kategori: 'Subsidi/Hibah', jumlah: 75000000, rekening: 'BNI - 1122334455', bukti: 'bukti_tf_006.pdf' },
  { id: 'CI-2025-007', tanggal: '2025-02-12', sumber: 'Hendra Wijaya', keterangan: 'Cicilan biaya pendidikan ke-3', kategori: 'Biaya Pendidikan', jumlah: 7000000, rekening: 'BCA - 1234567890', bukti: 'bukti_tf_007.pdf' },
  { id: 'CI-2025-008', tanggal: '2025-02-14', sumber: 'Siti Rahayu', keterangan: 'Pembayaran biaya tes bahasa JLPT', kategori: 'Biaya Tes', jumlah: 1500000, rekening: 'Mandiri - 0987654321', bukti: 'bukti_tf_008.pdf' },
];

const kategoriColor = {
  'Biaya Pendidikan': 'bg-blue-100 text-blue-700',
  'Fee Penempatan': 'bg-purple-100 text-purple-700',
  'Subsidi/Hibah': 'bg-emerald-100 text-emerald-700',
  'Biaya Tes': 'bg-orange-100 text-orange-700',
};

const formatRupiah = (value) =>
  value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

export default function CashIn() {
  const [search, setSearch] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = useMemo(() => {
    return cashInData.filter((c) => {
      const matchSearch =
        c.sumber.toLowerCase().includes(search.toLowerCase()) ||
        c.keterangan.toLowerCase().includes(search.toLowerCase());

      const matchKat =
        filterKategori === 'Semua' || c.kategori === filterKategori;

      const matchStart =
        !startDate || new Date(c.tanggal) >= new Date(startDate);

      const matchEnd =
        !endDate || new Date(c.tanggal) <= new Date(endDate);

      return matchSearch && matchKat && matchStart && matchEnd;
    });
  }, [search, filterKategori, startDate, endDate]);

  const totalMasuk = useMemo(
    () => cashInData.reduce((acc, c) => acc + c.jumlah, 0),
    []
  );

  const totalFiltered = useMemo(
    () => filtered.reduce((acc, c) => acc + c.jumlah, 0),
    [filtered]
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cash In</h1>
          <p className="text-sm text-gray-500 mt-1">
            Pencatatan semua pemasukan keuangan LPK
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Cari sumber atau keterangan..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filterKategori}
          onChange={(e) => setFilterKategori(e.target.value)}
        >
          {['Semua', 'Biaya Pendidikan', 'Fee Penempatan', 'Subsidi/Hibah', 'Biaya Tes'].map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <p className="text-sm text-gray-500">Total Semua Pemasukan</p>
        <p className="text-xl font-bold text-emerald-600">
          {formatRupiah(totalMasuk)}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Sumber</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Jumlah</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 text-emerald-600 font-mono text-xs">
                  {c.id}
                </td>
                <td className="px-4 py-3">{c.tanggal}</td>
                <td className="px-4 py-3 font-medium">{c.sumber}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${kategoriColor[c.kategori]}`}>
                    {c.kategori}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-emerald-600">
                  +{formatRupiah(c.jumlah)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-emerald-50 font-bold">
              <td colSpan={4} className="px-4 py-3">
                Total ({filtered.length} transaksi)
              </td>
              <td className="px-4 py-3 text-emerald-700">
                +{formatRupiah(totalFiltered)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}