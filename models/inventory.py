from app import db
from enum import Enum


# the various inventory items
class ItemName(Enum):
    TOILET_PAPER = 'Toilet Paper'
    TOWELS = 'Towels'
    SHAMPOO = 'Shampoo'
    SOAP = 'Soap'
    TOOTHBRUSH = 'Toothbrush'
    TOOTHPASTE = 'Toothpaste'
    SLIPPERS = 'Slippers'
    ROBES = 'Robes'
    COFFEE = 'Coffee'
    SPONGES = 'Sponges'
    SUNSCREEN = 'Sunscreen'
    
    def Item_Prices(self):
        """Returns the various prices of the items"""
        print("")


class Inventory(db.Model):
    __tablename__ = 'Inventory'
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.Enum(ItemName), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_per_unit = db.Column(db.Float, nullable=False)

    # Relationships
    booking = db.relationship("Booking")
