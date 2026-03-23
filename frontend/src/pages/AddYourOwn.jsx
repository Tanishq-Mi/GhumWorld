import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import api from '../api/axios';

const AddYourOwn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    placeName: '',
    message: ''
  });
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/contact', formData);
      setToast({
        message: 'Thank you for your suggestion! We will review it and get back to you soon.',
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        city: '',
        placeName: '',
        message: ''
      });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to submit. Please try again.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black py-20 px-4 overflow-hidden">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-white/10 backdrop-blur-lg border border-white/15
                     text-white hover:bg-white/20 transition-all"
        >
          ← Back to Home
        </button>

        {/* Glass Form Card */}
        <div
          className="bg-white/10 backdrop-blur-2xl border border-white/15
                     rounded-[2.5rem] p-10 md:p-14
                     shadow-[0_40px_100px_rgba(0,0,0,0.9)]
                     animate-[fadeUp_0.8s_ease-out_forwards]"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Add Your Own Place
          </h1>
          <p className="text-white/60 mb-10">
            Know a hidden gem? Share it with us and help travelers discover amazing places.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* INPUT */}
            {[
              { label: 'Your Name *', key: 'name', type: 'text', placeholder: 'Enter your name' },
              { label: 'Email *', key: 'email', type: 'email', placeholder: 'your.email@example.com' },
              { label: 'City', key: 'city', type: 'text', placeholder: 'Which city is this place in?' },
              { label: 'Place Name', key: 'placeName', type: 'text', placeholder: 'Name of the place' }
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-white/80 mb-2 text-sm">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl
                             bg-black/40 backdrop-blur border border-white/15
                             text-white placeholder-white/40
                             focus:outline-none focus:border-white/40 transition-all"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {/* MESSAGE */}
            <div>
              <label className="block text-white/80 mb-2 text-sm">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl
                           bg-black/40 backdrop-blur border border-white/15
                           text-white placeholder-white/40
                           focus:outline-none focus:border-white/40 transition-all"
                placeholder="Tell us why this place is special..."
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-semibold
                         bg-white text-black
                         hover:scale-[1.02] transition-all
                         shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Suggestion'}
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AddYourOwn;
