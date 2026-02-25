import React, { useState } from 'react';

const dummyJournals = [
  { id: 'JNL-2025-001', tanggal: '2025-01-05', keterangan: 'Pembayaran SPP Siswa Batch 12', debit: 'Kas', kredit: 'Pendapatan SPP', nominal: 15000000, status: 'Disetujui', dibuat: 'Rina Susanti' },
  { id: 'JNL-2025-002', tanggal: '2025-01-08', keterangan: 'Pembelian Modul Pelatihan Bahasa Jepang', debit: 'Biaya Pelatihan', kredit: 'Kas', nominal: 3500000, status: 'Disetujui', dibuat: 'Budi Hartono' },
  { id: 'JNL-2025-003', tanggal: '2025-01-12', keterangan: 'Pembayaran Gaji Instruktur Bahasa Jepang', debit: 'Biaya Gaji', kredit: 'Kas', nominal: 8000000, status: 'Disetujui', dibuat: 'Rina Susanti' },
  { id: 'JNL-2025-004', tanggal: '2025-01-15', keterangan: 'Pendapatan Fee Penempatan Kerja ke Jepang', debit: 'Piutang Usaha', kredit: 'Pendapatan Fee', nominal: 22500000, status: 'Pending', dibuat: 'Agus Prasetyo' },
  { id: 'JNL-2025-005', tanggal: '2025-01-18', keterangan: 'Biaya Pengurusan Visa Siswa', debit: 'Biaya Visa & Dokumen', kredit: 'Kas', nominal: 4200000, status: 'Disetujui', dibuat: 'Budi Hartono' },
  { id: 'JNL-2025-006', tanggal: '2025-01-20', keterangan: 'Koreksi Jurnal Biaya Operasional', debit: 'Biaya Operasional', kredit: 'Biaya Administrasi', nominal: 750000, status: 'Draft', dibuat: 'Rina Susanti' },
  { id: 'JNL-2025-007', tanggal: '2025-01-25', keterangan: 'Penerimaan DP Kontrak Mitra Jepang', debit: 'Kas', kredit: 'Pendapatan Diterima di Muka', nominal: 30000000, status: 'Disetujui', dibuat: 'Agus Prasetyo' },
];

const statusColor = {
  Disetujui: { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  Pending: { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  Draft: { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
};

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function ManualJournal() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('Semua');

  const filtered = dummyJournals.filter(j =>
    (filter === 'Semua' || j.status === filter) &&
    (j.keterangan.toLowerCase().includes(search.toLowerCase()) ||
      j.id.toLowerCase().includes(search.toLowerCase()))
  );

  const total = dummyJournals.reduce((a, b) => a + b.nominal, 0);

  // SEKARANG DIPAKAI
  const totalDisetujui = dummyJournals
    .filter(j => j.status === 'Disetujui')
    .reduce((a, b) => a + b.nominal, 0);

  const pendingCount = dummyJournals.filter(j => j.status === 'Pending').length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>📒</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>Jurnal Manual</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Modul Akuntansi · Periode Januari 2025</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '10px 20px',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          + Tambah Jurnal
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Transaksi', value: dummyJournals.length + ' entri', sub: 'Januari 2025', icon: '📋', color: '#3b82f6' },
          { label: 'Total Disetujui', value: fmt(totalDisetujui), sub: 'Sudah disetujui', icon: '✅', color: '#10b981' },
          { label: 'Menunggu Persetujuan', value: pendingCount + ' jurnal', sub: 'Perlu ditindaklanjuti', icon: '⏳', color: '#f59e0b' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
            <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{c.label}</p>
            <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>{c.value}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f1f5f9' }}>
        <div style={{ padding: 16, display: 'flex', gap: 12 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari jurnal..."
            style={{ flex: 1, padding: 8 }}
          />
          {['Semua', 'Disetujui', 'Pending', 'Draft'].map(s => (
            <button key={s} onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Nominal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(j => {
              const sc = statusColor[j.status];
              return (
                <tr key={j.id}>
                  <td>{j.id}</td>
                  <td>{j.tanggal}</td>
                  <td>{j.keterangan}</td>
                  <td>{fmt(j.nominal)}</td>
                  <td style={{ color: sc.text }}>{j.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}