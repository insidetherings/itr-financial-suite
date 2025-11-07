# Inside the Rings Financial Suite

The Inside the Rings Financial Suite is a custom-built bookkeeping and reporting system designed to manage multiple accounts, generate Profit & Loss statements, Cash Flow, and Balance Sheets, and export branded PDF reports with automatic monthly scheduling.

## 🚀 Features
- Track multiple financial accounts
- Auto-generate P&L, Cash Flow, and Balance Sheet reports
- Create branded invoices (PAID/UNPAID)
- Automatic monthly PDF exports
- Admin dashboard with performance insights
- Bank integration via Plaid (optional)
- Built using FastAPI (backend) and React (frontend)

## 🧩 Technology Stack
- **Backend:** FastAPI (Python)
- **Frontend:** React + Vite
- **Database:** PostgreSQL (via SQLAlchemy)
- **Reports:** FPDF + APScheduler for automation
- **Hosting:** Render Cloud Platform

## 🧠 Folder Structure
```
itr-financial-suite/
├── backend/
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        └── App.jsx
```

## 🧭 Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/itr-financial-suite.git
   cd itr-financial-suite
   ```

2. Install dependencies:
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt

   # Frontend
   cd ../frontend
   npm install
   ```

3. Run locally:
   - Backend: `uvicorn main:app --reload`
   - Frontend: `npm run dev`

## 🌐 Deployment
This project is configured for **Render.com**:
- Backend → Web Service (FastAPI)
- Frontend → Static Site (React build)
- Database → PostgreSQL instance

## 🏁 Author
**Jon Hawkins**  
Inside the Rings | [InsideTheRings.com](#)  
A financial and operational system built to prepare for the Olympic Moment.
