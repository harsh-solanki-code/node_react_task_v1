// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
import Register from './pages/Register';
// import Booking from './pages/Booking';
// import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />

        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
