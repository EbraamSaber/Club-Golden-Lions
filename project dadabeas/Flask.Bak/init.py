from flask import Flask # type: ignore
from .members import members_bp # type: ignore
# Import other blueprints

def register_routes(app: Flask):
    app.register_blueprint(members_bp)
    # Register other blueprints
