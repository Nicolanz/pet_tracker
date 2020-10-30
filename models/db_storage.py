#!/usr/bin/python3
"""
Contains the class DBStorage
"""
import models
from models.base_model import BaseModel, Base
from models.collar import Collar
from models.pet import Pet
from models.user import User
from models.picture import Picture
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"User": User, "Pet": Pet,
           "Collar": Collar, "Picture": Picture}


class DBStorage:
    """interaacts with the SQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        POSTGREP_USER = getenv('POSTGREP_USER')
        POSTGREP_PWD = getenv('POSTGREP_PWD')
        POSTGREP_HOST = getenv('POSTGREP_HOST')
        POSTGREP_DB = getenv('POSTGREP_DB')
        self.__engine = create_engine("postgresql://{}:{}@{}/{}".format(
            POSTGREP_USER, POSTGREP_PWD, POSTGREP_HOST, POSTGREP_DB))

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """ Get a object using class name and id """
        for class_obj in self.all(cls).values():
            if id == class_obj.id:
                return class_obj
        return None

    def count(self, cls=None):
        """ Counts the number of objects per class """
        return len(self.all(cls))
