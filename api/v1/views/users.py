#!/usr/bin/python3
""" objects that handle all default RestFul API actions for User """
from models.user import User
from models.pet import Pet
from models.picture import Picture
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
# from flasgger.utils import swag_from


@app_views.route('/users', methods=['GET'], strict_slashes=False)
# @swag_from('documentation/user/all_users.yml')
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)


@app_views.route('/users/<user_id>', methods=['DELETE', 'GET'],
                 strict_slashes=False)
# @swag_from('documentation/user/delete_user.yml', methods=['DELETE'])
def delete_user(user_id):
    """
    Deletes a user Object
    """

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if request.method == "GET":
        return jsonify(user.to_dict())

    storage.delete(user)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'nickname' not in request.get_json():
        abort(400, description="Missing Nickname")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    instance = User(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
# @swag_from('documentation/user/put_user.yml', methods=['PUT'])
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:  # and key in valid:
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)


@app_views.route('/users/<user_id>/pets', methods=['GET'],
                 strict_slashes=False)
# @swag_from('documentation/-----.yml', methods=['GET'])
def user_all_pet(user_id):
    """
    List all pets of the user based on user id
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)
    list_pets = []
    list_pets = [pet.to_dict() for pet in user.pets]
    return jsonify(list_pets)


@app_views.route('/users/<user_id>/pets', methods=['POST'],
                 strict_slashes=False)
# @swag_from('documentation/place/post_place.yml', methods=['POST'])
def post_pet(user_id):
    """
    Creates a Pet
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()

    data["user_id"] = user_id
    pet = Pet(**data)
    pet.save()
    picture = Picture(pet_id=pet.id)
    picture.save()
    return make_response(jsonify(pet.to_dict()), 201)


@app_views.route('/users/<user_id>/collars', methods=['GET'],
                 strict_slashes=False)
# @swag_from('documentation/-----.yml', methods=['GET'])
def user_all_collars(user_id):
    """
    List all collars of the user based on user id
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)
    list_collars = []
    list_collars = [collar.to_dict() for collar in user.collars]
    return jsonify(list_collars)
