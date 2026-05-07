import React from 'react';
import { X, Heart, Mail, Phone, MapPin, GraduationCap, Calendar, IdCard, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { useKandidat } from '../../context/KandidatContext';

const ORANGE = '#FF6B00';

const jlptColor = {
  N1: 'bg-purple-100 text-purple-700',
  N2: 'bg-indigo-100 text-indigo-700',
  N3: 'bg-blue-100 text-blue-700',
  N4: 'bg-teal-100 text-teal-700',
  N5: 'bg-gray-100 text-gray-600',
  Belum: 'bg-gray-100 text-gray-500',
};

function Avatar({ siswa, size = 64 }) {
  if (siswa.fotoBase64) {
    return (
      <img
        src={siswa.fotoBase64}
        alt={siswa.namaLengkap}
        className="rounded-2xl object-cover shadow-sm"
        style={{ width: size, height: size }}
      />
    );
  }
  const initial = siswa.namaLengkap.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div
      className="rounded-2xl flex items-center justify-center text-white font-bold shadow-sm"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)',
        fontSize: size / 3,
      }}
    >
      {initial}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0" style={{ color: ORANGE }}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{label}</p>
        <p className="text-sm font-medium text-gray-800 break-words">{value || '-'}</p>
      </div>
    </div>
  );
}

export default function DetailSiswaModal({ siswa, onClose }) {
  const { updateStatus } = useKandidat();
  if (!siswa) return null;

  const totalNilai = siswa.nilaiTes + siswa.nilaiWawancara;
  const ratNilai = Math.round(totalNilai / 2);
  const isTertarik = siswa.status === 'Diminati Sales';

  const handleTertarik = () => {
    if (isTertarik) {
      toast('Siswa ini sudah ditandai diminati', { icon: '💡' });
      return;
    }
    updateStatus(siswa.id, 'Diminati Sales');
    toast.success(`${siswa.namaLengkap} ditandai "Diminati Sales"`);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div
          className="px-6 py-5 text-white relative"
          style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4">
            <Avatar siswa={siswa} size={72} />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-xl truncate">{siswa.namaLengkap}</h2>
              <p className="text-orange-50 text-sm truncate">{siswa.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${jlptColor[siswa.jlptLevel] || jlptColor.Belum}`}>
                  JLPT {siswa.jlptLevel}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/25 text-white">
                  Rata-rata {ratNilai}
                </span>
                {isTertarik && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 inline-flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-current" /> Diminati
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Skill chips */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Keahlian</p>
            <div className="flex flex-wrap gap-2">
              {siswa.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{ backgroundColor: '#FFF1E6', color: ORANGE, borderColor: '#FFD9B8' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Nilai */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Penilaian</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-gray-500">Nilai Tes Masuk</p>
                <p className="text-2xl font-bold text-gray-800">{siswa.nilaiTes}</p>
                <div className="h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${siswa.nilaiTes}%`, backgroundColor: ORANGE }} />
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Nilai Wawancara</p>
                <p className="text-2xl font-bold text-gray-800">{siswa.nilaiWawancara}</p>
                <div className="h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${siswa.nilaiWawancara}%`, backgroundColor: ORANGE }} />
                </div>
              </div>
            </div>
          </div>

          {/* Data diri */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Data Diri</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={IdCard} label="NIK" value={siswa.nik} />
              <InfoRow icon={Calendar} label="Tanggal Lahir" value={siswa.tanggalLahir} />
              <InfoRow icon={Award} label="Jenis Kelamin" value={siswa.jenisKelamin} />
              <InfoRow icon={Phone} label="No. HP" value={siswa.noHp} />
              <InfoRow icon={Mail} label="Email" value={siswa.email} />
              <InfoRow icon={MapPin} label="Alamat" value={siswa.alamat} />
            </div>
          </div>

          {/* Pendidikan */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Pendidikan</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={GraduationCap} label="Pendidikan Terakhir" value={siswa.pendidikanTerakhir} />
              <InfoRow icon={GraduationCap} label="Asal Sekolah" value={siswa.asalSekolah} />
              <InfoRow icon={GraduationCap} label="Jurusan" value={siswa.jurusan} />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-100 p-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-white"
          >
            Tutup
          </button>
          <button
            onClick={handleTertarik}
            disabled={isTertarik}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg shadow-orange-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
          >
            <Heart className={`w-4 h-4 ${isTertarik ? 'fill-current' : ''}`} />
            {isTertarik ? 'Sudah Diminati' : 'Tandai Tertarik'}
          </button>
        </div>
      </div>
    </div>
  );
}
