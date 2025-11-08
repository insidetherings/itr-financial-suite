# backend/routes/accounts.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.accounts import Account

router = APIRouter(prefix="/accounts", tags=["Accounts"])

# --- Dependency: database session ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# -----------------------------------


# ✅ CREATE Account
@router.post("/")
def create_account(name: str, type: str, balance: float = 0.0, db: Session = Depends(get_db)):
    """
    Create a new account.
    Example types: 'Asset', 'Liability', 'Income', 'Expense'
    """
    existing = db.query(Account).filter(Account.name == name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Account already exists")
    account = Account(name=name, type=type, balance=balance)
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


# ✅ READ All Accounts
@router.get("/")
def get_accounts(db: Session = Depends(get_db)):
    return db.query(Account).all()


# ✅ READ Single Account
@router.get("/{account_id}")
def get_account(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account


# ✅ UPDATE Account
@router.put("/{account_id}")
def update_account(account_id: int, name: str = None, balance: float = None, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    if name:
        account.name = name
    if balance is not None:
        account.balance = balance

    db.commit()
    db.refresh(account)
    return account


# ✅ DELETE Account
@router.delete("/{account_id}")
def delete_account(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    db.delete(account)
    db.commit()
    return {"message": f"Account {account_id} deleted successfully"}
