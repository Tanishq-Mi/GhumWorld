import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SearchBar = ({ cities = [], onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city.name);
    setShowDropdown(false);
    if (onCitySelect) {
      onCitySelect(city);
    } else {
      navigate(`/api/city/${city.name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await api.get(`/api/cities/${searchTerm}`);
        navigate(`/api/city/${response.data.name}`);
      } catch (error) {
        alert('City not found. Please try another city.');
      }
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* ================= SEARCH BAR ================= */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="flex items-center w-full rounded-full
                     bg-white/10 backdrop-blur-2xl border border-white/20
                     shadow-[0_25px_80px_rgba(0,0,0,0.8)]
                     transition-all duration-300
                     focus-within:border-white/40
                     focus-within:shadow-[0_35px_100px_rgba(0,0,0,0.9)]"
        >
          {/* Icon */}
          <span className="pl-6 pr-2 text-white/60 text-lg">⌕</span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (filteredCities.length > 0) setShowDropdown(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowDropdown(false), 180);
            }}
            placeholder="Search destinations, cities, vibes…"
            className="flex-1 bg-transparent text-white placeholder-white/50
                       py-4 pr-4 focus:outline-none text-base md:text-lg"
          />

          {/* CTA */}
          <button
            type="submit"
            className="mr-2 px-6 py-2.5 rounded-full font-medium text-black
                       bg-white hover:bg-white/90
                       transition-all duration-300
                       shadow-[0_8px_30px_rgba(255,255,255,0.35)]"
          >
            Go
          </button>
        </div>
      </form>

      {/* ================= DROPDOWN ================= */}
      {showDropdown && filteredCities.length > 0 && (
        <div
          className="absolute z-30 w-full mt-3 rounded-2xl overflow-hidden
                     bg-white/10 backdrop-blur-2xl border border-white/20
                     shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                     animate-[fadeDown_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        >
          <div className="max-h-72 overflow-y-auto">
            {filteredCities.map((city, i) => (
              <button
                key={city._id}
                onClick={() => handleCitySelect(city)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="group w-full text-left px-6 py-4
                           text-white flex items-center gap-4
                           hover:bg-white/10 transition-all duration-200
                           opacity-0 animate-[fadeUp_0.4s_ease-out_forwards]"
              >
                {/* Dot */}
                <span className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  {city.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-6px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
