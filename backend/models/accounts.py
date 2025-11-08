from sqlalchemy import Column, Integer, String, Numeric
from backend.database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)  # Asset, Liability, Income, Expense
    balance = Column(Numeric(12, 2), default=0)