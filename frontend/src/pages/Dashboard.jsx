import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import CityCard from '../components/CityCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popularCities] = useState([
    'Mumbai',
    'Delhi',
    'Jaipur',
    'Goa',
    'Varanasi',
    'Kolkata'
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCities();
  }, [user, navigate]);

  const fetchCities = async () => {
    try {
      const response = await api.get('/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    navigate(`/city/${city.name}`);
  };

  const handlePopularCityClick = async (cityName) => {
    try {
      const response = await api.get(`/api/cities/${cityName}`);
      navigate(`/city/${response.data.name}`);
    } catch (error) {
      alert('City not found');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white overflow-hidden">

      {/* ================= HERO CARD ================= */}
      <section className="relative w-full py-20 flex justify-center">
        <div className="relative w-[92%] max-w-7xl rounded-[2.5rem] overflow-hidden
                        shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

          <div
            className="absolute inset-0 bg-cover bg-center scale-105 animate-[slowZoom_25s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')"
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)]" />

          {/* WELCOME CENTER */}
          <div className="relative z-10 min-h-[45vh] flex flex-col items-center justify-center px-6 text-center animate-[fadeUp_1s_ease-out_forwards]">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20
                            rounded-2xl px-10 py-6 shadow-lg">
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2">
                Welcome back,
              </h1>
              <p className="text-3xl md:text-5xl font-semibold text-white">
                {user?.name}
              </p>
            </div>

            <p className="mt-6 text-white/60 max-w-xl">
              Continue your cinematic journey across breathtaking destinations.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEARCH (ATTACHED TO HERO) ================= */}
      <section className="px-4 -mt-20 relative z-20">
        <div className="max-w-5xl mx-auto rounded-[2rem]
                        bg-white/10 backdrop-blur-xl border border-white/15
                        shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                        px-4 py-6 md:px-8
                        animate-[fadeUp_0.9s_ease-out_forwards]">
          <SearchBar cities={cities} onCitySelect={handleCitySelect} />
        </div>
      </section>

      {/* ================= POPULAR CITIES ================= */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            Popular Destinations
          </h2>

          <div className="flex gap-4 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center pb-4">
            {popularCities.map((cityName, index) => (
              <button
                key={cityName}
                onClick={() => handlePopularCityClick(cityName)}
                style={{ animationDelay: `${index * 80}ms` }}
                className="shrink-0 opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]
                           px-7 py-3 rounded-full
                           bg-white/10 backdrop-blur-lg border border-white/20
                           text-white hover:bg-white hover:text-black
                           transition-all duration-300"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ALL CITIES ================= */}
      <section className="pb-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Explore All Cities
            </h2>
            <p className="text-white/50 mt-2">
              Discover destinations curated for unforgettable journeys
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]"
                >
                  <LoadingSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
              {cities.map((city, i) => (
                <div
                  key={city._id}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]
                             hover:-translate-y-2 transition-transform duration-300"
                >
                  <CityCard city={city} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
