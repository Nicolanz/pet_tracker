#!/usr/bin/python3
""" class collar """
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey


class Collar(BaseModel, Base):
    __tablename__ = 'collars'
    pet_id = Column(String(60), ForeignKey('pets.id'), nullable=True)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    numero_ref = Column(String(128), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Collar"""
        super().__init__(*args, **kwargs)
