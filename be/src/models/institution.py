from ._base import _BASE
from sqlalchemy import Column, Integer, String


class institution(_BASE):
    __tablename__ = 'institution'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    number = Column(String)
    description = Column(String)
    coverage = Column(String)
    email = Column(String)
    website = Column(String)
    category = Column(String)
