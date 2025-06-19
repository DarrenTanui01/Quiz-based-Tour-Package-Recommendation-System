from flask import Blueprint, request, jsonify
from models import TourPackage
from db import db

packages_bp = Blueprint('packages', __name__)

# Get all packages
@packages_bp.route('/', methods=['GET'])
def get_packages():
    packages = TourPackage.query.all()
    result = []
    for p in packages:
        result.append({
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'estimated_cost': p.estimated_cost,
            'duration_days': p.duration_days,
            'season': p.season
        })
    return jsonify(result)

# Get a single package by ID
@packages_bp.route('/<int:package_id>', methods=['GET'])
def get_package(package_id):
    p = TourPackage.query.get_or_404(package_id)
    return jsonify({
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'estimated_cost': p.estimated_cost,
        'duration_days': p.duration_days,
        'season': p.season
    })

# Add a new package
@packages_bp.route('/', methods=['POST'])
def add_package():
    data = request.json
    p = TourPackage(
        name=data['name'],
        description=data['description'],
        estimated_cost=data['estimated_cost'],
        duration_days=data['duration_days'],
        season=data['season']
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({'message': 'Package added'}), 201

# Update a package
@packages_bp.route('/<int:package_id>', methods=['PUT'])
def update_package(package_id):
    p = TourPackage.query.get_or_404(package_id)
    data = request.json
    p.name = data.get('name', p.name)
    p.description = data.get('description', p.description)
    p.estimated_cost = data.get('estimated_cost', p.estimated_cost)
    p.duration_days = data.get('duration_days', p.duration_days)
    p.season = data.get('season', p.season)
    db.session.commit()
    return jsonify({'message': 'Package updated'})

# Delete a package
@packages_bp.route('/<int:package_id>', methods=['DELETE'])
def delete_package(package_id):
    p = TourPackage.query.get_or_404(package_id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({'message': 'Package deleted'})