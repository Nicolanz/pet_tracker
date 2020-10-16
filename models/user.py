#!/usr/bin/python3
""" class user """
import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    __tablename__ = 'users'
    email = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    documento = Column(Integer, nullable=True)
    phone = Column(String(128), nullable=True)
    address = Column(String(128), nullable=True)
    nickname = Column(String(128), nullable=False)
    auth_id = Column(String(128), nullable=True)
    collars = relationship("Collar", backref="user")
    pets = relationship("Pet", backref="user")
    # Creating a new Auth id for communication with Auth0
    auth_id = Column(String(128), nullable=True)
    # we don't need a password, Auth is dealing with it
    #password = Column(String(128), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
