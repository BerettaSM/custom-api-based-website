def create_app():
    from flask import Flask
    app = Flask(__name__)

    from secrets import token_hex
    app.config['SECRET_KEY'] = token_hex(32)

    from .views import views
    app.register_blueprint(views, url_prefix='/')

    return app
