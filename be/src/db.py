from models._base import _BASE
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine('postgresql://crpk:crpk@/crpk')
_BASE.metadata.create_all(engine)

def create_session():
    Session = sessionmaker(bind=engine)
    return Session()
