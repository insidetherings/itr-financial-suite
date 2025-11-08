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
from backend.routes import accounts as account_routes

app = FastAPI()

# --- Create all database tables ---
Base.metadata.create_all(bind=engine)

# --- CORS Middleware ---
origins = [
    "https://itr-financial-frontend.onrender.com",
    "http://localhost:5173"
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


# --- Include Routers ---
app.include_router(invoice_routes.router)
app.include_router(account_routes.router)
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
