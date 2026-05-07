import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, RotateCcw, ArrowRight, Home } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const nama = state?.nama || 'Calon Siswa';
  const id = state?.id;

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-10 text-center">
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FFB266 100%)' }}
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Pendaftaran Berhasil!
        </h1>
        <p className="text-gray-600 mb-1">
          Terima kasih, <span className="font-semibold text-gray-800">{nama}</span>.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Data Anda telah masuk ke sistem dan akan segera ditinjau oleh tim Admin.
        </p>

        {id && (
          <div className="inline-block bg-orange-50 border border-orange-100 rounded-xl px-4 py-2 mb-6">
            <p className="text-[11px] uppercase tracking-wider text-orange-700 font-semibold">
              ID Pendaftaran
            </p>
            <p className="font-mono text-sm text-gray-800">{id}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Status Anda
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-gray-800">Pending Review</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Tim Admin akan menghubungi Anda melalui email/WhatsApp setelah verifikasi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/siswa')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-orange-200 text-orange-700 bg-white hover:bg-orange-50 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Daftar Lain
          </button>
          <Link
            to="/sales"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-orange-500/30 transition-all"
            style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A33 100%)' }}
          >
            Lihat Status di Sales <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
          >
            <Home className="w-3.5 h-3.5" /> Kembali ke pemilihan role
          </Link>
        </div>
      </div>
    </div>
  );
}
