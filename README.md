 BookShelf 📚

BookShelf is a minimal full-stack React.js frontend & Node backend powered bookstore app for browsing and buying books online.

 Features
- 🔐 User authentication with JWT
- 🛒 Add to cart & checkout
- 💳 PayPal payment integration
- 🧾 Order history
- ⭐ Admin dashboard for user, product & order management
- 🌐 Fully responsive design

 Tech Stack
 
Frontend: React.js, Redux, React-Bootstrap  
Backend: Node.js, Express.js, MongoDB, Mongoose  
Auth: JWT (JSON Web Tokens)  
Payment: PayPal REST API

 Setup
```
# Backend
cd backend
npm install
npm run server

# Frontend
cd ../frontend
npm install
npm start

Environment
Create .env files in backend and frontend:

backend/.env

MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_id
PORT=5000


frontend/.env

REACT_APP_API_BASE=http://localhost:5000


# Start backend
npm run server

# Start frontend
npm start
License
MIT

Developed by Anurudha







ChatGPT can make mistakes. Check important info. See Cookie Preferences.


