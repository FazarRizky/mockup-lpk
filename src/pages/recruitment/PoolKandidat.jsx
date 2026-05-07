import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Users, CheckCircle2, XCircle, Heart, Search, Eye, Trash2, Check, X, Filter,
} from 'lucide-react';
import { useKandidat } from '../../context/KandidatContext';

const SKILL_OPTIONS = [
  'Caregiver', 'Konstruksi', 'Pertanian', 'Manufaktur', 'Perhotelan', 'F&B', 'IT',
];
const STATUS_OPTIONS = ['Pending Review', 'Approved', 'Rejected', 'Diminati Sales'];

const statusColor = {
  'Pending Review': 'bg-yellow-100 text-yellow-700',
  'Approved': 'bg-emerald-100 text-emerald-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Diminati Sales': 'bg-pink-100 text-pink-700',
};

const jlptColor = {
  N1: 'bg-purple-100 text-purple-700',
  N2: 'bg-indigo-100 text-indigo-700',
  N3: 'bg-blue-100 text-blue-700',
  N4: 'bg-teal-100 text-teal-700',
  N5: 'bg-gray-100 text-gray-600',
  Belum: 'bg-gray-100 text-gray-500',
};

function Avatar({ siswa, size = 36 }) {
  if (siswa.fotoBase64) {
    return (
      <img
        src={siswa.fotoBase64}
        alt={siswa.namaLengkap}
        className="rounded-lg object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initial = siswa.namaLengkap.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div
      className="rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold"
      style={{ width: size, height: size, fontSize: size / 3 }}
    >
      {initial}
    </div>
  );
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, danger }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5">
        <h3 className="font-bold text-gray-800 text-base mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white text-sm font-semibold ${
              danger ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ siswa, onClose }) {
  if (!siswa) return null;
  const total = siswa.nilaiTes + siswa.nilaiWawancara;
  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-4">
          <Avatar siswa={siswa} size={56} />
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-800 truncate">{siswa.namaLengkap}</h2>
            <p className="text-xs text-gray-500 truncate">{siswa.email} · {siswa.noHp}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor[siswa.status]}`}>
              {siswa.status}
            </span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-semibold">NIK</p>
              <p className="font-medium text-gray-800">{siswa.nik}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-semibold">Tgl Lahir</p>
              <p className="font-medium text-gray-800">{siswa.tanggalLahir}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-semibold">Jenis Kelamin</p>
              <p className="font-medium text-gray-800">{siswa.jenisKelamin}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-semibold">Pendidikan</p>
              <p className="font-medium text-gray-800">{siswa.pendidikanTerakhir} · {siswa.asalSekolah}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[11px] text-gray-400 uppercase font-semibold">Alamat</p>
              <p className="font-medium text-gray-800">{siswa.alamat}</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase font-semibold mb-2">Keahlian</p>
            <div className="flex flex-wrap gap-1.5">
              {siswa.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Penilaian</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] text-gray-500">JLPT</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold ${jlptColor[siswa.jlptLevel]}`}>
                  {siswa.jlptLevel}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Tes Masuk</p>
                <p className="text-xl font-bold text-gray-800">{siswa.nilaiTes}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Wawancara</p>
                <p className="text-xl font-bold text-gray-800">{siswa.nilaiWawancara}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">Total Nilai</span>
              <span className="font-bold text-gray-800">{total} / 200</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-white">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PoolKandidat() {
  const { kandidatList, updateStatus, deleteKandidat } = useKandidat();
  const [filterSkill, setFilterSkill] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const filtered = useMemo(() => {
    return kandidatList.filter((k) => {
      const mSkill = filterSkill === 'Semua' || k.skills.includes(filterSkill);
      const mStatus = filterStatus === 'Semua' || k.status === filterStatus;
      const mSearch = k.namaLengkap.toLowerCase().includes(search.toLowerCase());
      return mSkill && mStatus && mSearch;
    });
  }, [kandidatList, filterSkill, filterStatus, search]);

  const stats = useMemo(
    () => ({
      total: kandidatList.length,
      pending: kandidatList.filter((k) => k.status === 'Pending Review').length,
      approved: kandidatList.filter((k) => k.status === 'Approved').length,
      rejected: kandidatList.filter((k) => k.status === 'Rejected').length,
      tertarik: kandidatList.filter((k) => k.status === 'Diminati Sales').length,
    }),
    [kandidatList]
  );

  const handleApprove = (siswa) => {
    updateStatus(siswa.id, 'Approved');
    toast.success(`${siswa.namaLengkap} disetujui`);
  };
  const handleReject = (siswa) => {
    updateStatus(siswa.id, 'Rejected');
    toast.success(`${siswa.namaLengkap} ditolak`, { icon: '🚫' });
  };
  const handleDelete = () => {
    if (!confirmDel) return;
    deleteKandidat(confirmDel.id);
    toast.success(`${confirmDel.namaLengkap} dihapus`);
    setConfirmDel(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pool Kandidat</h1>
        <p className="text-sm text-gray-500 mt-1">
          Database calon siswa hasil pendaftaran online — review, approve, atau reject pengajuan masuk.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total', val: stats.total, color: 'text-gray-800', icon: Users, bg: 'bg-gray-100' },
          { label: 'Pending', val: stats.pending, color: 'text-yellow-600', icon: Filter, bg: 'bg-yellow-100' },
          { label: 'Approved', val: stats.approved, color: 'text-emerald-600', icon: CheckCircle2, bg: 'bg-emerald-100' },
          { label: 'Rejected', val: stats.rejected, color: 'text-red-600', icon: XCircle, bg: 'bg-red-100' },
          { label: 'Diminati Sales', val: stats.tertarik, color: 'text-pink-600', icon: Heart, bg: 'bg-pink-100' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 bg-white rounded-xl border border-gray-200 p-3">
        <div className="relative flex-1 min-w-44">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={filterSkill}
          onChange={(e) => setFilterSkill(e.target.value)}
        >
          <option value="Semua">Semua Keahlian</option>
          {SKILL_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Semua">Semua Status</option>
          {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">No</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Foto</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Nama</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">NIK</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Skill</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">JLPT</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Tes</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Wawancara</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-10 text-gray-400 text-sm">
                  Tidak ada kandidat yang cocok dengan filter
                </td>
              </tr>
            )}
            {filtered.map((siswa, i) => (
              <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3 text-gray-500">{i + 1}</td>
                <td className="px-3 py-3"><Avatar siswa={siswa} /></td>
                <td className="px-3 py-3">
                  <p className="font-medium text-gray-800">{siswa.namaLengkap}</p>
                  <p className="text-xs text-gray-400">{siswa.pendidikanTerakhir} · {siswa.asalSekolah}</p>
                </td>
                <td className="px-3 py-3 text-xs text-gray-600 font-mono">{siswa.nik}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {siswa.skills.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                        {s}
                      </span>
                    ))}
                    {siswa.skills.length > 2 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                        +{siswa.skills.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${jlptColor[siswa.jlptLevel]}`}>
                    {siswa.jlptLevel}
                  </span>
                </td>
                <td className="px-3 py-3 text-center font-semibold text-gray-700">{siswa.nilaiTes}</td>
                <td className="px-3 py-3 text-center font-semibold text-gray-700">{siswa.nilaiWawancara}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[siswa.status]}`}>
                    {siswa.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setDetail(siswa)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                      title="Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {siswa.status !== 'Approved' && siswa.status !== 'Diminati Sales' && (
                      <button
                        onClick={() => handleApprove(siswa)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {siswa.status !== 'Rejected' && (
                      <button
                        onClick={() => handleReject(siswa)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setConfirmDel(siswa)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailModal siswa={detail} onClose={() => setDetail(null)} />
      <ConfirmDialog
        open={!!confirmDel}
        title="Hapus Kandidat?"
        message={`Yakin menghapus ${confirmDel?.namaLengkap}? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDel(null)}
        danger
      />
    </div>
  );
}
