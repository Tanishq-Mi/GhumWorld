import { useState } from 'react';
import Toast from './Toast';
import api from '../api/axios';

const ReviewForm = ({ cityId = null, placeId = null, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    message: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.rating || !formData.message) {
      setToast({ message: 'Please fill all fields', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/reviews', {
        ...formData,
        cityId,
        placeId
      });

      setToast({ message: 'Thank you for your review!', type: 'success' });
      setFormData({ name: '', rating: 0, message: '' });
      
      if (onReviewSubmitted) {
        setTimeout(() => {
          onReviewSubmitted();
        }, 500);
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to submit review',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <button
          key={i}
          type="button"
          onClick={() => setFormData({ ...formData, rating: starValue })}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className={`text-3xl transition-all duration-200 ${
            starValue <= (hoveredRating || formData.rating)
              ? 'text-white scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]'
              : 'text-white/30'
          }`}
        >
          ★
        </button>
      );
    });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className="relative bg-white/10 backdrop-blur-2xl border border-white/20
                   rounded-2xl p-8 shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
      >
        {/* Accent Line */}
        <span className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-white/60" />

        <h3 className="text-2xl font-semibold text-white mb-8">
          Share Your Experience
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20
                         text-white placeholder-white/40
                         focus:outline-none focus:border-white/50
                         focus:ring-2 focus:ring-white/20 transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Rating</label>
            <div className="flex gap-3" onMouseLeave={() => setHoveredRating(0)}>
              {renderStars()}
            </div>
            {formData.rating > 0 && (
              <p className="text-white/50 text-sm mt-2">
                {formData.rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Review */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Your Review</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20
                         text-white placeholder-white/40
                         focus:outline-none focus:border-white/50
                         focus:ring-2 focus:ring-white/20 transition-all resize-none"
              placeholder="Share your experience..."
            />
            <p className="text-white/40 text-xs mt-1 text-right">
              {formData.message.length}/500
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold text-black
                       bg-white hover:bg-white/90
                       transition-all duration-300
                       shadow-[0_12px_40px_rgba(255,255,255,0.35)]
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
