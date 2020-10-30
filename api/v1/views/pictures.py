#!/usr/bin/python3
""" objects that handle all default RestFul API actions for User """
from models.user import User
from models.pet import Pet
from models.picture import Picture
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request, send_file
from io import BytesIO
# from flasgger.utils import swag_from


@app_views.route('/pictures/<pet_id>', methods=['POST'], strict_slashes=False)
def upload_pet_pictures(pet_id):
    """
    Upload the picture of pets
    """

    data = request.get_data()
    # print("Response ==> ", data)
    picture = Picture(data=data, pet_id=pet_id, name='photo_' + pet_id)
    picture.save()
    return make_response(jsonify({"status": "OK"}), 201)


@app_views.route('/pictures/<pet_id>', methods=['PUT'], strict_slashes=False)
def put_pet_pictures(pet_id):
    """
    Upload the picture of pets
    """

    data = request.get_data()
    # print("Response ==> ", data)
    pictures = storage.all(Picture)
    for picture in pictures.values():
        if picture.pet_id == pet_id:
            picture.data = data
            picture.save()
    return make_response(jsonify({"status": "OK"}), 201)


@app_views.route('/pictures/<pet_id>', methods=['GET'], strict_slashes=False)
def A_list_pictures(pet_id):
    """
    Retrieves the list of all picture objects
    """
    all_pictures = storage.all(Picture).values()

    for picture in all_pictures:
        if picture.pet_id == pet_id and picture.data:
            return (picture.data)
    return jsonify({"status": "Not found"})
