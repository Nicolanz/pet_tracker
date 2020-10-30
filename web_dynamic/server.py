"""Python Flask WebApp Auth0 integration example
"""
from functools import wraps
import json
from os import environ as env
from werkzeug.exceptions import HTTPException

from dotenv import load_dotenv, find_dotenv
from flask import Flask
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import session
from flask import request
from flask import url_for
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode
from models import storage
from models.user import User
from models.pet import Pet
import uuid

import constants


ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

AUTH0_CALLBACK_URL = env.get(constants.AUTH0_CALLBACK_URL)
AUTH0_CLIENT_ID = env.get(constants.AUTH0_CLIENT_ID)
AUTH0_CLIENT_SECRET = env.get(constants.AUTH0_CLIENT_SECRET)
AUTH0_DOMAIN = env.get(constants.AUTH0_DOMAIN)
AUTH0_BASE_URL = 'https://' + AUTH0_DOMAIN
AUTH0_AUDIENCE = env.get(constants.AUTH0_AUDIENCE)

app = Flask(__name__)
app.secret_key = constants.SECRET_KEY
app.debug = True
# cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.errorhandler(Exception)
def handle_auth_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = (ex.code if isinstance(ex, HTTPException) else 500)
    return response


oauth = OAuth(app)

auth0 = oauth.register(
    'auth0',
    client_id=AUTH0_CLIENT_ID,
    client_secret=AUTH0_CLIENT_SECRET,
    api_base_url=AUTH0_BASE_URL,
    access_token_url=AUTH0_BASE_URL + '/oauth/token',
    authorize_url=AUTH0_BASE_URL + '/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if constants.PROFILE_KEY not in session:
            return redirect('/login')
        return f(*args, **kwargs)

    return decorated


# Controllers API
@app.route('/')
def home():
    return render_template('home.html')


@app.route('/callback')
def callback_handling():

    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    session[constants.JWT_PAYLOAD] = userinfo
    session[constants.PROFILE_KEY] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture'],
        'email': userinfo['email']
    }
    return redirect('/MyProfile')


@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri=AUTH0_CALLBACK_URL, audience=AUTH0_AUDIENCE)


@app.route('/logout')
def logout():
    session.clear()
    params = {'returnTo': url_for(
        'home', _external=True), 'client_id': AUTH0_CLIENT_ID}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))


@app.route('/MyProfile')
@requires_auth
def dashboard():
    user_id, user_name, user_exist = usuarioinfo()

    if (user_id is None):
        return redirect('/logout')

    cache_id = str(uuid.uuid4())
    return render_template('MyProfile.html', cache_id=cache_id, user_id=user_id, user_name=user_name)


@app.route('/settings_user')
@requires_auth
def settings_user():
    user_id, user_name, user_exist = usuarioinfo()
    cache_id = str(uuid.uuid4())
    return render_template('settings_user.html', cache_id=cache_id, user_id=user_id, user_name=user_name)


@app.route('/pet_location')
@requires_auth
def pet_location():
    user_id, user_name, user_exist = usuarioinfo()

    collar_id = ""
    cache_id = str(uuid.uuid4())

    pet_id = request.args.get('pet-id')
    pet = storage.get(Pet, pet_id)
    if (pet is None or pet.user_id != user_id):
        return redirect('/MyProfile')

    if len(pet.collars) == 1:
        collar_id = pet.collars[0].numero_ref
    return render_template('pet_location.html', cache_id=cache_id, pet_id=pet_id, user_id=user_id, collar_id=collar_id, user_name=user_name)


@app.route('/pet_settings')
@requires_auth
def pet_settings():
    user_id, user_name, user_exist = usuarioinfo()

    cache_id = str(uuid.uuid4())

    pet_id = request.args.get('pet-id')
    pet = storage.get(Pet, pet_id)
    if (pet is None or pet.user_id != user_id):
        return redirect('/MyProfile')
    return render_template('pet_settings.html', cache_id=cache_id, pet_id=pet_id, user_id=user_id, user_name=user_name)


@app.route('/add_pet')
@requires_auth
def add_pet():
    user_id, user_name, user_exist = usuarioinfo()

    cache_id = str(uuid.uuid4())

    userId = request.args.get('user-id')
    if (user_id != userId):
        return redirect('/MyProfile')
    return render_template('add_pet.html', cache_id=cache_id, user_id=user_id, user_name=user_name)


def usuarioinfo():
    """ funcion que envia la informacion del usuari """
    userinfo = session[constants.PROFILE_KEY]
    users = storage.all(User)
    user_exist = False
    for user in users.values():
        if user.auth_id == userinfo['user_id']:
            user_id = user.id
            user_name = user.nickname
            password = user.password
            user_exist = True
            break

    if user_exist is False:
        new_user = User(email=userinfo['email'],
                        nickname=userinfo['name'], auth_id=userinfo['user_id'], password="1234")
        new_user.save()
        user_id = new_user.id
        user_name = new_user.nickname

    return(user_id, user_name, user_exist)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=env.get('PORT', 5001),
            threaded=True, debug=app.debug)
