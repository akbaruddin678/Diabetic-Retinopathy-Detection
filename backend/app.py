import os
import json
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from database import db, User, Prediction

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-super-secret-key-change-this')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret-key-change-this')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///eyecare.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 16777216))  # 16MB
app.config['MODEL_FOLDER'] = 'model'
app.config['MODEL_PATH'] = os.path.join(app.config['MODEL_FOLDER'], "best_finetuned_resnet101.pth")

# Initialize extensions
db.init_app(app)

# Create directories
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['MODEL_FOLDER'], exist_ok=True)

# Allowed extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tif', 'tiff'}

# -------------------------
# Model loading (5-class) - Using your existing model
# -------------------------
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
LABELS = ["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"]

def load_model():
    model_path = app.config['MODEL_PATH']
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}. Put your .pth there.")
    
    # Build architecture - using your existing ResNet101 setup
    try:
        base = models.resnet101(weights=None)
    except TypeError:
        base = models.resnet101(pretrained=False)
    
    in_feats = base.fc.in_features
    base.fc = nn.Linear(in_feats, len(LABELS))
    
    # Load weights carefully (handle state_dict formats)
    state = torch.load(model_path, map_location=DEVICE)
    
    # If saved as {'state_dict': ...}
    if isinstance(state, dict) and "state_dict" in state and isinstance(state["state_dict"], dict):
        state = state["state_dict"]
    
    # Strip "module." if present
    new_state = {}
    if isinstance(state, dict):
        for k, v in state.items():
            new_key = k.replace("module.", "") if k.startswith("module.") else k
            new_state[new_key] = v
        base.load_state_dict(new_state, strict=True)
    else:
        # if full model object saved (rare)
        base = state
    
    base.to(DEVICE)
    base.eval()
    return base

# Load model globally
try:
    model = load_model()
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    model = None

# -------------------------
# Transform - Using your existing transform
# -------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# -------------------------
# Helpers
# -------------------------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_image(image_path):
    """Your existing prediction function"""
    if model is None:
        raise Exception("Model not loaded")
    
    img = Image.open(image_path).convert("RGB")
    x = transform(img).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
        out = model(x)
        probs = torch.nn.functional.softmax(out, dim=1).cpu().numpy()[0]
    idx = int(probs.argmax())
    label = LABELS[idx]
    confidence = float(probs[idx]) * 100.0
    return label, confidence, probs.tolist()

# -------------------------
# Import and initialize auth after app configuration
# -------------------------
from auth import init_auth, register_user, login_user, jwt_required, get_jwt_identity
init_auth(app)

# -------------------------
# Routes
# -------------------------
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Registration attempt for:", data.get('email'))
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        result, error = register_user(
            data['email'],
            data['password'],
            data.get('name', '')
        )
        
        if error:
            return jsonify({'message': error}), 400
        
        print("Registration successful for:", data.get('email'))
        return jsonify(result), 201
        
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Login attempt for:", data.get('email'))
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        result, error = login_user(data['email'], data['password'])
        
        if error:
            print("Login failed for:", data.get('email'))
            return jsonify({'message': error}), 401
        
        print("Login successful for:", data.get('email'))
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'message': 'Internal server error'}), 500

@app.route('/api/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        print(f"Token verification successful for user: {user_id}")
        return jsonify({
            'message': 'Token is valid',
            'user_id': user_id,
            'user_email': user.email if user else 'Unknown'
        }), 200
    except Exception as e:
        print(f"Token verification failed: {str(e)}")
        return jsonify({
            'message': 'Token verification failed',
            'error': str(e)
        }), 401

@app.route('/api/debug-token', methods=['POST'])
def debug_token():
    """Endpoint to debug token without JWT validation"""
    auth_header = request.headers.get('Authorization')
    print(f"=== TOKEN DEBUG INFO ===")
    print(f"Authorization header: {auth_header}")
    
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header[7:]
        print(f"Token received: {token}")
        print(f"Token length: {len(token)}")
        print(f"Token starts with: {token[:20]}...")
    else:
        print("No valid Authorization header found")
    
    print(f"=== END DEBUG INFO ===")
    
    return jsonify({
        'message': 'Debug info printed to console',
        'auth_header_present': bool(auth_header)
    }), 200

@app.route('/api/predict', methods=['POST'])
@jwt_required()
def predict():
    try:
        # Get user ID from JWT token
        user_id_str = get_jwt_identity()
        user_id = int(user_id_str)
        print(f"Received prediction request from user: {user_id}")

        if 'image' not in request.files:
            print("No image file in request")
            return jsonify({'message': 'No image file provided'}), 400
        
        file = request.files['image']
        print(f"Received file: {file.filename}, Content-Type: {file.content_type}")
        
        if file.filename == '':
            print("Empty filename")
            return jsonify({'message': 'No image selected'}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            print(f"Saving file to: {filepath}")
            file.save(filepath)

            # Check if file was saved successfully
            if not os.path.exists(filepath):
                print("File was not saved successfully")
                return jsonify({'message': 'Failed to save image'}), 500

            print("File saved successfully, starting prediction...")
            
            # Perform image prediction using YOUR model
            try:
                prediction_result, confidence, probabilities = predict_image(filepath)
                print(f"Prediction result: {prediction_result}, Confidence: {confidence}")
            except Exception as e:
                print(f"Model prediction error: {str(e)}")
                return jsonify({'message': f'Prediction failed: {str(e)}'}), 500

            # Save prediction to database
            prediction = Prediction(
                user_id=user_id,
                image_path=filename,
                prediction_result=prediction_result,
                confidence=confidence
            )
            db.session.add(prediction)
            db.session.commit()
            print(f"Prediction saved to database with ID: {prediction.id}")

            return jsonify({
                'prediction': prediction_result,
                'confidence': confidence,
                'probabilities': probabilities,
                'prediction_id': prediction.id,
                'timestamp': prediction.created_at.isoformat(),
                'disease_classes': LABELS
            }), 200
        
        print(f"Invalid file type: {file.filename}")
        return jsonify({'message': 'Invalid file type'}), 400
        
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'message': str(e)}), 500

@app.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    try:
        user_id_str = get_jwt_identity()
        user_id = int(user_id_str)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        predictions = Prediction.query.filter_by(user_id=user_id)\
            .order_by(Prediction.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        history = []
        for pred in predictions.items:
            history.append({
                'id': pred.id,
                'prediction_result': pred.prediction_result,
                'confidence': pred.confidence,
                'image_path': pred.image_path,
                'timestamp': pred.created_at.isoformat()
            })
        
        return jsonify({
            'history': history,
            'total': predictions.total,
            'page': page,
            'per_page': per_page,
            'pages': predictions.pages
        }), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id_str = get_jwt_identity()
        user_id = int(user_id_str)
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'created_at': user.created_at.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'environment': os.getenv('FLASK_ENV', 'development'),
        'debug': os.getenv('FLASK_DEBUG', 'False'),
        'model_loaded': model is not None,
        'device': str(DEVICE)
    }), 200

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Endpoint to get model information"""
    return jsonify({
        'model_loaded': model is not None,
        'disease_classes': LABELS,
        'device': str(DEVICE),
        'model_path': app.config['MODEL_PATH']
    }), 200

@app.route('/api/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/config', methods=['GET'])
def config_check():
    """Endpoint to check current configuration (remove in production)"""
    return jsonify({
        'upload_folder': app.config['UPLOAD_FOLDER'],
        'max_content_length': app.config['MAX_CONTENT_LENGTH'],
        'database_uri': '***' if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI'] else app.config['SQLALCHEMY_DATABASE_URI'],
        'jwt_secret_set': bool(app.config['JWT_SECRET_KEY'] and app.config['JWT_SECRET_KEY'] != 'fallback-jwt-secret-key'),
        'model_loaded': model is not None
    }), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database tables created")
        print(f"Upload folder: {app.config['UPLOAD_FOLDER']}")
        print(f"Model folder: {app.config['MODEL_FOLDER']}")
        print(f"Model path: {app.config['MODEL_PATH']}")
        print(f"Model loaded: {model is not None}")
        print(f"JWT Secret set: {bool(app.config['JWT_SECRET_KEY'] and app.config['JWT_SECRET_KEY'] != 'fallback-jwt-secret-key')}")
    
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    
    print(f"Starting server on {host}:{port}")
    app.run(debug=True, host=host, port=port)