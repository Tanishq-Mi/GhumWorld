import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import CityCard from '../components/CityCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import TestimonialSlider from '../components/TestimonialSlider';
import ReviewForm from '../components/ReviewForm';
import api from '../api/axios';
import home from "../assets/home.jpg"

const Home = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [popularCities] = useState([
    'Mumbai',
    'Delhi',
    'Jaipur',
    'Goa',
    'Varanasi',
    'Kolkata'
  ]);

  useEffect(() => {
    fetchCities();
  }, []);

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
    navigate(`/city/${city._id || city.name}`);
  };

  const handlePopularCityClick = async (cityName) => {
    try {
      const city = cities.find(
        c => c.name.toLowerCase() === cityName.toLowerCase()
      );
      if (city) {
        navigate(`/city/${city._id || city.name}`);
      } else {
        const response = await api.get(`/api/cities/${cityName}`);
        navigate(`/city/${response.data._id || response.data.name}`);
      }
    } catch (error) {
      console.error('City not found:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${home})`
              // "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop')"
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_65%)]" />

        {/* Hero Glass */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.8rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.9)] text-center animate-[fadeUp_1s_ease-out_forwards]">

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
              GhumWorld
            </h1>

            <p className="text-white/60 max-w-2xl mx-auto mb-12">
           Discover places with their rich history, cultural significance, safety tips, and an authentic local vibe.
            </p>

            {/* ====== SAAS STYLE SEARCH BAR ====== */}
            <div className="relative max-w-3xl mx-auto">
              <div className="
                group
                bg-gradient-to-r from-white/10 via-white/5 to-white/10
                backdrop-blur-xl
                border border-white/15
                rounded-full
                px-5 py-4
                shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.9)]
                transition-all duration-300
              ">
                <SearchBar cities={cities} onCitySelect={handleCitySelect} />
              </div>

              {/* soft glow under search */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-white/10 blur-2xl opacity-40 pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* ================= POPULAR ================= */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0f1a] to-black" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            Most Visited Destinations
          </h2>

          <div className="flex gap-5 overflow-x-auto justify-start md:justify-center pb-4">
            {popularCities.map((cityName, index) => (
              <button
                key={cityName}
                onClick={() => handlePopularCityClick(cityName)}
                style={{ animationDelay: `${index * 80}ms` }}
                className="opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]
                  px-7 py-3 rounded-full
                  bg-white/5 backdrop-blur-lg border border-white/10
                  text-white/70 hover:text-white
                  hover:bg-white/10
                  hover:shadow-lg
                  transition-all"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ALL CITIES ================= */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_65%)]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold">Explore All Cities</h2>
            <p className="text-white/50 mt-3">
        Handpicked destinations from every corner of the country
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
                >
                  <LoadingSkeleton />
                </div>
              ))}
            </div>
          ) : cities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
              {cities.map((city, i) => (
                <div
                  key={city._id}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="opacity-0 animate-[fadeUp_0.8s_ease-out_forwards]"
                >
                  <CityCard city={city} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/50 py-24">
             No cities available right now. Please check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0f1a] to-black" />

        <div className="relative max-w-7xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
          <h2 className="text-3xl font-semibold text-center mb-12">
        What Our Travelers Are Saying
          </h2>
          <TestimonialSlider key={refreshReviews} />
        </div>
      </section>

      {/* ================= REVIEW ================= */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_65%)]" />

        <div className="relative max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
          <ReviewForm onReviewSubmitted={() => setRefreshReviews(prev => prev + 1)} />
        </div>
      </section>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default Home;
