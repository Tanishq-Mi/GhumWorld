import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Toast from '../components/Toast';
import TestimonialSlider from '../components/TestimonialSlider';
import ReviewForm from '../components/ReviewForm';
import api from '../api/axios';

const CityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [refreshReviews, setRefreshReviews] = useState(0);

  useEffect(() => {
    fetchCityDetails();
  }, [id]);

  const fetchCityDetails = async () => {
    try {
      const response = await api.get(`/api/cities/${id}`);
      setCity(response.data);

      if (response.data._id) {
        const placesResponse = await api.get(`/api/places/city/${response.data._id}`);
        setPlaces(placesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching city details:', error);
      setToast({ message: 'City not found', type: 'error' });
      setTimeout(() => navigate('/'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const heroImageUrl = city?.heroImage || null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!city) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ================= HERO CARD ================= */}
      <section className="relative w-full py-20 flex justify-center animate-[fadeHero_1s_ease-out_forwards]">
        <div className="relative w-[92%] max-w-7xl rounded-[2.5rem] overflow-hidden
                        shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

          {heroImageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${heroImageUrl})` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full
                       bg-white/10 backdrop-blur-lg border border-white/15
                       text-white hover:bg-white/20 transition-all flex items-center gap-2"
          >
            ← Back
          </button>

          {/* CENTER TITLE */}
          <div className="relative z-10 min-h-[65vh] flex items-center justify-center px-6">
            <div
              className="bg-white/10 backdrop-blur-lg border border-white/20
                         rounded-2xl px-10 py-5 shadow-lg
                         animate-[fadeUp_1s_ease-out_forwards]"
            >
              <h1 className="text-3xl md:text-5xl font-semibold text-white text-center">
                {city.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMAGE CAROUSEL (ATTACHED TO HERO) ================= */}
      {city.images && city.images.length > 0 && (
        <section className="px-4 -mt-24 pb-24 relative z-20">
          <div
            className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden
                       bg-white/10 backdrop-blur-xl border border-white/15
                       shadow-[0_40px_100px_rgba(0,0,0,0.9)]
                       animate-[fadeUp_0.9s_ease-out_forwards]"
          >
            <ImageCarousel images={city.images} />
          </div>
        </section>
      )}

      {/* ================= CITY INFO ================= */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid gap-10">

          {[
            { title: 'History', text: city.history },
            { title: 'Importance', text: city.importance },
            { title: 'Why Visit', text: city.whyVisit },
            { title: 'How to Reach', text: city.howToReach }
          ].map((item, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 80}ms` }}
              className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-8
                         border border-white/15
                         shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                         animate-[fadeUp_0.8s_ease-out_forwards]"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                {item.title}
              </h2>
              <p className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
                {item.text}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= TOURIST PLACES ================= */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Tourist Places
            </h2>
          </div>

          {places.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {places.map((place, i) => {
                const placeImageUrl = place.images?.[0] || null;

                return (
                  <div
                    key={place._id}
                    onClick={() => navigate(`/place/${place._id}`)}
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="group relative rounded-[2rem] overflow-hidden cursor-pointer
                               bg-white/5 backdrop-blur-xl border border-white/10
                               shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                               hover:-translate-y-2 transition-all duration-300
                               opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
                  >
                    {placeImageUrl && (
                      <img
                        src={placeImageUrl}
                        alt={place.name}
                        className="w-full h-64 object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/400x300/111111/ffffff?text=' +
                            place.name;
                        }}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white">
                        {place.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-white/50 py-12">
              No tourist places added yet.
            </div>
          )}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      {city && city._id && (
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-2xl
                          border border-white/10 rounded-[3rem]
                          p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
            <h2 className="text-3xl font-semibold text-center mb-12">
              What Travelers Say About {city.name}
            </h2>
            <TestimonialSlider key={refreshReviews} cityId={city._id} />
          </div>
        </section>
      )}

      {/* ================= REVIEW FORM ================= */}
      {city && city._id && (
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl
                          border border-white/10 rounded-[2.5rem]
                          p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
            <ReviewForm
              cityId={city._id}
              onReviewSubmitted={() => setRefreshReviews(prev => prev + 1)}
            />
          </div>
        </section>
      )}

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeHero {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CityDetails;
