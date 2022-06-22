from ._base import _BASE
from sqlalchemy import Column, Integer, String


class bookmark(_BASE):
    __tablename__ = 'bookmark'

    id = Column(Integer, primary_key=True)
    institution_id = Column(Integer)
    cookie = Column(String)
