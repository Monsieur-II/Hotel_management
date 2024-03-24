from flask import Blueprint
from models.reservation import reservation_bp
from models.booking import booking_bp
from models.billing import billing_bp
from DTOS.registerModel import registration_bp
from admin.routes import routes_bp


blueprints = [
    reservation_bp,
    booking_bp,
    billing_bp,
    registration_bp,
    routes_bp
]
