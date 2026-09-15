# Expense Tracker — Django REST API + React

A full-stack personal expense tracking app. Users register, log in, and manage
their own expenses, categorized and summarized on a dashboard.

## Features
- JWT-based authentication (register, login, protected routes)
- Full CRUD on expenses (create, read, update, delete)
- Expense categorization (Food, Travel, Rent, etc.)
- Filtering by category, month, and year via query params
- Dashboard summary: total spend + per-category breakdown
- Each user only sees and modifies their own data

## Tech Stack
- **Backend:** Python, Django, Django REST Framework, SimpleJWT, SQLite
- **Frontend:** React, React Router, Axios

## Project Structure
```
expense-tracker/
├── backend/
│   ├── expense_tracker/     # Django project settings, urls
│   ├── expenses/            # models, serializers, views, urls
│   └── manage.py
└── frontend/
    ├── src/
    │   ├── components/       # Login, Register, Dashboard, ExpenseForm, ExpenseList, Summary
    │   ├── api.js             # Axios instance with JWT interceptor
    │   └── App.js
    └── package.json
```

## Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate      # venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # optional, for /admin
python manage.py runserver
```
API runs at `http://localhost:8000/api/`.

### Frontend
```bash
cd frontend
npm install
npm start
```
App runs at `http://localhost:3000`.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Create a new account |
| POST | `/api/token/` | Log in, get JWT access + refresh tokens |
| POST | `/api/token/refresh/` | Refresh an expired access token |
| GET/POST | `/api/expenses/` | List / create expenses |
| GET/PUT/DELETE | `/api/expenses/<id>/` | Retrieve / update / delete one expense |
| GET/POST | `/api/categories/` | List / create categories |
| GET | `/api/summary/` | Total spend + per-category breakdown |

## Possible Extensions
- Add pagination to the expense list for large datasets
- Add a monthly spending chart (e.g. with Chart.js)
- Add budget limits per category with alerts
- Deploy backend on Render/Railway and frontend on Vercel/Netlify
