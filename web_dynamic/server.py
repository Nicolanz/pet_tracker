"""
Python Flask WebApp Auth0 integration
"""
from functools import wraps
from os import environ as env
from werkzeug.exceptions import HTTPException
from dotenv import load_dotenv, find_dotenv
from flask import Flask, jsonify, request, redirect
from flask import render_template, session, url_for
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode
from models import storage
from models.user import User
from models.pet import Pet
import json
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


@app.errorhandler(Exception)
def handle_auth_error(ex):
    """Error handler Authenticating """
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
    """ Function that verifies if a user requiere authetification """
    @wraps(f)
    def decorated(*args, **kwargs):
        """ Create a decorator for the users identity """
        if constants.PROFILE_KEY not in session:
            return redirect('/login')
        return f(*args, **kwargs)

    return decorated


@app.route('/')
def home():
    """ Route and Render the home page HTML """
    return render_template('home.html')


@app.route('/callback')
def callback_handling():
    """
        Auth0 callback function, this function call the auth0
        autehntification service
    """
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
    """ Authorize authentication from Auth0 """
    return auth0.authorize_redirect(redirect_uri=AUTH0_CALLBACK_URL,
                                    audience=AUTH0_AUDIENCE)


@app.route('/logout')
def logout():
    """ Clear the session and logout the user """
    session.clear()
    params = {'returnTo': url_for(
        'home', _external=True), 'client_id': AUTH0_CLIENT_ID}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))


@app.route('/MyProfile')
@requires_auth
def MyProfile():
    """ Route and Render the Myprofile HTML Main page """
    user_id, user_name = user_info()

    if user_id is None:
        return redirect('/logout')

    cache_id = str(uuid.uuid4())
    return render_template('MyProfile.html', cache_id=cache_id,
                           user_id=user_id, user_name=user_name)


@app.route('/settings_user')
@requires_auth
def settings_user():
    """ Route and Render the settings_user HTML """
    user_id, user_name = user_info()
    cache_id = str(uuid.uuid4())
    return render_template('settings_user.html', cache_id=cache_id,
                           user_id=user_id, user_name=user_name)


@app.route('/pet_location')
@requires_auth
def pet_location():
    """ Route and Render the pet_location HTML page """
    user_id, user_name = user_info()
    collar_id = ""
    cache_id = str(uuid.uuid4())

    pet_id = request.args.get('pet-id')
    pet = storage.get(Pet, pet_id)
    if pet is None or pet.user_id != user_id:
        return redirect('/MyProfile')

    if len(pet.collars) == 1:
        collar_id = pet.collars[0].numero_ref
    return render_template('pet_location.html',
                           cache_id=cache_id, pet_id=pet_id,
                           user_id=user_id, collar_id=collar_id,
                           user_name=user_name)


@app.route('/pet_settings')
@requires_auth
def pet_settings():
    """ Route and render the pet_settings HTML page """
    user_id, user_name = user_info()
    cache_id = str(uuid.uuid4())

    pet_id = request.args.get('pet-id')
    pet = storage.get(Pet, pet_id)
    if (pet is None or pet.user_id != user_id):
        return redirect('/MyProfile')
    return render_template('pet_settings.html',
                           cache_id=cache_id, pet_id=pet_id,
                           user_id=user_id, user_name=user_name)


@app.route('/add_pet')
@requires_auth
def add_pet():
    """ Route and render the add_pet HTML page """
    user_id, user_name = user_info()
    cache_id = str(uuid.uuid4())

    userId = request.args.get('user-id')
    if user_id != userId:
        return redirect('/MyProfile')
    return render_template('add_pet.html', cache_id=cache_id,
                           user_id=user_id, user_name=user_name)


def user_info():
    """ function that get the user information of auth0 """
    userinfo = session[constants.PROFILE_KEY]
    users = storage.all(User)

    user_exist = False
    for user in users.values():
        if user.auth_id == userinfo['user_id']:
            user_id = user.id
            user_name = user.nickname
            user_exist = True
            break

    if user_exist is False:
        new_user = User(email=userinfo['email'],
                        nickname=userinfo['name'],
                        auth_id=userinfo['user_id'])
        new_user.save()
        user_id = new_user.id
        user_name = new_user.nickname

    return(user_id, user_name)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=env.get('PORT', 5001),
            threaded=True, debug=app.debug)
