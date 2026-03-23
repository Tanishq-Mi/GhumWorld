import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import PlaceDetails from './pages/PlaceDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCities from './pages/admin/AdminCities';
import AdminPlaces from './pages/admin/AdminPlaces';
import AdminStats from './pages/admin/AdminStats';
import AddYourOwn from './pages/AddYourOwn';
import Footer from './components/Footer';

// Admin Protected Route Component
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#d4af37] text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (

      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/city/:id" element={<CityDetails />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/add-your-own" element={<AddYourOwn />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/cities"
            element={
              <AdminRoute>
                <AdminCities />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/places"
            element={
              <AdminRoute>
                <AdminPlaces />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <AdminRoute>
                <AdminStats />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </div>

  );
}

export default App;
