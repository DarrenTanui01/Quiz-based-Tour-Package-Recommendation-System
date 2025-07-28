from flask import Blueprint, request, jsonify
from models import TourPackage, Hotel, db

packages_bp = Blueprint('packages', __name__)
hotels_bp = Blueprint('hotels', __name__)

# Tour Package Routes

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

# Hotel Routes

@hotels_bp.route('/', methods=['GET'])
def get_hotels():
    hotels = Hotel.query.all()
    return jsonify([{
        'id': h.id,
        'name': h.name,
        'location': h.location,
        'description': h.description,
        'package_id': h.package_id,
        'price_per_night': h.price_per_night,
        'image_url': h.image_url
    } for h in hotels])

@hotels_bp.route('/', methods=['POST'])
def add_hotel():
    data = request.json
    h = Hotel(**data)
    db.session.add(h)
    db.session.commit()
    return jsonify({'message': 'Hotel added'}), 201

@hotels_bp.route('/<int:hotel_id>', methods=['PUT'])
def update_hotel(hotel_id):
    h = Hotel.query.get_or_404(hotel_id)
    data = request.json
    for key, value in data.items():
        setattr(h, key, value)
    db.session.commit()
    return jsonify({'message': 'Hotel updated'})

@hotels_bp.route('/<int:hotel_id>', methods=['DELETE'])
def delete_hotel(hotel_id):
    h = Hotel.query.get_or_404(hotel_id)
    db.session.delete(h)
    db.session.commit()
    return jsonify({'message': 'Hotel deleted'})