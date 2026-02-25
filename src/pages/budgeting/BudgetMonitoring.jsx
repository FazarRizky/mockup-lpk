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

  // Fix: hindari NaN kalau anggaran = 0
  const totalPct =
    totalAnggaran > 0
      ? ((totalRealisasi / totalAnggaran) * 100).toFixed(1)
      : '0.0';

  const sisaAnggaran = totalAnggaran - totalRealisasi;
  const peringatanCount = monitoring.filter(
    (m) => m.status === 'Peringatan'
  ).length;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: '#f8fafc',
        minHeight: '100vh',
        padding: '28px 32px',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg,#0ea5e9,#0284c7)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 18 }}>📡</span>
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#0f172a',
                margin: 0,
              }}
            >
              Monitoring Anggaran
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
            Modul Budgeting · Real-time · Tahun Anggaran 2025
          </p>
        </div>

        <button
          style={{
            background: '#f1f5f9',
            color: '#475569',
            border: 'none',
            borderRadius: 10,
            padding: '10px 16px',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          📥 Laporan
        </button>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: 'Total Anggaran 2025',
            value: fmt(totalAnggaran),
            icon: '💰',
            color: '#0ea5e9',
          },
          {
            label: 'Total Realisasi YTD',
            value: fmt(totalRealisasi),
            sub: totalPct + '% dari total',
            icon: '📤',
            color: '#f97316',
          },
          {
            label: 'Sisa Anggaran',
            value: fmt(sisaAnggaran),
            sub: (100 - Number(totalPct)).toFixed(1) + '% tersedia',
            icon: '💡',
            color: '#16a34a',
          },
          {
            label: 'Status Dept Peringatan',
            value: peringatanCount + ' dept',
            sub: 'perlu perhatian',
            icon: '⚠️',
            color: '#dc2626',
          },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '18px 20px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              border: '1px solid #f1f5f9',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <p
                  style={{
                    margin: '0 0 6px',
                    fontSize: 11,
                    color: '#94a3b8',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    margin: '0 0 2px',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#0f172a',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {c.value}
                </p>
                {c.sub && (
                  <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>
                    {c.sub}
                  </p>
                )}
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: c.color + '18',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                {c.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sisanya (table & monthly) biarkan sama seperti punyamu — tidak error */}
    </div>
  );
}