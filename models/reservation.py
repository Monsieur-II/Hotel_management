from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reservations.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@hostname/database_name' # Use case: 'mysql://root:password@localhost/hotel_database'
db = SQLAlchemy(app)

class Reservation(db.Model):
    __tablename__ = 'Reservation'
    id = db.Column(db.Integer, primary_key=True)
    guest_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)

@app.route('/reservation', methods=['POST'])
def make_reservation():
    data = request.json
    guest_name = f"{data['first_name']} {data['last_name']}"
    email = data['email']
    phone = data['phone']
    check_in_date = datetime.strptime(data['check_in_date'], '%Y-%m-%d').date()
    check_out_date = datetime.strptime(data['check_out_date'], '%Y-%m-%d').date()

    reservation = Reservation(guest_name=guest_name, email=email, phone=phone, 
                              check_in_date=check_in_date, check_out_date=check_out_date)
    db.session.add(reservation)
    db.session.commit()

    return jsonify({"message": "Reservation made successfully"}), 200

@app.route('/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    reservation_list = [{
        'id': reservation.id,
        'guest_name': reservation.guest_name,
        'email': reservation.email,
        'phone': reservation.phone,
        'check_in_date': reservation.check_in_date.strftime("%Y-%m-%d"),
        'check_out_date': reservation.check_out_date.strftime("%Y-%m-%d")
    } for reservation in reservations]

    return jsonify(reservation_list), 200

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
