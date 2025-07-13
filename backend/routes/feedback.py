from flask import Blueprint, request, jsonify
from models import Feedback
from db import db

feedback_bp = Blueprint('feedback', __name__)

# Get all feedback for a package
@feedback_bp.route('/package/<int:package_id>', methods=['GET'])
def get_feedback_for_package(package_id):
    feedbacks = Feedback.query.filter_by(package_id=package_id).all()
    result = []
    for f in feedbacks:
        result.append({
            'id': f.id,
            'traveler_id': f.traveler_id,
            'rating': f.rating,
            'comment': f.comment,
            'timestamp': f.timestamp
        })
    return jsonify(result)

# Add feedback
@feedback_bp.route('/', methods=['POST'])
def add_feedback():
    data = request.json
    f = Feedback(
        traveler_id=data['traveler_id'],
        package_id=data['package_id'],
        rating=data['rating'],
        comment=data['comment']
    )
    db.session.add(f)
    db.session.commit()
    return jsonify({'message': 'Feedback added'}), 201

# Get all feedback (admin)
@feedback_bp.route('/', methods=['GET'])
def get_all_feedback():
    feedbacks = Feedback.query.all()
    result = []
    for f in feedbacks:
        result.append({
            'id': f.id,
            'traveler_id': f.traveler_id,
            'package_id': f.package_id,
            'rating': f.rating,
            'comment': f.comment,
            'timestamp': f.timestamp
        })
    return jsonify(result)

# Delete feedback (for admin)
@feedback_bp.route('/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    fb = Feedback.query.get_or_404(feedback_id)
    db.session.delete(fb)
    db.session.commit()
    return jsonify({'message': 'Feedback deleted'})