from pydantic import BaseModel

class RatingBase(BaseModel):
    restaurant: str
    rating: int
    notes: str = ""

class RatingCreate(RatingBase):
    pass

class RatingOut(RatingBase):
    id: int

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True
