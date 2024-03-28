from database import db


class Billing(db.Model):
    __tablename__ = 'Billing'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('Guests.id'))
    amount = db.Column(db.Integer, nullable=False)
    guest = db.relationship("Guest", back_populates="billing")
