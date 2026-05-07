import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Heart, Award, Users } from 'lucide-react';
import { useKandidat } from '../../context/KandidatContext';
import DetailSiswaModal from './DetailSiswaModal';

const ORANGE = '#FF6B00';

const SKILL_OPTIONS = [
  'Caregiver', 'Konstruksi', 'Pertanian', 'Manufaktur', 'Perhotelan', 'F&B', 'IT',
];
const JLPT_ORDER = { N1: 5, N2: 4, N3: 3, N4: 2, N5: 1, Belum: 0 };
const JLPT_OPTIONS = ['Semua', 'N1', 'N2', 'N3', 'N4', 'N5', 'Belum'];

const jlptColor = {
  N1: 'bg-purple-100 text-purple-700',
  N2: 'bg-indigo-100 text-indigo-700',
  N3: 'bg-blue-100 text-blue-700',
  N4: 'bg-teal-100 text-teal-700',
  N5: 'bg-gray-100 text-gray-600',
  Belum: 'bg-gray-100 text-gray-500',
};

function Avatar({ siswa }) {
  if (siswa.fotoBase64) {
    return (
      <img
        src={siswa.fotoBase64}
        alt={siswa.namaLengkap}
        className="w-14 h-14 rounded-2xl object-cover shadow-sm flex-shrink-0"
      />
    );
  }
  const initial = siswa.namaLengkap.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
    >
      {initial}
    </div>
  );
}

export default function DaftarSiswa({ tertarikOnly = false }) {
  const { getApprovedOnly, kandidatList } = useKandidat();
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('Semua');
  const [jlptFilter, setJlptFilter] = useState('Semua');
  const [minNilai, setMinNilai] = useState(0);
  const [sortBy, setSortBy] = useState('nilai-desc');
  const [selected, setSelected] = useState(null);

  const baseList = tertarikOnly
    ? kandidatList.filter((k) => k.status === 'Diminati Sales')
    : getApprovedOnly();

  const filtered = useMemo(() => {
    let list = baseList.filter((k) => {
      const mSearch = k.namaLengkap.toLowerCase().includes(search.toLowerCase());
      const mSkill = skillFilter === 'Semua' || k.skills.includes(skillFilter);
      const mJlpt = jlptFilter === 'Semua' || k.jlptLevel === jlptFilter;
      const mNilai = k.nilaiTes >= minNilai;
      return mSearch && mSkill && mJlpt && mNilai;
    });
    if (sortBy === 'nilai-desc') {
      list = [...list].sort((a, b) => (b.nilaiTes + b.nilaiWawancara) - (a.nilaiTes + a.nilaiWawancara));
    } else if (sortBy === 'jlpt-desc') {
      list = [...list].sort((a, b) => (JLPT_ORDER[b.jlptLevel] || 0) - (JLPT_ORDER[a.jlptLevel] || 0));
    }
    return list;
  }, [baseList, search, skillFilter, jlptFilter, minNilai, sortBy]);

  const stats = useMemo(() => {
    const approved = kandidatList.filter((k) => k.status === 'Approved').length;
    const tertarik = kandidatList.filter((k) => k.status === 'Diminati Sales').length;
    return {
      total: baseList.length,
      approved,
      tertarik,
      tampil: filtered.length,
    };
  }, [kandidatList, baseList.length, filtered.length]);

  return (
    <div className="p-4 sm:p-6">
      {/* Heading + Stats */}
      <div className="mb-5">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {tertarikOnly ? 'Siswa yang Diminati' : 'Daftar Siswa Tersedia'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {tertarikOnly
              ? 'Daftar siswa yang sudah Anda tandai sebagai diminati'
              : 'Pilih kandidat terbaik untuk perusahaan mitra Jepang'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Tersedia', val: stats.total, icon: Users, color: ORANGE, bg: '#FFF1E6' },
            { label: 'Approved Admin', val: stats.approved, icon: Award, color: '#0EA5E9', bg: '#E0F2FE' },
            { label: 'Tertarik', val: stats.tertarik, icon: Heart, color: '#EC4899', bg: '#FCE7F3' },
            { label: 'Hasil Filter', val: stats.tampil, icon: SlidersHorizontal, color: '#10B981', bg: '#D1FAE5' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: s.bg, color: s.color }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">{s.label}</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">{s.val}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cari Nama</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama siswa..."
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent"
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Keahlian</label>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="Semua">Semua Keahlian</option>
              {SKILL_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">JLPT</label>
            <select
              value={jlptFilter}
              onChange={(e) => setJlptFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {JLPT_OPTIONS.map((j) => (
                <option key={j} value={j}>{j === 'Semua' ? 'Semua JLPT' : `JLPT ${j}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Urutkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="nilai-desc">Nilai Tertinggi</option>
              <option value="jlpt-desc">JLPT Tertinggi</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Min. Nilai Tes Masuk: <span className="font-bold" style={{ color: ORANGE }}>{minNilai}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={minNilai}
            onChange={(e) => setMinNilai(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>0</span><span>50</span><span>100</span>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <p className="font-semibold text-gray-700">Tidak ada siswa yang cocok</p>
          <p className="text-sm text-gray-500 mt-1">
            Coba ubah filter atau tunggu kandidat baru di-approve oleh Admin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((siswa) => {
            const isTertarik = siswa.status === 'Diminati Sales';
            const totalNilai = siswa.nilaiTes + siswa.nilaiWawancara;
            return (
              <button
                key={siswa.id}
                onClick={() => setSelected(siswa)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-lg hover:border-orange-200 transition-all group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar siswa={siswa} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                      {siswa.namaLengkap}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{siswa.pendidikanTerakhir} · {siswa.asalSekolah}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${jlptColor[siswa.jlptLevel] || jlptColor.Belum}`}>
                        JLPT {siswa.jlptLevel}
                      </span>
                      {isTertarik && (
                        <Heart className="w-3.5 h-3.5 text-pink-500 fill-current" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {siswa.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{ backgroundColor: '#FFF1E6', color: ORANGE, borderColor: '#FFD9B8' }}
                    >
                      {s}
                    </span>
                  ))}
                  {siswa.skills.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                      +{siswa.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Nilai Tes</p>
                    <p className="text-sm font-bold text-gray-800">{siswa.nilaiTes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Wawancara</p>
                    <p className="text-sm font-bold text-gray-800">{siswa.nilaiWawancara}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Total: <span className="font-bold" style={{ color: ORANGE }}>{totalNilai}</span></span>
                  <span className="text-[10px] font-bold text-orange-600 group-hover:underline">Detail →</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <DetailSiswaModal siswa={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
