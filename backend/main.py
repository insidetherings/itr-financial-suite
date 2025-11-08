# backend/main.py

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend import models
from backend.database import engine, SessionLocal

# Create all database tables at startup
models.Base.metadata.create_all(bind=engine)

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

# ✅ Add a health check endpoint for the frontend
@app.get("/health")
def health_check():
    return {"message": "Inside the Rings Financial Suite backend is running"}

@app.get("/invoices")
def get_invoices(db: Session = Depends(get_db)):
    invoices = db.query(models.Invoice).all()
    return invoices
