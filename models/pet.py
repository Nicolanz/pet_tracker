#!/usr/bin/python3
""" class collar """
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship


class Pet(BaseModel, Base):
    """ pet class """
    __tablename__ = 'pets'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    name = Column(String(128), nullable=False)
    spice = Column(String(128), nullable=True)
    race = Column(String(128), nullable=True)
    sex = Column(String(128), nullable=True)
    color = Column(String(128), nullable=True)
    spice = Column(String(128), nullable=True)
    birthday = Column(DateTime, nullable=True)
    description = Column(String(1024), nullable=True)
    collars = relationship("Collar",
                           backref="pet",
                           cascade="all, delete, delete-orphan")


def __init__(self, *args, **kwargs):
    """initializes user"""
    super().__init__(*args, **kwargs)
