import os

BASE_DIR = os.path.join("src", "pages")

pages = {
    # Dashboard sub-pages
    "dashboard": {
        "RingkasanOperasional.jsx": "Ringkasan Operasional",
        "RingkasanAkademik.jsx": "Ringkasan Akademik",
        "RingkasanKeuangan.jsx": "Ringkasan Keuangan",
        "UpcomingKeberangkatan.jsx": "Upcoming Keberangkatan",
        "TaskApproval.jsx": "Task & Approval Pending",
        "AlertReminder.jsx": "Alert & Reminder",
    },

    # System & Security
    "system": {
        "UserManagement.jsx": "User Management",
        "RoleManagement.jsx": "Role Management",
        "PermissionManagement.jsx": "Permission Management",
        "ApprovalMatrix.jsx": "Approval Matrix",
        "AccessControl.jsx": "Access Control",
        "ActivityLog.jsx": "Activity Log",
    },

    # Master Data
    "master": {
        "Cabang.jsx": "Cabang",
        "CostCenter.jsx": "Cost Center",
        "ChartOfAccounts.jsx": "Chart of Accounts (COA)",
        "FiscalPeriod.jsx": "Fiscal Period",
        "Program.jsx": "Program",
        "BatchAngkatan.jsx": "Batch / Angkatan",
        "Instruktur.jsx": "Instruktur",
        "SkillSertifikasi.jsx": "Skill & Sertifikasi",
        "PartnerJepang.jsx": "Partner Jepang",
        "PerusahaanJepang.jsx": "Perusahaan Jepang",
        "LokasiJepang.jsx": "Lokasi Jepang",
        "JenisDokumen.jsx": "Jenis Dokumen",
        "PaketBiaya.jsx": "Paket & Biaya",
    },

    # Operasional Siswa - Manajemen Siswa
    "operasional/siswa": {
        "ProfilSiswa.jsx": "Profil Siswa",
        "StatusJourney.jsx": "Status Journey",
        "DokumenSiswa.jsx": "Dokumen Siswa",
        "CatatanIssue.jsx": "Catatan & Issue",
    },

    # Operasional Siswa - Training Progress
    "operasional/training": {
        "Absensi.jsx": "Absensi",
        "Penilaian.jsx": "Penilaian",
        "Evaluasi.jsx": "Evaluasi",
    },

    # Operasional Siswa - Keberangkatan
    "operasional/keberangkatan": {
        "JadwalKeberangkatan.jsx": "Jadwal Keberangkatan",
        "ChecklistPraBerangkat.jsx": "Checklist Pra-Berangkat",
        "DetailPenerbangan.jsx": "Detail Penerbangan",
        "DokumenFinal.jsx": "Dokumen Final",
        "StatusKeberangkatan.jsx": "Status Keberangkatan",
        "KonfirmasiBerangkat.jsx": "Konfirmasi Berangkat",
    },

    # Recruitment & Matching Jepang
    "recruitment": {
        "PoolKandidat.jsx": "Pool Kandidat",
        "JadwalInterview.jsx": "Jadwal Interview",
        "HasilInterview.jsx": "Hasil Interview",
        "ApprovalKandidat.jsx": "Approval Kandidat",
        "PlacementJepang.jsx": "Placement ke Perusahaan Jepang",
        "StatusPlacement.jsx": "Status Placement",
    },

    # Dokumen & Legal
    "dokumen": {
        "DokumenLegal.jsx": "Dokumen Legal",
        "ApprovalDokumen.jsx": "Approval Dokumen",
        "KontrakSiswa.jsx": "Kontrak Siswa",
        "KontrakPerusahaan.jsx": "Kontrak Perusahaan Jepang",
        "VersiHistori.jsx": "Versi & Histori Dokumen",
        "ReminderExpired.jsx": "Reminder Expired",
    },

    # Monitoring Jepang
    "monitoring": {
        "StatusKerjaSiswa.jsx": "Status Kerja Siswa",
        "CheckinBerkala.jsx": "Check-in Berkala",
        "EvaluasiPerusahaan.jsx": "Evaluasi Perusahaan",
        "IncidentReport.jsx": "Incident Report",
        "DataKepulangan.jsx": "Data Kepulangan",
    },

    # Budgeting & Control
    "budgeting": {
        "BudgetPeriod.jsx": "Budget Period",
        "BudgetPlanning.jsx": "Budget Planning",
        "BudgetAllocation.jsx": "Budget Allocation",
        "BudgetApproval.jsx": "Budget Approval",
        "BudgetRevision.jsx": "Budget Revision",
        "BudgetMonitoring.jsx": "Budget Monitoring",
        "BudgetLock.jsx": "Budget Lock",
    },

    # Finance (Cashflow)
    "finance": {
        "BillingInvoice.jsx": "Billing & Invoice",
        "VirtualAccount.jsx": "Virtual Account",
        "PaymentMonitoring.jsx": "Payment Monitoring",
        "RequestDisbursement.jsx": "Request Disbursement",
        "ApprovalDisbursement.jsx": "Approval Disbursement",
        "CashIn.jsx": "Cash In",
        "CashOut.jsx": "Cash Out",
    },

    # Accounting
    "accounting": {
        "AutoJournal.jsx": "Auto Journal",
        "ManualJournal.jsx": "Manual Journal",
        "JournalApproval.jsx": "Journal Approval",
        "GeneralLedger.jsx": "General Ledger",
        "TrialBalance.jsx": "Trial Balance",
        "ProfitLoss.jsx": "Profit & Loss",
        "BalanceSheet.jsx": "Balance Sheet",
    },

    # Reporting & Analytics
    "reporting": {
        "ReportOperasional.jsx": "Report Operasional",
        "ReportAkademik.jsx": "Report Akademik",
        "ReportPlacement.jsx": "Report Placement Jepang",
        "ReportBudget.jsx": "Report Budget vs Actual",
        "ReportCashflow.jsx": "Report Cashflow",
        "ReportKeuangan.jsx": "Report Keuangan",
        "ExportData.jsx": "Export PDF / Excel",
    },

    # Integration & Settings
    "settings": {
        "PaymentGateway.jsx": "Payment Gateway",
        "EmailGateway.jsx": "Email Gateway",
        "TelegramGateway.jsx": "Telegram Gateway",
        "TemplateDokumen.jsx": "Template Dokumen",
        "SLAReminder.jsx": "SLA & Reminder",
        "BackupRestore.jsx": "Backup & Restore",
        "CompliancePolicy.jsx": "Compliance & Policy",
    },
}

TEMPLATE = """import React from 'react';

export default function {component}() {{
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500">Halaman {title}</p>
    </div>
  );
}}
"""

def to_component_name(filename):
    return filename.replace(".jsx", "")

def create_file(path, component, title):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path):
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(TEMPLATE.format(component=component, title=title))
    print(f"  ✅ {path}")

def main():
    os.makedirs(BASE_DIR, exist_ok=True)

    # Main Dashboard page
    dashboard_path = os.path.join(BASE_DIR, "Dashboard.jsx")
    if not os.path.exists(dashboard_path):
        create_file(dashboard_path, "Dashboard", "Dashboard")

    for folder, files in pages.items():
        folder_path = os.path.join(BASE_DIR, folder)
        os.makedirs(folder_path, exist_ok=True)

        for filename, title in files.items():
            component = to_component_name(filename)
            file_path = os.path.join(folder_path, filename)
            create_file(file_path, component, title)

    print("\n✅ Semua halaman berhasil digenerate!")

if __name__ == "__main__":
    main()