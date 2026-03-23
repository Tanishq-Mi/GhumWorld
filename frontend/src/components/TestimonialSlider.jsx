import { useState, useEffect } from 'react';
import api from '../api/axios';

const TestimonialSlider = ({ cityId = null, limit = 6 }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [cityId]);

  const fetchReviews = async () => {
    try {
      const endpoint = cityId
        ? `/api/reviews/city/${cityId}`
        : `/api/reviews?limit=${limit}`;
      const response = await api.get(endpoint);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-white' : 'text-white/30'}
      >
        ★
      </span>
    ));
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[320px] h-[200px]
                       bg-white/5 backdrop-blur-xl border border-white/10
                       rounded-2xl p-6 animate-pulse"
          >
            <div className="h-4 bg-white/20 rounded w-28 mb-4" />
            <div className="h-4 bg-white/20 rounded w-20 mb-6" />
            <div className="h-20 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-white/60 py-10">
        <p>No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  /* ================= SLIDER ================= */
  return (
    <div className="relative">
      <div
        className="flex gap-8 overflow-x-auto pb-8
                   snap-x snap-mandatory scrollbar-hide px-2"
      >
        {reviews.map((review, index) => (
          <div
            key={review._id}
            style={{ animationDelay: `${index * 80}ms` }}
            className="snap-start flex-shrink-0 w-[320px] md:w-[360px]
                       bg-white/10 backdrop-blur-2xl
                       border border-white/15 rounded-2xl p-6
                       shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                       hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.9)]
                       transition-all duration-300
                       opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
          >
            {/* Soft top glow */}
            <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">
                {review.name}
              </h4>
              <div className="flex text-sm gap-0.5">
                {renderStars(review.rating)}
              </div>
            </div>

            {/* Message */}
            <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
              {review.message}
            </p>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between text-xs text-white/40">
              {review.cityId && (
                <span>📍 {review.cityId.name}</span>
              )}
              <span>
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Glass edge glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0
                         hover:opacity-100 transition-opacity
                         shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            />
          </div>
        ))}
      </div>

      {/* Animations + Scrollbar */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
