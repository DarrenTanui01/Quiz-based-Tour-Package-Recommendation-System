from db import db
from datetime import datetime

class Traveler(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True)
    password_hash = db.Column(db.String(128))

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    question_text = db.Column(db.Text)
    question_type = db.Column(db.String(50))  

class Option(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'))
    option_text = db.Column(db.String(255))
    preference_value = db.Column(db.Integer)

class TravelerAnswer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'))
    question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'))
    option_id = db.Column(db.Integer, db.ForeignKey('option.id'), nullable=True)
    input_value = db.Column(db.String(255), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class TourPackage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    estimated_cost = db.Column(db.Float)
    duration_days = db.Column(db.Integer)
    season = db.Column(db.String(100))

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'))
    package_id = db.Column(db.Integer, db.ForeignKey('tour_package.id'))
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class RecommendedPackage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'))
    package_id = db.Column(db.Integer, db.ForeignKey('tour_package.id'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Hotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    description = db.Column(db.Text)
    package_id = db.Column(db.Integer, db.ForeignKey('tour_package.id'))
    price_per_night = db.Column(db.Float)
    image_url = db.Column(db.String(255))

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'))
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'))
    package_id = db.Column(db.Integer, db.ForeignKey('tour_package.id'))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    payment_method = db.Column(db.String(50))  # 'cash' or 'mpesa'
    payment_status = db.Column(db.String(50), default='pending')
    amount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TransportOption(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))  # 'flight', 'van', 'train'
    name = db.Column(db.String(255))
    details = db.Column(db.Text)
    price = db.Column(db.Float)
    package_id = db.Column(db.Integer, db.ForeignKey('tour_package.id'))

class TransportBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'))
    transport_option_id = db.Column(db.Integer, db.ForeignKey('transport_option.id'))
    date = db.Column(db.Date)
    payment_method = db.Column(db.String(50))
    payment_status = db.Column(db.String(50), default='pending')
    amount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)