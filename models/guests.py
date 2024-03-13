from app import db


class Guest(db.Model):
    __tablename__ = 'Guests'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    # Relationships
    bookings = db.relationship("Booking", back_populates="guest")


# Cans
# Get notifications when a new booking is made
# Make purchases on an in-house store
