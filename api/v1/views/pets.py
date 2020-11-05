#!/usr/bin/python3
""" objects that handle all default API actions for Pet """
from models.base_model import BaseModel, Base
from flask import jsonify, abort, request, make_response
from models.pet import Pet
from models import storage
from api.v1.views import app_views


@app_views.route('/pets/<pet_id>', methods=['GET'], strict_slashes=False)
@app_views.route('/pets', methods=['GET'], strict_slashes=False)
def allpets(pet_id=None):
    """ Retrieve one object or all objects of Pets """

    # return a list of all object pets
    if pet_id is None:
        list_pets = []
        for pet in storage.all(Pet).values():
            list_pets.append(pet.to_dict())
        return make_response(jsonify(list_pets))

    # return a pet with specific pet_id
    pet = storage.get(Pet, pet_id)
    if not pet:
        abort(404)
    return make_response(jsonify(pet.to_dict()), 200)


@app_views.route('/pets/<pet_id>', methods=['PUT'], strict_slashes=False)
def update_pet(pet_id=None):
    """ Update an atribute of pet """

    pet = storage.get(Pet, pet_id)
    if not pet:
        abort(404)

    data = request.get_json()
    if not data:
        abort(400, "Not a JSON")

    for key, value in data.items():
        setattr(pet, key, value)
    storage.save()

    return make_response(jsonify(pet.to_dict()), 200)


@app_views.route('/pets/<pet_id>',
                 methods=['DELETE'], strict_slashes=False)
def delete_pet(pet_id=None):
    """ delete a pet based on pet_id """

    pet = storage.get(Pet, pet_id)
    if not pet:
        abort(404)

    storage.delete(pet)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/pets/<pet_id>/collars', methods=['GET'], strict_slashes=False)
def collar_pet(pet_id):
    """Check if the pet already has a collar """

    pet = storage.get(Pet, pet_id)
    if not pet:
        abort(404)

    if len(pet.collars) >= 1:
        return (jsonify({"status": "EXIST"}), 200)
    return (jsonify({"status": "NO EXIST"}), 200)
