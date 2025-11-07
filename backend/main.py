from backend import models
from backend.database import engine, SessionLocal
from . import models
from .database import engine, SessionLocal

# Create all database tables at startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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

@app.get("/invoices")
def get_invoices(db: Session = Depends(get_db)):
    invoices = db.query(models.Invoice).all()
    return invoices