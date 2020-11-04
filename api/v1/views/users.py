#!/usr/bin/python3
""" objects that handle all default API actions for User """
from models.user import User
from models.pet import Pet
from models.picture import Picture
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/users', methods=['GET'], strict_slashes=False)
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
def post_user():
    """
    Creates a new user
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
    user = User(**data)
    user.save()
    return make_response(jsonify(user.to_dict()), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates the information of a user
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    # Ignore are values that can't be updated
    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)


@app_views.route('/users/<user_id>/pets', methods=['GET'],
                 strict_slashes=False)
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
def post_pet(user_id):
    """
    Creates a new Pet
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

    # creating the instance Picture for this pet
    picture = Picture(pet_id=pet.id)
    picture.save()

    return make_response(jsonify(pet.to_dict()), 201)


@app_views.route('/users/<user_id>/collars', methods=['GET'],
                 strict_slashes=False)
def list_user_collars(user_id):
    """
    List all collars of the user based on user id
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    list_collars = []
    list_collars = [collar.to_dict() for collar in user.collars]
    return jsonify(list_collars)
