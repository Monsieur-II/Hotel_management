from flask import render_template, redirect, session
from functools import wraps
from app import app


def admin_login_required(f):
    @wraps(f)
    def admin_login_check(*args, **kwargs):
        if 'admin_logged_in' not in session:
            return redirect('/admin_login')
        return f(*args, **kwargs)
    return admin_login_check

@app.route('/admin_login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        if request.form['username'] == 'admin' and request.form['password'] == 'admin123':
            session['admin_logged_in'] = True
            return redirect('/admin_dashboard')
        else:
            return render_template('admin_login.html', error='Invalid username or password')
    return render_template('admin_login.html')

@app.route('/admin_dashboard')
@admin_login_required
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/manage_staffs')
@admin_login_required
def admin_staff_management():
    return render_template('manage_staff.html')

@app.route('/manage_rooms')
@admin_login_required
def admin_room_management():
    return render_template('manage_rooms.html')
