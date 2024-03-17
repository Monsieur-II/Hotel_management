#!/usr/bin/env python3

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()  # take environment variables from .env.
app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reservations.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@hostname/database_name' # Use case: 'mysql://root:password@localhost/hotel_database'
db = SQLAlchemy(app)
# app.register_blueprint(user)
# app.register_blueprint(product)
