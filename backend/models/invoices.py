from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(255), nullable=False)
    total = Column(Numeric(12, 2), nullable=False)
    status = Column(String(20), default="UNPAID")  # or PAID
    issue_date = Column(Date)
    due_date = Column(Date)

    account_id = Column(Integer, ForeignKey("accounts.id"))
    account = relationship("Account", back_populates="invoices")

# back-populate the relationship in Account
from backend.models.accounts import Account
Account.invoices = relationship("Invoice", back_populates="account")
