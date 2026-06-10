import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useState } from 'react';

const C = {
  offWhite: "#f0f4ff", FB: "'Barlow', sans-serif"
};

// Route guards
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  return user?.role === 'admin' ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  return !user ? children : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />;
};

function App() {
  const [toast, setToast] = useState(null);

  return (
    <div style={{ fontFamily: C.FB, background: C.offWhite, minHeight: "100vh", width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
        .svc-card:hover { transform: translateY(-7px) !important; box-shadow: 0 22px 52px rgba(240,125,0,0.16) !important; border-color: rgba(240,125,0,0.35) !important; }

        /* ========== MOBILE FULL WIDTH FIX ========== */
        * { box-sizing: border-box; }
        html, body, #root { 
          width: 100% !important; 
          max-width: 100% !important; 
          margin: 0 !important; 
          padding: 0 !important;
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          [style*="max-width"] { max-width: 100% !important; }
          [style*="width: 50%"] { width: 100% !important; }
          [style*="width: 600px"] { width: 100% !important; }
          [style*="width: 500px"] { width: 100% !important; }
          [style*="width: 400px"] { width: 100% !important; }
          section, div { max-width: 100vw !important; }
        }
      `}</style>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;