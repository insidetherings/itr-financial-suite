# backend/main.py

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend.database import engine, SessionLocal, Base

# ✅ Import your models explicitly (so Base knows about them)
from backend.models.accounts import Account
from backend.models.invoices import Invoice
from backend.models.transactions import Transaction

# ✅ Create all database tables at startup
Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS Middleware ---
origins = [
    "https://itr-financial-frontend.onrender.com",  # Your Render frontend
    "http://localhost:5173"  # For local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------

# Dependency: provide a DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Inside the Rings Financial Suite backend is running"}


# ✅ Health check endpoint for frontend connectivity
@app.get("/health")
def health_check():
    return {"message": "Inside the Rings Financial Suite backend is running"}


# ✅ Get all invoices
@app.get("/invoices")
def get_invoices(db: Session = Depends(get_db)):
    invoices = db.query(Invoice).all()
    return invoices


# ✅ Get all accounts (for Phase 1 verification)
@app.get("/accounts")
def get_accounts(db: Session = Depends(get_db)):
    accounts = db.query(Account).all()
    return accounts


# ✅ Get all transactions (for Phase 1 verification)
@app.get("/transactions")
def get_transactions(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).all()
    return transactions
