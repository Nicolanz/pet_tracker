#!/usr/bin/python3
""" Pets restful api """
from models.base_model import BaseModel, Base
from flask import jsonify, abort, request, make_response
from models.collar import Collar
from models.user import User
from models.pet import Pet
from models import storage
from api.v1.views import app_views


@app_views.route('/collars', methods=['GET'], strict_slashes=False)
@app_views.route('/collars/<collar_id>', methods=['GET'], strict_slashes=False)
def allcollars(collar_id=None):
    """ Retrieve one object or all objects of Pets """
    if collar_id is None:
        lista = []
        for v in storage.all(Collar).values():
            lista.append(v.to_dict())
        return (jsonify(lista))
    else:
        flag = 0
        for v in storage.all(Collar).values():
            if v.numero_ref == collar_id:
                flag = 1
        if flag == 0:
            return (jsonify({"status": "NO EXIST"}), 200)
        else:
            return (jsonify({"status": "EXIST"}))


@ app_views.route('/collars/<collar_id>', methods=['PUT'], strict_slashes=False)
def change_collar(collar_id=None):
    """ change an class atribute """
    lista = [""]
    if not request.json:
        abort(400, "Not a JSON")
    if "user_id" in request.json:
        abort(400, "Change user_id of the collar is not allowed, \
              delete the collar and create a new user with the collar id")
    result = request.get_json()
    for security in result.keys():
        if security is not "pet_id":
            abort(400, "agumento {} no apropiado".format(security))

    flag = 0
    for values in storage.all(Collar).values():
        if values.id == collar_id:
            for user in storage.all(User).values():
                if user.id == values.user_id:
                    for pets in user.pets:
                        if result["pet_id"] == pets.id:
                            for k, v in result.items():
                                setattr(values, k, v)
                                storage.save()
                                attr = (values.to_dict())
                            flag = 1
    if flag == 0:
        abort(404)
    else:
        return (jsonify(attr), 200)


@ app_views.route('/collars/<collar_id>',
                  methods=['DELETE'], strict_slashes=False)
def delete_collar(collar_id):
    """
    Deletes a Collar Object
    """
    if collar_id is None:
        abort(404)
    dicti = {}
    flag = 0
    for v in storage.all(Collar).values():
        if v.numero_ref == collar_id:
            storage.delete(v)
            storage.save()
            flag = 1
    if flag == 0:
        abort(404)
    else:
        return (jsonify(dicti), 200)


@ app_views.route('/collars',
                  methods=['POST'], strict_slashes=False)
def create_collars():
    """ Post and create object """
    if not request.json:
        abort(400, "Not a JSON")
    if 'user_id' not in request.json:
        abort(400, "Missing user_id")
    result = request.get_json()
    lista = ["user_id", "pet_id", "numero_ref"]
    for security in result.keys():
        if security not in lista:
            abort(400, "agumento {} no apropiado".format(security))
    obj = Collar()

    for user in storage.all(User).values():
        if result["user_id"] == user.id:
            if 'pet_id' in request.json:
                flag = 0
                for pet in user.pets:
                    if result["pet_id"] == pet.id:
                        flag = 1
                        for k, values in result.items():
                            setattr(obj, k, values)
                if flag == 0:
                    abort(400, "Pet_id no esta asociada \
                            a ninguna pet del usuario")
            else:
                for k, values in result.items():
                    setattr(obj, k, values)
    storage.new(obj)
    storage.save()
    var = obj.to_dict()

    return (jsonify(var), 201)
