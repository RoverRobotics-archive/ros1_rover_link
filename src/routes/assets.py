import os
from flask import send_file, Blueprint, request, session, redirect
from modules.user_mgr import UserMgr

assets = Blueprint('assets', __name__)

# catchall route handling for vue js app
@assets.route('/' , defaults={'path': ''})
@assets.route('/<path:path>')
def send_vue_app(path):
    active_users = UserMgr.get_active_users()
    if request.method == "GET":
        if not session.get('active_session') or not active_users:
            return redirect('/login')
        elif session.get('active_session') not in active_users:
            return "Please wait until users: " + str(active_users) + " are done"
    return send_file(os.path.join('app', 'index.html'))


@assets.route("/fonts/<file>")
def fonts(file):
    return send_file(os.path.join("app", "fonts", file))

@assets.route("/favicon.png")
def favicon():
    return send_file(os.path.join("app", "favicon.png"))

@assets.route("/img/<file>")
def img(file):
    return send_file(os.path.join("app", "img", file))

@assets.route("/css/<file>")
def css(file):
    return send_file(os.path.join("app", "css", file))

@assets.route("/get-app-css")
def find_css():
    css_files = os.listdir(os.path.join("app", "css"))
    return send_file(os.path.join("app", "css", css_files[0]))

@assets.route("/js/<file>")
def js(file):
    return send_file(os.path.join("app", "js", file))