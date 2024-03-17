"""
from app import app, db
from flask import Flask, request, render_template, redirect
import mysql.connector

class RegisterModel:
    def __init__(self, username, email, password, confirm_password, phone_number):
        self.username = username
        self.email = email
        self.password = password
        self.confirm_password = confirm_password
        self.phone_number = phone_number



    db = mysql.connector.connect(
        host="localhost",
        user="yourusername",
        password="yourpassword",
        database="yourdatabase"
    )
    cursor = db.cursor()

    @app.route('/register', methods=['POST'])
    def register():
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        
        query = "SELECT * FROM clients WHERE username = %s OR email = %s"
        cursor.execute(query, (username, email))
        existing_client = cursor.fetchone()

        if existing_client:
            return render_template('register.html', error='Username or email already exists')
        else:
            insert_query = "INSERT INTO clients (username, email, password) VALUES (%s, %s, %s)"
            cursor.execute(insert_query, (username, email, password))
            db.commit()
            
        
            return redirect('/login')
    
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
"""
from flask import Flask, request, render_template, redirect
from app import db
from models import Staff


@app.route('/register', methods=['POST'])
def register():
    if 'name' in request.form:
        name = request.form['name']
        position = request.form['position']
        email = request.form['email']
        salary = float(request.form['salary'])
        date_of_birth = request.form['date_of_birth']
        tel = request.form['tel']
        address = request.form['address']
        date_of_employment = request.form['date_of_employment']

        new_staff = Staff(name=name, position=position, email=email, salary=salary, 
                          date_of_birth=date_of_birth, tel=tel, address=address,
                          date_of_employment=date_of_employment)
        db.session.add(new_staff)
        db.session.commit()

        return redirect('/staff_list')
    

    else:
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        phone_number = request.form['phone_number']
        
        new_staff = Staff(username=username, email=email, password=password, 
                          confirm_password=confirm_password, phone_number=phone_number)
        db.session.add(new_staff)
        db.session.commit()
        
        return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)
