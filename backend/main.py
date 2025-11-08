# backend/main.py

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from backend.database import engine, SessionLocal, Base
from backend.models import accounts, invoices, transactions
from backend.models.accounts import Account
from backend.models.invoices import Invoice
from backend.models.transactions import Transaction
from backend.routes import invoices as invoice_routes

app = FastAPI()

# --- TEMP FIX: Drop old invoices table if exists ---
# This ensures the due_date column gets added correctly.
with engine.connect() as conn:
    conn.execute(text("DROP TABLE IF EXISTS invoices CASCADE;"))
    conn.commit()

# --- Create all database tables ---
Base.metadata.create_all(bind=engine)

# --- CORS Middleware ---
origins = [
    "https://itr-financial-frontend.onrender.com",  # Your Render frontend
    "http://localhost:5173"  # Local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------------------------------------------

# --- Dependency: provide DB session per request ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# ---------------------------------------------------


# --- Base Routes ---
@app.get("/")
def read_root():
    return {"message": "Inside the Rings Financial Suite backend is running"}

@app.get("/health")
def health_check():
    return {"message": "Inside the Rings Financial Suite backend is running"}

# ---------------------------------------------------


# --- Verification Routes (Phase 1) ---
@app.get("/accounts")
def get_accounts(db: Session = Depends(get_db)):
    return db.query(Account).all()

@app.get("/transactions")
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).all()
# ---------------------------------------------------


# --- Include Invoice Router (Phase 2) ---
app.include_router(invoice_routes.router)
# ---------------------------------------------------


# --- Route Inspector (for debugging) ---
@app.get("/routes")
def list_routes():
    from fastapi.routing import APIRoute
    routes = []
    for route in app.router.routes:
        routes.append({
            "path": route.path,
            "methods": list(route.methods)
        })
    return routes
# ---------------------------------------------------
