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
  const [filter, setFilter] = useState('Semua');

  const filtered = dummyJournals.filter(j =>
    (filter === 'Semua' || j.status === filter) &&
    (j.keterangan.toLowerCase().includes(search.toLowerCase()) ||
      j.id.toLowerCase().includes(search.toLowerCase()))
  );

  const totalDisetujui = dummyJournals
    .filter(j => j.status === 'Disetujui')
    .reduce((a, b) => a + b.nominal, 0);

  const pendingCount = dummyJournals.filter(j => j.status === 'Pending').length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc', minHeight: '100vh', padding: '28px 32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Jurnal Manual</h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>Modul Akuntansi · Periode Januari 2025</p>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card label="Total Transaksi" value={dummyJournals.length + ' entri'} />
        <Card label="Total Disetujui" value={fmt(totalDisetujui)} />
        <Card label="Menunggu Persetujuan" value={pendingCount + ' jurnal'} />
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
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 12px',
                background: filter === s ? '#3b82f6' : '#e2e8f0',
                color: filter === s ? '#fff' : '#334155',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Keterangan</th>
              <th>Debit</th>
              <th>Kredit</th>
              <th>Nominal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(j => {
              const sc = statusColor[j.status];
              return (
                <tr key={j.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td>{j.id}</td>
                  <td>{j.tanggal}</td>
                  <td>{j.keterangan}</td>
                  <td>{j.debit}</td>
                  <td>{j.kredit}</td>
                  <td>{fmt(j.nominal)}</td>
                  <td>
                    <span style={{
                      background: sc.bg,
                      color: sc.text,
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      ● {j.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1px solid #f1f5f9' }}>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0 0' }}>{value}</p>
    </div>
  );
}