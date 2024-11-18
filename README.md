# 🏋️ Exercise Tracker

A sleek and efficient app for tracking your daily exercises, built with **React**, **Node.js**, and **MongoDB**. Stay on top of your fitness goals with an intuitive interface and robust backend support.

---

## 🚀 Features

- 📅 **Log Your Workouts**: Easily add exercises with type, duration, and date.
- 📊 **Track Progress**: Review your history and identify trends in your fitness journey.
- 🔍 **Filter and Search**: Find exercises by type, date, or custom criteria.
- 🔗 **RESTful API Integration**: Backend with seamless communication for data handling.
- 🖌️ **Responsive Design**: Works beautifully on all devices—desktop, tablet, or mobile.
- ✅ **Comprehensive Testing**: Ensures a robust and bug-free application.

---

## 🛠️ Technologies Used

| Frontend       | Backend       | Database  | Testing Framework  |
|----------------|---------------|-----------|---------------------|
| React (Vite)   | Node.js       | MongoDB   | Jest, React Testing Library  |
| Tailwind CSS   | Express.js    | Mongoose  | Supertest (for API testing)  |

---

## 🌟 Live Demo

👉 [Check out the live demo](https://shivarajskit/)

---

## 🏗️ Installation and Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud-based)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shivarajskit/Daily-Exercise-Tracker.git
   cd daily-exercise-tracker
   ```

2. **Install dependencies**:
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGO_URI=<Your MongoDB connection string>
     PORT=5000
     ```

4. **Start the backend server**:
   ```bash
   cd backend
   npm run start
   ```

5. **Start the frontend**:
   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Run tests**:
   ```bash
   # Backend API tests
   cd backend
   npm run test

   # Frontend component tests
   cd ../frontend
   npm run test
   ```

7. **Access the app**:
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Folder Structure

```
daily-exercise-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── __tests__/   # Backend API tests (Supertest)
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── __tests__/   # Frontend component tests (Jest)
│   └── vite.config.js
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Make your changes and commit them.
4. Open a pull request for review.

---

## 📝 License

This project is currently private.

---

## 📧 Contact

Have questions or want to collaborate? Reach out:
- **Email**: shivarajskit@gmail.com
- **GitHub**: [shivarajskit](https://github.com/shivarajskit)
- **Website**: [Shivaraj Srinivas](https://www.shivarajsrinivas.me/)

---