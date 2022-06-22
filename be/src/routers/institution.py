from fastapi import APIRouter
from fastapi import Request
from fastapi import status
from models.bookmark import bookmark
from models.institution import institution
from pydantic import BaseModel
#import json
#import db
from alephs import alephs


class pd_institution(BaseModel):
    name: str
    number: str
    description: str
    coverage: str
    email: str
    website: str
    category: str

    class Config:
        orm_mode = True


router_institution = APIRouter(
    prefix="/institutions",
    tags=["institutions"],
    #dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}}
        )

'''
@router_institution.get("/init")
async def init_db():
    f = open('data/institutions.json')
    insts = json.load(f)
    f.close()

    with db.create_session() as s:
        for i in insts:
            pi = institution(**i)
            s.add(pi)

        s.commit()
        s.close()
'''

class pd_bookmark(BaseModel):
    institution_id: int
    cookie: str

    class Config:
        orm_mode = True

@router_institution.post("/bookmark")
async def post_bookmark(bm: pd_bookmark, rq: Request):
    res = None

    try:
        with db.create_session() as s:
            pb = bookmark(**bm.dict())
            pb.cookie = rq.cookies.get('_ga')
            s.add(pb)
            s.commit()
            s.close()
            return status.HTTP_201_CREATED
    except Exception as e:
        print(e)
        return status.HTTP_500_INTERNAL_SERVER_ERROR

@router_institution.get("/search/{term}")
async def get_institutions(term: str, rq: Request):
    print('search')
    term = "%{}%".format(term)
    print(term)
    res = None
    with db.create_session() as s:
        print('created session')
        res = s.query(
                institution.id, institution.name,
                institution.description, institution.coverage,
                institution.email, institution.website,
                institution.number, institution.category
                ).filter(
                or_(
                    institution.name.ilike(term),
                    institution.number.ilike(term),
                    institution.description.ilike(term),
                    institution.category.ilike(term),
                    institution.email.ilike(term),
                    institution.coverage.ilike(term),
                    institution.website.ilike(term),
                ))
        s.close()

    if not res.count():
        return {'res': []}

    return {'res': res.all()}

@router_institution.get("/count")
async def get_count():
    print('get count')
    res = None
    with db.create_session() as s:
        print('created session')
        res = s.query(institution.id).count()
        s.close()
    return {'res': res}

@router_institution.get("/")
async def get_institutions():
    print('list all')
    res = None
    return {'institutions': alephs.get_institutes()}

@router_institution.get("/{id}")
async def get_institution(id: int , rq: Request):
    print(f'Institute: {id}')
    res = None
    with db.create_session() as s:
        print('created session')
        res = s.query(institution).\
        filter(institution.id == id)
        s.close()
    return {'res': res.all()}
