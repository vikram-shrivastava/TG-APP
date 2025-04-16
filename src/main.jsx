import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import LoginPage from './components/login.jsx';
import SignupPage from './components/signup.jsx';
import TeacherDashboard from './components/TeacherDashboard.jsx';
import StudentTGForm from './components/StudentTGForm.jsx';
import Navbar from './components/navbar.jsx';

import { AuthProvider, useAuth, ProtectedRoute } from './components/AuthContext.jsx';

// Layout component with Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

// PublicRoute component: redirect if user is already authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

const AppWithAuth = () => (
  <Router>
    <Routes>
      {/* Public Routes (no Navbar) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      {/* Routes with Navbar */}
      <Route
        path="/"
        element={
          <Layout>
            <App />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <TeacherDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/studentform"
        element={
          <ProtectedRoute>
            <Layout>
              <StudentTGForm />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  </StrictMode>
);
