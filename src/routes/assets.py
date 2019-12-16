import os
from flask import send_file, Blueprint


assets = Blueprint('assets', __name__)

@assets.route('/')
def send_vue_app_index():
    return send_file(os.path.join('app', 'index.html'))


@assets.route('/<path:path>')
def send_vue_app(path):
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

@assets.route("/js/<file>")
def js(file):
    return send_file(os.path.join("app", "js", file))