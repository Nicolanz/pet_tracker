#!/usr/bin/python3
"""
Contains the class DBStorage
"""

from models.base_model import BaseModel
from models.collar import Collar
from models.pet import Pet
from models.user import User
from os import getenv

classes = {"User": User, "Pet": Pet, "Collar": Collar}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        POSTGREP_USER = getenv('HBNB_MYSQL_USER')
        POSTGREP_PWD = getenv('HBNB_MYSQL_PWD')
        POSTGREP_HOST = getenv('HBNB_MYSQL_HOST')
        POSTGREP_DB = getenv('HBNB_MYSQL_DB')
        POSTGREP_ENV = getenv('HBNB_ENV')
