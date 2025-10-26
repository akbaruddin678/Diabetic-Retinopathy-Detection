import os
from flask import jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from database import db, User
from datetime import timedelta

jwt = JWTManager()

def init_auth(app):
    # Configure JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
    
    # Disable CSRF for token-based mobile authentication
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    
    jwt.init_app(app)
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'message': 'Token has expired',
            'error': 'token_expired'
        }), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        print(f"Invalid token error: {error}")
        return jsonify({
            'message': 'Invalid token',
            'error': 'invalid_token'
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'message': 'Request does not contain an access token',
            'error': 'authorization_required'
        }), 401

def register_user(email, password, name):
    if User.query.filter_by(email=email).first():
        return None, "User already exists"
    
    user = User(email=email, name=name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    # Convert user.id to string for JWT identity - FIXED
    access_token = create_access_token(
        identity=str(user.id),  # Convert to string
        expires_delta=timedelta(days=7)
    )
    
    return {
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name
        }
    }, None

def login_user(email, password):
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return None, "Invalid credentials"
    
    # Convert user.id to string for JWT identity - FIXED
    access_token = create_access_token(
        identity=str(user.id),  # Convert to string
        expires_delta=timedelta(days=7)
    )
    
    return {
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name
        }
    }, None