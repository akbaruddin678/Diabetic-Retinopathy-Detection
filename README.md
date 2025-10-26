# 👁️ Diabetic Retinopathy Detection

A comprehensive **Deep Learning solution** for **Diabetic Retinopathy screening** featuring:
- 🧠 AI-powered backend (Flask + PyTorch)
- 📱 Mobile app (React Native / Expo)
- 💻 Web platform (React + Vite)

---

## 🏗️ Project Structure

```
eyedisease/
├── backend/           # Flask API Server
├── EyeCarePro/        # React Native Mobile App
├── EyeCareWebsite/    # React Web Application
└── README.md
```

---

## 🚀 Quick Start

### 🧩 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **Git** (for version control)

---

### 1️⃣ Backend Setup (Flask API)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Start the backend server
python app.py
```

**The backend will run on:**  
👉 [http://localhost:5000](http://localhost:5000)

---

### 2️⃣ Mobile App Setup (React Native)

```bash
# Navigate to mobile app directory
cd EyeCarePro

# Install dependencies
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..

# Start development server
npm start

# Run on specific platform
npm run android     # Android
npm run ios         # iOS (macOS only)
```

---

### 3️⃣ Website Setup (React + Vite)

```bash
# Navigate to website directory
cd EyeCareWebsite

# Install dependencies
npm install

# Start development server
npm run dev
```

**The website will run on:**  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Application URLs

| Component | URL |
|------------|------|
| **Backend API** | http://localhost:5000 |
| **Website** | http://localhost:3000 |
| **Mobile App** | Expo Dev Client (Scan QR code in terminal) |

---

## 🔧 Environment Configuration

### Backend (`backend/.env`)

```env
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=sqlite:///eyecare.db
UPLOAD_FOLDER=uploads
MODEL_FOLDER=model
FLASK_ENV=development
```

### Mobile App & Website (`.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🗄️ Database Setup

Default: **SQLite**

To use **PostgreSQL**, update `.env` in backend:

```env
DATABASE_URL=postgresql://username:password@localhost/eyecare_db
```

Install PostgreSQL adapter:

```bash
pip install psycopg2-binary
```

---

## 🤖 AI Model Setup

1. Place your trained model file in `backend/model/`
2. The model should be named:
   ```
   best_finetuned_resnet101.pth
   ```
3. Ensure compatibility with **PyTorch 2.0.1**

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| POST | `/api/predict` | Image prediction *(JWT required)* |
| GET | `/api/history` | Get user prediction history |
| GET | `/api/profile` | Fetch user profile |
| GET | `/api/health` | Health check |

---

## 🛠️ Development Workflow

### Backend Development

```bash
cd backend
venv\Scripts\activate  # Activate virtual environment
python app.py          # Run backend server
```

### Mobile App Development

```bash
cd EyeCarePro
npm start              # Start Expo dev server
```

### Website Development

```bash
cd EyeCareWebsite
npm run dev            # Start Vite dev server
```

---

## 🐛 Troubleshooting

| Issue | Possible Fix |
|--------|---------------|
| **Port already in use** | Change ports in `.env` |
| **Module not found** | Run `npm install` or `pip install -r requirements.txt` |
| **Database errors** | Delete the existing database file and reinitialize |
| **Model loading issues** | Verify model file path and PyTorch version |

### Backend Logs
Check Flask console output for request and error logs.

### Mobile App Logs
Use **Expo Dev Tools** or browser console for debugging.

---

## 📦 Production Deployment

### Backend (Flask + Gunicorn)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend (Website / App)

```bash
# Build for production
npm run build
```

Serve with **Nginx** or any static file host.

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Push your branch  
5. Create a Pull Request  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🆘 Support

If you face any issues:

- Review the **Troubleshooting** section
- Check your **logs** (Flask or Expo)
- Create an **issue** in the repository

---

## 🧰 Additional Setup Files

### Backend: `backend/.env.example`

```env
SECRET_KEY=your-super-secret-key-change-this
JWT_SECRET_KEY=your-jwt-secret-key-change-this
DATABASE_URL=sqlite:///eyecare.db
UPLOAD_FOLDER=uploads
MODEL_FOLDER=model
MAX_CONTENT_LENGTH=16777216
FLASK_ENV=development
FLASK_DEBUG=True
HOST=0.0.0.0
PORT=5000
```

### Backend: Placeholder File

`backend/model/.gitkeep`

```text
# This file ensures the model directory is tracked by git.
# Add your model files here (excluded via .gitignore)
```

---

## ✅ Summary of Setup

This setup provides:

- 📁 Complete `.gitignore` for all three projects  
- 📚 Detailed **README** with setup & troubleshooting  
- ⚙️ Ready-to-use **environment templates**  
- 🧑‍💻 Clear **development workflow** for all components  
- 🔐 Proper **backend + frontend integration**

---

**Developed with ❤️ to prevent blindness through AI-powered early detection.**
