import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import api from '../../api/axios';

const AdminCities = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    heroImage: '',
    history: '',
    importance: '',
    whyVisit: '',
    howToReach: ''
  });

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await api.get('/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setToast({ message: 'Failed to fetch cities', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const response = await api.post("/api/admin/upload/image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData(prev => ({
        ...prev,
        heroImage: response.data.imageUrl
      }));

      setToast({ message: "Image uploaded successfully", type: "success" });
    } catch (error) {
      console.error("Upload error:", error.response?.data || error);
      setToast({ message: "Failed to upload image", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCity) {
        await api.put(`/api/admin/city/${editingCity._id}`, formData);
        setToast({ message: 'City updated successfully', type: 'success' });
      } else {
        await api.post('/api/admin/city', formData);
        setToast({ message: 'City created successfully', type: 'success' });
      }
      setShowForm(false);
      setEditingCity(null);
      setFormData({
        name: '',
        heroImage: '',
        history: '',
        importance: '',
        whyVisit: '',
        howToReach: ''
      });
      fetchCities();
    } catch (error) {
      console.error("City create error:", error.response?.data);
      setToast({
        message: error.response?.data?.message || "Failed to create city",
        type: "error"
      });
    }
  };

  const handleEdit = (city) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      heroImage: city.heroImage || '',
      history: city.history || '',
      importance: city.importance || '',
      whyVisit: city.whyVisit || '',
      howToReach: city.howToReach || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this city?')) return;

    try {
      await api.delete(`/api/admin/city/${id}`);
      setToast({ message: 'City deleted successfully', type: 'success' });
      fetchCities();
    } catch (error) {
      setToast({ message: 'Failed to delete city', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white px-4 py-14">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Manage Cities
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-5 py-2 rounded-full
                         bg-white/10 backdrop-blur-lg border border-white/15
                         text-white hover:bg-white/20 transition-all"
            >
              ← Dashboard
            </button>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingCity(null);
                setFormData({
                  name: '',
                  heroImage: '',
                  history: '',
                  importance: '',
                  whyVisit: '',
                  howToReach: ''
                });
              }}
              className="px-6 py-2 rounded-full font-semibold
                         bg-white text-black hover:scale-[1.05]
                         transition-all shadow-lg"
            >
              {showForm ? 'Cancel' : '+ Add City'}
            </button>
          </div>
        </div>

        {/* ================= FORM PANEL ================= */}
        {showForm && (
          <div className="mb-16 animate-[fadeUp_0.6s_ease-out_forwards]">
            <div
              className="bg-white/10 backdrop-blur-2xl border border-white/15
                         rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] p-10"
            >
              <h2 className="text-2xl font-semibold mb-8">
                {editingCity ? 'Edit City' : 'Add New City'}
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-7">

                {/* Name */}
                <div>
                  <label className="block text-white/70 mb-2 text-sm">City Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl
                               bg-black/40 border border-white/15
                               text-white focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-white/70 mb-2 text-sm">Hero Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-white/70
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:bg-white file:text-black
                               hover:file:bg-gray-200 transition-all"
                  />

                  {formData.heroImage && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      <img
                        src={formData.heroImage}
                        alt="Preview"
                        className="w-full h-44 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Text Areas */}
                {[
                  { label: 'History', key: 'history' },
                  { label: 'Importance', key: 'importance' },
                  { label: 'Why Visit', key: 'whyVisit' },
                  { label: 'How to Reach', key: 'howToReach' }
                ].map((field) => (
                  <div key={field.key} className="md:col-span-2">
                    <label className="block text-white/70 mb-2 text-sm">{field.label}</label>
                    <textarea
                      rows={4}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl
                                 bg-black/40 border border-white/15
                                 text-white focus:outline-none focus:border-white/40 transition-all"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold
                               bg-white text-black hover:scale-[1.02]
                               transition-all shadow-lg"
                  >
                    {editingCity ? 'Update City' : 'Create City'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= CITY GRID ================= */}
        {loading ? (
          <p className="text-white/50">Loading...</p>
        ) : cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {cities.map((city, i) => (
              <div
                key={city._id}
                style={{ animationDelay: `${i * 80}ms` }}
                className="group relative rounded-[2rem] overflow-hidden cursor-pointer
                           bg-white/5 backdrop-blur-xl border border-white/10
                           shadow-[0_30px_80px_rgba(0,0,0,0.8)]
                           hover:-translate-y-2 transition-all duration-300
                           opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
              >
                {city.heroImage && (
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/400x300/111111/ffffff?text=' +
                        city.name;
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{city.name}</h3>

                  <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(city)}
                      className="px-4 py-1.5 rounded-full text-sm font-medium
                                 bg-white text-black hover:bg-gray-200 transition-all"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(city._id)}
                      className="px-4 py-1.5 rounded-full text-sm font-medium
                                 border border-red-500/60 text-red-400
                                 hover:bg-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/50">No cities found</p>
        )}
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

export default AdminCities;
