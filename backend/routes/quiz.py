from flask import Blueprint, request, jsonify
from models import QuizQuestion, Option, TravelerAnswer
from db import db

quiz_bp = Blueprint('quiz', __name__)

# Get all quiz questions with options
@quiz_bp.route('/questions', methods=['GET'])
def get_questions():
    questions = QuizQuestion.query.all()
    result = []
    for q in questions:
        options = Option.query.filter_by(question_id=q.id).all()
        result.append({
            'id': q.id,
            'title': q.title,
            'questionText': q.question_text,
            'type': q.question_type,
            'options': [o.option_text for o in options]
        })
    return jsonify(result)


@quiz_bp.route('/questions', methods=['POST'])
def add_question():
    data = request.json
    question = QuizQuestion(
        title=data['title'],
        question_text=data['questionText'],
        question_type=data['type']
    )
    db.session.add(question)
    db.session.commit()
    
    for opt in data.get('options', []):
        option = Option(question_id=question.id, option_text=opt)
        db.session.add(option)
    db.session.commit()
    return jsonify({'message': 'Question added'}), 201


@quiz_bp.route('/answers', methods=['POST'])
def save_answers():
    data = request.json  
    for ans in data['answers']:
        answer = TravelerAnswer(
            traveler_id=data['traveler_id'],
            question_id=ans['question_id'],
            option_id=ans.get('option_id'),
            input_value=ans.get('input_value')
        )
        db.session.add(answer)
    db.session.commit()
    return jsonify({'message': 'Answers saved'}), 201