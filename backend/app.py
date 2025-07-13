from flask import Flask
from flask_cors import CORS
from config import Config
from db import db
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    CORS(app, supports_credentials=True)

    
    JWTManager(app)

    
    from routes.auth import auth_bp
    from routes.quiz import quiz_bp
    from routes.packages import packages_bp
    from routes.feedback import feedback_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(quiz_bp, url_prefix='/api/quiz')
    app.register_blueprint(packages_bp, url_prefix='/api/packages')
    app.register_blueprint(feedback_bp, url_prefix='/api/feedback')

    @app.route('/')
    def index():
        return 'Quiz-based Tour Package Recommendation System API is running.'

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)