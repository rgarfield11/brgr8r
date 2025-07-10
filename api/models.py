from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from api.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    ratings = relationship("Rating", back_populates="user")

class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    restaurant = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    notes = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="ratings")
