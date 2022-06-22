from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#import db

from routers import *

main = FastAPI()

origins = [
        "http://127.0.0.1",
    "http://127.0.0.1:5000",
    "http://localhost",
    "http://localhost:5000",
]

main.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],#origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

main.include_router(router_institution)
