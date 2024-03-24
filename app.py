#!/usr/bin/env python3

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from models.reservation import Reservation
from models.booking import Booking
from models.billing import Billing
from models.guests import Guest
from models.registerModel import Staff
from models.engine.db_storage import DBStorage
from controllers.blueprint import blueprints


app = Flask(__name__)
app.template_folder = 'admin'
for blueprint in blueprints:
    app.register_blueprint(blueprint)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://MySQL_USER:mysql@localhost/hotel_management_system' # Use case: 'mysql://root:password@localhost/hotel_database'
db = SQLAlchemy(app)
db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
