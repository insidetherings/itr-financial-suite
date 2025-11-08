from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255))
    amount = Column(Numeric(12, 2))
    date = Column(Date)
    account_id = Column(Integer, ForeignKey("accounts.id"))

    account = relationship("Account", back_populates="transactions")

# back-populate in Account
from backend.models.accounts import Account
Account.transactions = relationship("Transaction", back_populates="account")
