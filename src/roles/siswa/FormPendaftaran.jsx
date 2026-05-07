import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  User, IdCard, Phone, Mail, MapPin, GraduationCap as Cap,
  Award, Camera, Send, Loader2,
} from 'lucide-react';
import { useKandidat } from '../../context/KandidatContext';

const SKILL_OPTIONS = [
  'Caregiver', 'Konstruksi', 'Pertanian', 'Manufaktur', 'Perhotelan', 'F&B', 'IT',
];
const PENDIDIKAN_OPTIONS = ['SMP', 'SMA', 'SMK', 'D3', 'S1'];
const JLPT_OPTIONS = ['Belum', 'N5', 'N4', 'N3', 'N2', 'N1'];

const ORANGE = '#FF6B00';

const initialState = {
  namaLengkap: '',
  nik: '',
  tanggalLahir: '',
  jenisKelamin: '',
  noHp: '',
  email: '',
  alamat: '',
  pendidikanTerakhir: '',
  asalSekolah: '',
  jurusan: '',
  skills: [],
  jlptLevel: '',
  nilaiTes: '',
  nilaiWawancara: '',
  fotoBase64: null,
};

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 sm:p-6 mb-5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: '#FFF1E6', color: ORANGE }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <h2 className="font-bold text-gray-800">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, required, error, children, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputBase =
  'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none transition-all focus:ring-2 focus:border-transparent';
const inputFocus = { boxShadow: 'none' };

export default function FormPendaftaran() {
  const navigate = useNavigate();
  const { addKandidat } = useKandidat();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleSkill = (skill) => {
    setForm((prev) => {
      const has = prev.skills.includes(skill);
      return { ...prev, skills: has ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill] };
    });
    setErrors((prev) => ({ ...prev, skills: undefined }));
  };

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast.error('Foto melebihi 1MB. Pilih file lebih kecil.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setField('fotoBase64', reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.namaLengkap.trim()) e.namaLengkap = 'Nama lengkap wajib diisi';
    if (!form.nik.trim()) e.nik = 'NIK wajib diisi';
    else if (!/^\d{16}$/.test(form.nik.trim())) e.nik = 'NIK harus 16 digit angka';
    if (!form.tanggalLahir) e.tanggalLahir = 'Tanggal lahir wajib diisi';
    if (!form.jenisKelamin) e.jenisKelamin = 'Pilih jenis kelamin';
    if (!form.noHp.trim()) e.noHp = 'No. HP wajib diisi';
    else if (!/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(form.noHp.trim())) e.noHp = 'Format No. HP tidak valid';
    if (!form.email.trim()) e.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Format email tidak valid';
    if (!form.alamat.trim()) e.alamat = 'Alamat wajib diisi';
    if (!form.pendidikanTerakhir) e.pendidikanTerakhir = 'Pilih pendidikan';
    if (!form.asalSekolah.trim()) e.asalSekolah = 'Asal sekolah wajib diisi';
    if (form.skills.length === 0) e.skills = 'Pilih minimal 1 keahlian';
    if (!form.jlptLevel) e.jlptLevel = 'Pilih level JLPT';
    const nt = Number(form.nilaiTes);
    if (form.nilaiTes === '' || Number.isNaN(nt)) e.nilaiTes = 'Nilai tes wajib diisi';
    else if (nt < 0 || nt > 100) e.nilaiTes = 'Nilai 0-100';
    const nw = Number(form.nilaiWawancara);
    if (form.nilaiWawancara === '' || Number.isNaN(nw)) e.nilaiWawancara = 'Nilai wawancara wajib diisi';
    else if (nw < 0 || nw > 100) e.nilaiWawancara = 'Nilai 0-100';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Periksa kembali data yang ditandai');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const created = addKandidat({
        ...form,
        nilaiTes: Number(form.nilaiTes),
        nilaiWawancara: Number(form.nilaiWawancara),
      });
      toast.success('Pendaftaran berhasil dikirim!');
      navigate('/siswa/sukses', { state: { id: created.id, nama: created.namaLengkap } });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Form Pendaftaran Calon Siswa
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Lengkapi data berikut untuk mendaftar sebagai calon peserta program pelatihan kerja Jepang.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="animate-fade-in">
        {/* Section Data Diri */}
        <Section title="Data Diri" icon={User}>
          <Field label="Nama Lengkap" required error={errors.namaLengkap} full>
            <input
              type="text"
              className={inputBase}
              style={inputFocus}
              value={form.namaLengkap}
              onChange={(e) => setField('namaLengkap', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
              placeholder="Mis. Budi Santoso"
            />
          </Field>

          <Field label="NIK (16 digit)" required error={errors.nik}>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={16}
                className={inputBase + ' pl-9'}
                value={form.nik}
                onChange={(e) => setField('nik', e.target.value.replace(/\D/g, ''))}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
                placeholder="3201xxxxxxxxxxxx"
              />
            </div>
          </Field>

          <Field label="Tanggal Lahir" required error={errors.tanggalLahir}>
            <input
              type="date"
              className={inputBase}
              value={form.tanggalLahir}
              onChange={(e) => setField('tanggalLahir', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            />
          </Field>

          <Field label="Jenis Kelamin" required error={errors.jenisKelamin} full>
            <div className="flex gap-3">
              {['Laki-laki', 'Perempuan'].map((jk) => (
                <label
                  key={jk}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer text-sm transition-all ${
                    form.jenisKelamin === jk
                      ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="jk"
                    className="accent-orange-500"
                    checked={form.jenisKelamin === jk}
                    onChange={() => setField('jenisKelamin', jk)}
                  />
                  {jk}
                </label>
              ))}
            </div>
          </Field>

          <Field label="No. HP" required error={errors.noHp}>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                className={inputBase + ' pl-9'}
                value={form.noHp}
                onChange={(e) => setField('noHp', e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </Field>

          <Field label="Email" required error={errors.email}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                className={inputBase + ' pl-9'}
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
                placeholder="email@contoh.com"
              />
            </div>
          </Field>

          <Field label="Alamat" required error={errors.alamat} full>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                rows={2}
                className={inputBase + ' pl-9 resize-none'}
                value={form.alamat}
                onChange={(e) => setField('alamat', e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
                placeholder="Alamat lengkap tempat tinggal"
              />
            </div>
          </Field>
        </Section>

        {/* Section Pendidikan */}
        <Section title="Pendidikan" icon={Cap}>
          <Field label="Pendidikan Terakhir" required error={errors.pendidikanTerakhir}>
            <select
              className={inputBase}
              value={form.pendidikanTerakhir}
              onChange={(e) => setField('pendidikanTerakhir', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            >
              <option value="">— Pilih —</option>
              {PENDIDIKAN_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>

          <Field label="Asal Sekolah / Universitas" required error={errors.asalSekolah}>
            <input
              type="text"
              className={inputBase}
              value={form.asalSekolah}
              onChange={(e) => setField('asalSekolah', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
              placeholder="Mis. SMAN 1 Jakarta"
            />
          </Field>

          <Field label="Jurusan (opsional)" full>
            <input
              type="text"
              className={inputBase}
              value={form.jurusan}
              onChange={(e) => setField('jurusan', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
              placeholder="Mis. IPA / Teknik Mesin"
            />
          </Field>
        </Section>

        {/* Section Keahlian */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 sm:p-6 mb-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FFF1E6', color: ORANGE }}
            >
              <Award className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-gray-800">Keahlian</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Pilih minimal 1 bidang keahlian <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((s) => {
              const active = form.skills.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {errors.skills && <p className="text-xs text-red-500 mt-2">{errors.skills}</p>}
        </div>

        {/* Section Nilai */}
        <Section title="Nilai" icon={Award}>
          <Field label="JLPT Level" required error={errors.jlptLevel}>
            <select
              className={inputBase}
              value={form.jlptLevel}
              onChange={(e) => setField('jlptLevel', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            >
              <option value="">— Pilih —</option>
              {JLPT_OPTIONS.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </Field>

          <div />

          <Field label="Nilai Tes Masuk (0-100)" required error={errors.nilaiTes}>
            <input
              type="number"
              min={0}
              max={100}
              className={inputBase}
              value={form.nilaiTes}
              onChange={(e) => setField('nilaiTes', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
              placeholder="0-100"
            />
          </Field>

          <Field label="Nilai Wawancara (0-100)" required error={errors.nilaiWawancara}>
            <input
              type="number"
              min={0}
              max={100}
              className={inputBase}
              value={form.nilaiWawancara}
              onChange={(e) => setField('nilaiWawancara', e.target.value)}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${ORANGE}33`)}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
              placeholder="0-100"
            />
          </Field>
        </Section>

        {/* Section Foto */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FFF1E6', color: ORANGE }}
            >
              <Camera className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-gray-800">Foto (Opsional)</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
              {form.fotoBase64 ? (
                <img src={form.fotoBase64} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFoto}
                className="block w-full text-xs text-gray-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 file:cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1.5">Format JPG/PNG, maksimal 1MB.</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              setForm(initialState);
              setErrors({});
              toast('Form direset', { icon: '↺' });
            }}
            className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-orange-500/30 transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Kirim Pendaftaran
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
