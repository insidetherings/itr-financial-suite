import os
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import create_engine, text
from apscheduler.schedulers.background import BackgroundScheduler
from fpdf import FPDF

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./itr_local.db")
engine = create_engine(DATABASE_URL, future=True)
app = FastAPI()
scheduler = BackgroundScheduler()

with engine.begin() as conn:
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_name VARCHAR(255),
            total NUMERIC,
            status VARCHAR(20),
            issue_date DATE DEFAULT CURRENT_DATE
        );
    """))
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename VARCHAR(255),
            file_path VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            size_kb INTEGER,
            period_start DATE,
            period_end DATE
        );
    """))

def generate_summary_pdf(path: str):
    with engine.begin() as conn:
        summary = conn.execute(text("""
            SELECT
              COALESCE(SUM(CASE WHEN status='PAID' THEN total ELSE 0 END),0) AS paid,
              COALESCE(SUM(CASE WHEN status='UNPAID' THEN total ELSE 0 END),0) AS unpaid,
              COALESCE(SUM(total),0) AS total
            FROM invoices
        """)).mappings().first()

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, "Inside the Rings Financial Suite", ln=True)
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 10, f"Monthly Summary Report — {datetime.now():%B %Y}", ln=True)
    pdf.ln(8)
    pdf.cell(0, 8, f"Total Paid: ${summary['paid']:,}", ln=True)
    pdf.cell(0, 8, f"Outstanding: ${summary['unpaid']:,}", ln=True)
    pdf.cell(0, 8, f"All Invoices: ${summary['total']:,}", ln=True)
    pdf.output(path)

def monthly_job():
    now = datetime.now()
    os.makedirs("reports", exist_ok=True)
    filename = f"ITR_Summary_{now:%Y_%m}.pdf"
    path = os.path.join("reports", filename)
    generate_summary_pdf(path)
    size_kb = os.path.getsize(path) // 1024
    with engine.begin() as conn:
        conn.execute(text("""
            INSERT INTO reports (filename, file_path, size_kb, period_start, period_end)
            VALUES (:f, :p, :s, :st, :en)
        """), {
            "f": filename,
            "p": path,
            "s": size_kb,
            "st": now.replace(day=1).date(),
            "en": now.date()
        })
    print(f"[Scheduler] Saved {filename}")

@app.on_event("startup")
def start_scheduler():
    scheduler.add_job(monthly_job, "cron", day=1, hour=0, minute=0)
    scheduler.start()

@app.get("/api/reports")
def list_reports():
    with engine.begin() as conn:
        rows = conn.execute(text("SELECT * FROM reports ORDER BY created_at DESC")).mappings().all()
    return [dict(r) for r in rows]

@app.get("/api/reports/{report_id}/download")
def download_report(report_id: int):
    with engine.begin() as conn:
        r = conn.execute(text("SELECT * FROM reports WHERE id=:id"), {"id": report_id}).mappings().first()
    if not r:
        raise HTTPException(status_code=404, detail="Report not found")
    return FileResponse(r["file_path"], filename=r["filename"], media_type="application/pdf")
