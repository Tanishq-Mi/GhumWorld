import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Toast from '../components/Toast';
import api from '../api/axios';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchPlaceDetails();
  }, [id]);

  const fetchPlaceDetails = async () => {
    try {
      const response = await api.get(`/api/places/${id}`);
      setPlace(response.data);
    } catch (error) {
      console.error('Error fetching place details:', error);
      setToast({ message: 'Place not found', type: 'error' });
      setTimeout(() => navigate('/'), 2000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!place) {
    return null;
  }

  const processedImages = place.images || [];
  const heroImage = processedImages[0];
  const getOpenMapLink = (embedUrl) => {
  try {
    if (!embedUrl.includes("/maps/embed")) return embedUrl;

    const lngMatch = embedUrl.match(/!2d([-.\d]+)/);
    const latMatch = embedUrl.match(/!3d([-.\d]+)/);

    if (!latMatch || !lngMatch) return embedUrl;

    const lat = latMatch[1];
    const lng = lngMatch[1];

    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  } catch (err) {
    return embedUrl;
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

{/* ================= HERO ================= */}
<section className="relative w-full py-20 flex justify-center animate-[fadeHero_1s_ease-out_forwards]">

  {/* HERO CARD (ROUNDED IMAGE HOLDER) */}
  <div className="relative w-[92%] max-w-7xl rounded-[2.5rem] overflow-hidden
                  shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

    {heroImage && (
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
    )}

    {/* overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

    {/* Back Button */}
    <button
      onClick={() =>
        navigate(place.cityId?._id ? `/city/${place.cityId._id}` : '/')
      }
      className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full
                 bg-white/10 backdrop-blur-lg border border-white/15
                 text-white hover:bg-white/20 transition-all flex items-center gap-2"
    >
      ← {place.cityId?.name || 'Back'}
    </button>

    {/* CENTER TITLE */}
    <div className="relative z-10 min-h-[65vh] flex items-center justify-center px-6">
      <div
        className="bg-white/10 backdrop-blur-lg border border-white/20
                   rounded-2xl px-10 py-5 shadow-lg
                   animate-[fadeUp_1s_ease-out_forwards]"
      >
        <h1 className="text-3xl md:text-5xl font-semibold text-white text-center">
          {place.name}
        </h1>
      </div>
    </div>

  </div>
</section>
{/* ================= IMAGE GALLERY (ATTACHED TO HERO) ================= */}
{processedImages.length > 0 && (
  <section className="px-4 -mt-24 pb-24 relative z-20">
    <div
      className="max-w-6xl mx-auto rounded-[2rem] overflow-hidden
                 bg-white/10 backdrop-blur-xl border border-white/15
                 shadow-[0_40px_100px_rgba(0,0,0,0.9)]
                 animate-[fadeUp_0.9s_ease-out_forwards]"
    >
      <ImageCarousel images={processedImages} />
    </div>
  </section>
)}



      {/* ================= INFO ================= */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid gap-10">

          {/* History */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-8
                          border border-white/15
                          shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                          animate-[fadeUp_0.8s_ease-out_forwards]">
            <h2 className="text-xl font-semibold mb-4 text-white">History</h2>
            <p className="text-white/70 leading-relaxed">{place.history}</p>
          </div>

          {/* Importance */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-8
                          border border-white/15
                          shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                          animate-[fadeUp_0.9s_ease-out_forwards]">
            <h2 className="text-xl font-semibold mb-4 text-white">Importance</h2>
            <p className="text-white/70 leading-relaxed">{place.importance}</p>
          </div>

          {/* How to Reach */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-8
                          border border-white/15
                          shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                          animate-[fadeUp_1s_ease-out_forwards]">
            <h2 className="text-xl font-semibold mb-4 text-white">How to Reach</h2>
            <p className="text-white/70 leading-relaxed whitespace-pre-line">
              {place.howToReach}
            </p>
          </div>

          {/* Safety Tips */}
          {place.safetyTips && place.safetyTips.length > 0 && (
            <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-8
                            border border-white/15
                            shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                            animate-[fadeUp_1.1s_ease-out_forwards]">
              <h2 className="text-xl font-semibold mb-5 text-white">
                Safety Tips
              </h2>
              <ul className="space-y-3">
                {place.safetyTips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-black/40 border border-white/10 p-4 rounded-xl"
                  >
                    <span className="text-white/70 mt-1">⚠</span>
                    <span className="text-white/70">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ================= MAP ================= */}
      {place.mapLink && (
        <section className="px-4 pb-28">
          <div
            className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden
                       bg-white/10 backdrop-blur-2xl border border-white/15
                       shadow-[0_40px_100px_rgba(0,0,0,0.9)]
                       animate-[fadeUp_1.2s_ease-out_forwards]"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Location
              </h2>
            </div>

            <div className="w-full h-[420px]">
              <iframe
                src={place.mapLink}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${place.name}`}
              ></iframe>
            </div>

            <div className="p-6 text-right">
  <a
    href={getOpenMapLink(place.mapLink)}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/80 hover:underline transition-colors"
  >
    Open in Google Maps →
  </a>
</div>


          </div>
        </section>
      )}

      {/* Animations */}
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

export default PlaceDetails;
