from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from backend.database import SessionLocal
from backend.models.invoices import Invoice

router = APIRouter(prefix="/invoices", tags=["Invoices"])

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE Invoice
@router.post("/")
def create_invoice(client_name: str, total: float, due_date: date, db: Session = Depends(get_db)):
    invoice = Invoice(client_name=client_name, total=total, due_date=due_date, status="UNPAID")
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice

# READ All Invoices
@router.get("/")
def get_invoices(db: Session = Depends(get_db)):
    return db.query(Invoice).all()

# READ Single Invoice
@router.get("/{invoice_id}")
def get_invoice(invoice_id: int, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

# UPDATE Invoice (mark as PAID or update info)
@router.put("/{invoice_id}")
def update_invoice(invoice_id: int, status: str = None, total: float = None, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    if status:
        invoice.status = status
    if total:
        invoice.total = total
    db.commit()
    db.refresh(invoice)
    return invoice

# DELETE Invoice
@router.delete("/{invoice_id}")
def delete_invoice(invoice_id: int, db: Session = Depends(get_db)):
    invoice = db.query(Invoice).filter(Invoice.id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    db.delete(invoice)
    db.commit()
    return {"message": f"Invoice {invoice_id} deleted successfully"}
