from flask import Blueprint, request, jsonify
from models import TransportOption, db

transport_bp = Blueprint('transport', __name__)

@transport_bp.route('/', methods=['GET'])
def get_transport_options():
    options = TransportOption.query.all()
    return jsonify([{
        'id': t.id,
        'type': t.type,
        'name': t.name,
        'details': t.details,
        'price': t.price,
        'package_id': t.package_id
    } for t in options])

@transport_bp.route('/', methods=['POST'])
def add_transport_option():
    data = request.json
    t = TransportOption(**data)
    db.session.add(t)
    db.session.commit()
    return jsonify({'message': 'Transport option added'}), 201

@transport_bp.route('/<int:option_id>', methods=['PUT'])
def update_transport_option(option_id):
    t = TransportOption.query.get_or_404(option_id)
    data = request.json
    for key, value in data.items():
        setattr(t, key, value)
    db.session.commit()
    return jsonify({'message': 'Transport option updated'})

@transport_bp.route('/<int:option_id>', methods=['DELETE'])
def delete_transport_option(option_id):
    t = TransportOption.query.get_or_404(option_id)
    db.session.delete(t)
    db.session.commit()
    return jsonify({'message': 'Transport option deleted'})