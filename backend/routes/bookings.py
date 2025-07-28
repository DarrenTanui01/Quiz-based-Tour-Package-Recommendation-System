from flask import Blueprint, request, jsonify
from models import Booking, Hotel, TransportOption, TransportBooking, db
from datetime import datetime
from dateutil.parser import parse  

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/hotels/<int:package_id>', methods=['GET'])
def get_hotels_for_package(package_id):
    hotels = Hotel.query.filter_by(package_id=package_id).all()
    return jsonify([{
        'id': h.id,
        'name': h.name,
        'location': h.location,
        'description': h.description,
        'price_per_night': h.price_per_night,
        'image_url': h.image_url
    } for h in hotels])

@bookings_bp.route('/book', methods=['POST'])
def book_hotel():
    data = request.json
    # Prevent double-booking
    existing = Booking.query.filter(
        Booking.hotel_id == data['hotel_id'],
        Booking.start_date <= parse(data['end_date']),
        Booking.end_date >= parse(data['start_date'])
    ).first()
    if existing:
        return jsonify({'error': 'Hotel already booked for these dates'}), 400

    # Validate date range
    if parse(data['end_date']) <= parse(data['start_date']):
        return jsonify({'error': 'End date must be after start date'}), 400

    booking = Booking(
        traveler_id=data['traveler_id'],
        hotel_id=data['hotel_id'],
        package_id=data['package_id'],
        start_date=parse(data['start_date']),
        end_date=parse(data['end_date']),
        payment_method=data['payment_method'],
        amount=data['amount'],
        payment_status='pending'
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({'message': 'Booking created', 'booking_id': booking.id}), 201

@bookings_bp.route('/transport_options/<int:package_id>', methods=['GET'])
def get_transport_options(package_id):
    options = TransportOption.query.filter_by(package_id=package_id).all()
    return jsonify([{
        'id': t.id,
        'type': t.type,
        'name': t.name,
        'details': t.details,
        'price': t.price
    } for t in options])

@bookings_bp.route('/book_transport', methods=['POST'])
def book_transport():
    data = request.json
    tb = TransportBooking(
        traveler_id=data['traveler_id'],
        transport_option_id=data['transport_option_id'],
        date=parse(data['date']), 
        payment_method=data['payment_method'],
        amount=data['amount'],
        payment_status='pending'
    )
    db.session.add(tb)
    db.session.commit()
    return jsonify({'message': 'Transport booked', 'booking_id': tb.id}), 201