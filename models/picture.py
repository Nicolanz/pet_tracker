#!/usr/bin/python3
""" class picture """
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship


class Picture(BaseModel, Base):
    """ Picture class representation as a table """
    __tablename__ = 'pictures'
    name = Column(String(128), nullable=True)
    data = Column(LargeBinary, nullable=True)
    pet_id = Column(String(60), ForeignKey('pets.id'), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes picture class"""
        super().__init__(*args, **kwargs)
