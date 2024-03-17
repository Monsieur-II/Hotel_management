from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from guests import Guest


class Billing(db.Model):
    __tablename__ = 'billing'
    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('guests.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

@app.route('/generate-bill', methods=['POST'])
def generate_bill():
    data = request.json
    guest_name = data.get('guest_name')
    room_type = data.get('room_type')
    nights = data.get('nights')

    if not all([guest_name, room_type, nights]):
        return "Missing required data", 400

    guest = Guest.query.filter_by(name=guest_name).first()
    if not guest:
        return "Guest not found", 404

    guest.room_type = room_type
    total_bill = guest.calculate_bill(nights)

    return {
        "Guest Name": guest_name,
        "Room Type": room_type,
        "Nights": nights,
        "Total Bill": total_bill
    }

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
