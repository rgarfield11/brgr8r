# api/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import jwt
from .. import models, schemas, database
from api.auth_utils import get_current_user

import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

router = APIRouter()

# Configure password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load secret key securely, fallback to insecure default in dev
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


@router.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = pwd_context.hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwt.encode(
        {
            "sub": str(user.id),
            "exp": datetime.utcnow() + access_token_expires
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    print("Returning current user:", current_user.username)
    return current_user
