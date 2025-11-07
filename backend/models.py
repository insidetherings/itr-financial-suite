# backend/models.py
from sqlalchemy import Column, Integer, String, Numeric, Date
from datetime import date
from .database import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_name = Column(String(255))
    total = Column(Numeric)
    status = Column(String(20))
    issue_date = Column(Date, default=date.today)