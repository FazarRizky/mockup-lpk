import React from 'react';

const monitoring = [
  { dept: 'Operasional Akademik', icon: '🎓', color: '#6366f1', anggaran: 620000000, realisasi: 63000000, persen: 10.2, proyeksi: 640000000, status: 'Aman' },
  { dept: 'Rekrutmen & Seleksi', icon: '🔍', color: '#f59e0b', anggaran: 480000000, realisasi: 62000000, persen: 12.9, proyeksi: 510000000, status: 'Perhatian' },
  { dept: 'Operasional Penempatan', icon: '✈️', color: '#0ea5e9', anggaran: 750000000, realisasi: 46200000, persen: 6.2, proyeksi: 720000000, status: 'Aman' },
  { dept: 'Administrasi & Umum', icon: '🏢', color: '#10b981', anggaran: 360000000, realisasi: 41500000, persen: 11.5, proyeksi: 365000000, status: 'Aman' },
  { dept: 'IT & Sistem Informasi', icon: '💻', color: '#8b5cf6', anggaran: 190000000, realisasi: 38000000, persen: 20.0, proyeksi: 225000000, status: 'Peringatan' },
];

const monthlyData = [
  { bulan: 'Jan', anggaran: 200000000, realisasi: 185000000 },
  { bulan: 'Feb', anggaran: 200000000, realisasi: 172000000 },
  { bulan: 'Mar', anggaran: 200000000, realisasi: 0 },
  { bulan: 'Apr', anggaran: 200000000, realisasi: 0 },
];

const fmt = (n) => 'Rp ' + (n / 1000000).toFixed(1) + ' Jt';

const statusConfig = {
  Aman: { bg: '#e6f9f0', text: '#0e7a4d', dot: '#16a34a' },
  Perhatian: { bg: '#fff7e6', text: '#92580a', dot: '#f59e0b' },
  Peringatan: { bg: '#fef2f2', text: '#b91c1c', dot: '#dc2626' },
};

export default function BudgetMonitoring() {
  const totalAnggaran = monitoring.reduce((s, r) => s + r.anggaran, 0);
  const totalRealisasi = monitoring.reduce((s, r) => s + r.realisasi, 0);

  const totalPct =
    totalAnggaran > 0
      ? ((totalRealisasi / totalAnggaran) * 100).toFixed(1)
      : '0.0';

  const sisaAnggaran = totalAnggaran - totalRealisasi;
  const peringatanCount = monitoring.filter(
    (m) => m.status === 'Peringatan'
  ).length;

  const maxMonthly = Math.max(...monthlyData.map(m => m.anggaran));

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: '#f8fafc',
        minHeight: '100vh',
        padding: '28px 32px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>
            Monitoring Anggaran
          </h1>
          <p style={{ color: '#64748b', fontSize: 13 }}>
            Modul Budgeting · Tahun Anggaran 2025
          </p>
        </div>
      </div>

      {/* KPI */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Card label="Total Anggaran 2025" value={fmt(totalAnggaran)} />
        <Card
          label="Total Realisasi YTD"
          value={fmt(totalRealisasi)}
          sub={totalPct + '% dari total'}
        />
        <Card
          label="Sisa Anggaran"
          value={fmt(sisaAnggaran)}
          sub={(100 - Number(totalPct)).toFixed(1) + '% tersedia'}
        />
        <Card
          label="Dept Status Peringatan"
          value={peringatanCount + ' dept'}
          sub="Perlu perhatian"
        />
      </div>

      {/* Grafik Monthly (memakai monthlyData -> FIX ESLINT) */}
      <div style={{ background: '#fff', borderRadius: 14, padding: 20, marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Realisasi vs Anggaran Bulanan</h3>
        <div style={{ display: 'flex', alignItems: 'end', gap: 16, height: 120 }}>
          {monthlyData.map((m) => (
            <div key={m.bulan} style={{ textAlign: 'center', flex: 1 }}>
              <div
                style={{
                  background: '#0ea5e9',
                  height: (m.realisasi / maxMonthly) * 100,
                  borderRadius: 6,
                }}
                title={`Realisasi ${fmt(m.realisasi)}`}
              />
              <div style={{ fontSize: 12, marginTop: 6 }}>{m.bulan}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Monitoring (memakai statusConfig -> FIX ESLINT) */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th>Departemen</th>
              <th>Anggaran</th>
              <th>Realisasi</th>
              <th>Persen</th>
              <th>Proyeksi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {monitoring.map((m, i) => {
              const sc = statusConfig[m.status];
              return (
                <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td>{m.icon} {m.dept}</td>
                  <td>{fmt(m.anggaran)}</td>
                  <td>{fmt(m.realisasi)}</td>
                  <td>{m.persen}%</td>
                  <td>{fmt(m.proyeksi)}</td>
                  <td>
                    <span
                      style={{
                        background: sc.bg,
                        color: sc.text,
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      ● {m.status}
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

function Card({ label, value, sub }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1px solid #f1f5f9' }}>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0 0' }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{sub}</p>}
    </div>
  );
}