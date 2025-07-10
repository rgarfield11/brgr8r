from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from api.auth_utils import get_current_user

router = APIRouter()

@router.post("/ratings", response_model=schemas.RatingOut)
def create_rating(rating: schemas.RatingCreate, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    db_rating = models.Rating(**rating.dict(), user_id=user.id)
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)
    return db_rating

@router.get("/ratings", response_model=list[schemas.RatingOut])
def get_ratings(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    return db.query(models.Rating).filter(models.Rating.user_id == user.id).all()
