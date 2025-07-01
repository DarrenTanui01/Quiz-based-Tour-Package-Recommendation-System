from flask import Blueprint, request, jsonify
from models import Traveler, Administrator
from db import db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    traveler = Traveler(name=data['name'], email=data['email'], password_hash=hashed)
    db.session.add(traveler)
    try:
        db.session.commit()
        return jsonify({'message': 'Traveler registered successfully'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Email already registered'}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    traveler = Traveler.query.filter_by(email=data['email']).first()
    if traveler and bcrypt.check_password_hash(traveler.password_hash, data['password']):
        access_token = create_access_token(identity=traveler.id)
        return jsonify({
            'access_token': access_token,
            'traveler_id': traveler.id,
            'name': traveler.name,  # Add this line
            'email': traveler.email # Add this line for completeness
        })
    return jsonify({'message': 'Invalid credentials'}), 401

# List all users (for admin)
@auth_bp.route('/users', methods=['GET'])
def list_users():
    users = Traveler.query.all()
    return jsonify([
        {'id': u.id, 'name': u.name, 'email': u.email}
        for u in users
    ])

# Delete a user (for admin)
@auth_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = Traveler.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'})