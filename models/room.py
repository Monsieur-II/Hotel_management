from app import db


class Room(db.Model):
    __tablename__ = 'Rooms'

    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(50), unique=True, nullable=False)
    room_type = db.Column(db.String(50), nullable=False)  # e.g. single, double, suite
    price_per_night = db.Column(db.Float, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    available_date = db.Column(db.Date, nullable=False)
    # amenities = db.Column(db.String(100), nullable=False)

    def __str__(self):
        return f'<Room {self.room_number}>'

    # Relationships
    bookings = db.relationship("Booking", back_populates="room")
