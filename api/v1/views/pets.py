#!/usr/bin/python3
""" Pets restful api """
from models.base_model import BaseModel, Base
from flask import jsonify, abort, request
from models.pet import Pet
from models import storage
from api.v1.views import app_views


@app_views.route('/pets/<pet_id>', methods=['GET'], strict_slashes=False)
@app_views.route('/pets', methods=['GET'], strict_slashes=False)
def allpets(pet_id=None):
    """ Retrieve one object or all objects of Pets """
    if pet_id is None:
        lista = []
        for v in storage.all(Pet).values():
            lista.append(v.to_dict())
        return (jsonify(lista))
    else:
        flag = 0
        for v in storage.all(Pet).values():
            if v.id == pet_id:
                attr = (v.to_dict())
                flag = 1
        if flag == 0:
            abort(404)
        else:
            return (jsonify(attr))


@app_views.route('/pets/<pet_id>', methods=['PUT'], strict_slashes=False)
def change_pet(pet_id=None):
    """ change a atribute of pet """
    if not request.json:
        abort(400, "Not a JSON")

    result = request.get_json()
    flag = 0
    for values in storage.all(Pet).values():
        if values.id == pet_id:
            for k, v in result.items():
                setattr(values, k, v)
                storage.save()
                attr = (values.to_dict())
            flag = 1
    if flag == 0:
        abort(404)
    else:
        return (jsonify(attr), 200)


@app_views.route('/pets/<pet_id>',
                 methods=['DELETE'], strict_slashes=False)
def delete_pet(pet_id=None):
    """ delete a pet """
    if pet_id is None:
        abort(404)
    dicti = {}
    flag = 0
    for v in storage.all(Pet).values():
        if v.id == pet_id:
            storage.delete(v)
            storage.save()
            flag = 1
    if flag == 0:
        abort(404)
    else:
        return (jsonify(dicti), 200)


@app_views.route('/pets/<pet_id>/collars', methods=['GET'], strict_slashes=False)
def collar_pet(pet_id):
    """Check if the pet already has a collar """
    pet = storage.get(Pet, pet_id)

    if not pet:
        abort(404)
    if len(pet.collars) >= 1:
        return (jsonify({"status": "EXIST"}), 200)
    return (jsonify({"status": "NO EXIST"}), 200)
