#!/usr/bin/python3
""" class user """
import models
from models.base_model import BaseModel


class User(BaseModel, Base):
    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

        email = ""
        password = ""
        first_name = ""
        last_name = ""
