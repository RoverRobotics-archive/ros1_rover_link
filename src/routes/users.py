from flask import  Blueprint, session, request, jsonify, render_template, redirect

from modules.user_mgr import UserMgr

users = Blueprint('users', __name__)


@users.route('/login', methods=["POST", "GET"])
def start_session():
    active_users = UserMgr.get_active_users()
    if request.method == "GET":
        print(active_users)
        return render_template('login.html', active_users=active_users)
    if request.method == "POST":
        user_alias = request.form.get('alias')
        if not user_alias:
            return render_template('login.html', error="Please enter a username", active_users=active_users)
        try:
            UserMgr.add(user_alias)
        except:
            return render_template('login.html', error="A user with that name is already in queue", active_users=active_users)

        session['active_session'] = user_alias

        return redirect('/')


@users.route('/logout', methods=["GET"])
def logout():
    UserMgr.remove(session['active_session'])
    session['active_session'] = None
    return "You Have Been Logged Out"



