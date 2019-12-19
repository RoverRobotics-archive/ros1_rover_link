from flask import  Blueprint, session, request, jsonify
from modules.user_mgr import UserManager


usr_mgr = UserManager()
users = Blueprint('users', __name__)


@users.route('/set-active-user', methods=["POST"])
def start_session():
    user_alias = request.args.get('alias')
    if not user_alias:
        return "please provide an alias", 400
    for key in session.keys():
        print(key)
    session['active_session'] = True

    return "added successfully"


@users.route('/is-active-user', methods=["GET"])
def check_is_active():
    return jsonify({
        'active_session': session.get('active_session')
    })
@users.route('/remove-user', methods=["POST"])
def remove_session():
    user_alias = request.args.get('alias')


