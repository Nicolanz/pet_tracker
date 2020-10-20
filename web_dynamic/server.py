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


user_id = None
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
        'picture': userinfo['picture']
    }
    users = storage.all(User)
    user_exist = False
    global user_id
    for user in users.values():
        if user.auth_id == userinfo['sub']:
            user_exist = True
            user_id = user.id
            break
    if user_exist is False:
        new_user = User(email=userinfo['email'],
                        nickname=userinfo['nickname'], auth_id=userinfo['sub'])
        new_user.save()
        user_id = new_user.id
    # Id temporal
    user_id = "ce390c64-b8f0-42cc-939d-f84878e8840e"
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
    cache_id = str(uuid.uuid4())
    return render_template('MyProfile.html', cache_id=cache_id, user_id=user_id)


@app.route('/settings_user')
@requires_auth
def settinguser():
    cache_id = str(uuid.uuid4())
    user_id = request.args.get('user-id')
    return render_template('settings_user.html', cache_id=cache_id, user_id=user_id)


@app.route('/pet_location')
@requires_auth
def pet_map():
    cache_id = str(uuid.uuid4())
    pet_id = request.args.get('pet-id')
    return render_template('pet_location.html', cache_id=cache_id, pet_id=pet_id)


@app.route('/add_pet')
@requires_auth
def add_pet():
    cache_id = str(uuid.uuid4())
    user_id = request.args.get('user-id')
    return render_template('add_pet.html', cache_id=cache_id, user_id=user_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=env.get('PORT', 5001))
