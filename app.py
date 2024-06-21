from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import bcrypt
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:anvit@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    reputation = db.Column(db.Integer, default=0)
    join_date = db.Column(db.Date, nullable=False, default=datetime.utcnow().date())
    profile_info = db.Column(db.Text)

    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    creation_date = db.Column(db.Date, nullable=False, default=datetime.utcnow().date())
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

class RegistrationForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Register')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Email is already registered. Please choose a different one.')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Bad Request', 'message': 'Missing required fields'}), 400
    
    name = data['name']
    email = data['email']
    password = data['password']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Conflict', 'message': 'Email already registered'}), 409

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(name=name, email=email, password=hashed_password.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        session['user_id'] = user.id
        session['user_name'] = user.name
        return jsonify({'message': 'Login successful', 'user': {'name': user.name, 'email': user.email}})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/auth/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return jsonify({'message': 'Logged out'}), 200

@app.route('/auth/user', methods=['GET'])
def get_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized', 'message': 'User not logged in'}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Not Found', 'message': 'User not found'}), 404
    
    user_data = {
        'name': user.name,
        'email': user.email,
        'reputation': user.reputation,
        'join_date': user.join_date.isoformat(),
        'profile_info': user.profile_info
    }
    return jsonify(user_data), 200

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
    app.run(debug=True)
