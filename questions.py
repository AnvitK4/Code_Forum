from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:anvit@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the Flask application
db = SQLAlchemy(app)

# Define your SQLAlchemy model
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    creation_date = db.Column(db.Date, default=datetime.utcnow().date())
    closed_date = db.Column(db.Date, nullable=True)
    score = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'body': self.body,
            'creation_date': self.creation_date.isoformat(),
            'closed_date': self.closed_date.isoformat() if self.closed_date else None,
            'score': self.score
        }

# Routes for handling CRUD operations
@app.route('/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    return jsonify([question.to_dict() for question in questions])

@app.route('/questions/<int:question_id>', methods=['GET'])
def get_question(question_id):
    question = Question.query.get_or_404(question_id)
    return jsonify(question.to_dict())

@app.route('/questions', methods=['POST'])
def create_question():
    data = request.get_json()
    new_question = Question(
        user_id=data['user_id'],
        title=data['title'],
        body=data['body'],
        creation_date=datetime.utcnow().date(),
        score=data.get('score', 0)
    )
    db.session.add(new_question)
    db.session.commit()
    return jsonify(new_question.to_dict()), 201

@app.route('/questions/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.get_json()
    question = Question.query.get_or_404(question_id)
    question.title = data.get('title', question.title)
    question.body = data.get('body', question.body)
    question.closed_date = data.get('closed_date', question.closed_date)
    question.score = data.get('score', question.score)
    db.session.commit()
    return jsonify(question.to_dict())

@app.route('/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.get_or_404(question_id)
    db.session.delete(question)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    # Ensure we are within the application context before creating all tables
    with app.app_context():
        db.create_all()
    # Run the Flask application
    app.run(debug=True)
