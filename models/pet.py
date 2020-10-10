#!/usr/bin/python3
""" class collar """
import models
from models.base_model import BaseModel


class Pet(BaseModel, Base):
    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
