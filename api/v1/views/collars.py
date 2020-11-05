#!/usr/bin/python3
""" objects that handle all default API actions for Collars """
from models.base_model import BaseModel, Base
from flask import jsonify, abort, request, make_response
from models.collar import Collar
from models.user import User
from models.pet import Pet
from models import storage
from api.v1.views import app_views


@app_views.route('/collars', methods=['GET'], strict_slashes=False)
@app_views.route('/collars/<collar_id>', methods=['GET'], strict_slashes=False)
def all_collars(collar_id=None):
    """ Retrieve one object or Status if Exist or not Exist the Collar """

    if collar_id is None:
        list_collars = []
        for collar in storage.all(Collar).values():
            list_collars.append(collar.to_dict())
        return make_response(jsonify(list_collars))

    for collar in storage.all(Collar).values():
        if collar.numero_ref == collar_id:
            return make_response(jsonify({"status": "EXIST"}))
    return make_response(jsonify({"status": "NO EXIST"}), 200)


@ app_views.route('/collars/<collar_id>', methods=['PUT'], strict_slashes=False)
def change_collar(collar_id=None):
    """ Update a collar base on its collar_id """

    if not request.json:
        abort(400, "Not a JSON")

    if "user_id" in request.json:
        abort(400, "Change user_id of the collar is not allowed, \
              delete the collar and create a new user with the collar id")

    # The data must contain the pet_id
    data = request.get_json()
    if "pet_id" not in data.keys():
        abort(400, "agumento {} no apropiado".format(security))
    pet_id = data["pet_id"]

    list_pets_id = []

    for collar in storage.all(Collar).values():
        if collar_id == collar.numero_ref:
            new_collar = storage.get(Collar, collar.id)
            if not new_collar:
                abort(404)

            user = storage.get(User, new_collar.user_id)
            if not user:
                abort(404)

            list_pets_id = [pet.id for pet in user.pets]
            break

    if pet_id not in list_pets_id:
        abort(404)

    for key, value in data.items():
        setattr(collar, key, value)
    storage.save()
    return make_response(jsonify(collar.to_dict()), 200)


@ app_views.route('/collars/<collar_id>',
                  methods=['DELETE'], strict_slashes=False)
def delete_collar(collar_id):
    """
    Deletes a Collar Object base on its collar_id
    """
    if collar_id is None:
        abort(404)

    collar_deleted = False

    for collar in storage.all(Collar).values():
        if collar.numero_ref == collar_id:
            storage.delete(collar)
            storage.save()
            collar_deleted = True
            return make_response(jsonify({}), 200)

    if collar_deleted is False:
        abort(404)


@ app_views.route('/collars',
                  methods=['POST'], strict_slashes=False)
def create_collars():
    """ Create a new object Collar """

    data = request.get_json()
    if not data:
        abort(400, "Not a JSON")

    lista = ["user_id", "pet_id", "numero_ref"]

    for key in data.keys():
        if key not in lista:
            abort(400, "agumento {} no apropiado".format(key))

    user = storage.get(User, data["user_id"])
    if not user:
        abort(404)

    list_pets_id = [pet.id for pet in user.pets]

    if data["pet_id"] not in list_pets_id:
        abort(400, "Pet_id no esta asociada \
                            a ninguna pet del usuario")

    collar = Collar(**data)
    collar.save()
    return make_response(jsonify(collar.to_dict()), 200)
