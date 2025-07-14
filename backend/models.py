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