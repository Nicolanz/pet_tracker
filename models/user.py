#!/usr/bin/python3
""" class user """
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """ User class representation as a table """
    __tablename__ = 'users'
    email = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    documento = Column(Integer, nullable=True, default=0)
    Phone = Column(String(128), nullable=True)
    address = Column(String(128), nullable=True)
    nickname = Column(String(128), nullable=False)
    auth_id = Column(String(128), nullable=True)
    collars = relationship("Collar", backref="user")
    pets = relationship("Pet", backref="user")
    password = Column(String(128), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes user class"""
        super().__init__(*args, **kwargs)
