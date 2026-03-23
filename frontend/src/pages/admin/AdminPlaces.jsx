import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import api from '../../api/axios';

const AdminPlaces = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    cityId: '',
    name: '',
    images: [],
    history: '',
    importance: '',
    howToReach: '',
    mapLink: '',
    safetyTips: []
  });
  const [safetyTipInput, setSafetyTipInput] = useState('');

  useEffect(() => {
    fetchPlaces();
    fetchCities();
  }, []);

  const fetchPlaces = async () => {
    try {
      const citiesResponse = await api.get('/api/cities');
      const allPlaces = [];

      for (const city of citiesResponse.data) {
        try {
          const placesResponse = await api.get(`/api/places/city/${city._id}`);
          allPlaces.push(...placesResponse.data);
        } catch (error) {
          console.error(`Error fetching places for ${city.name}:`, error);
        }
      }

      setPlaces(allPlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
      setToast({ message: 'Failed to fetch places', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await api.get('/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const data = new FormData();
    files.forEach(file => data.append('images', file));

    try {
      const response = await api.post('/api/admin/upload/images', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...response.data.imageUrls]
      }));

      setToast({ message: 'Images uploaded successfully', type: 'success' });
    } catch (error) {
      console.error("Upload error:", error);
      setToast({ message: 'Failed to upload images', type: 'error' });
    }
  };

  const handleAddSafetyTip = () => {
    if (safetyTipInput.trim()) {
      setFormData({
        ...formData,
        safetyTips: [...formData.safetyTips, safetyTipInput.trim()]
      });
      setSafetyTipInput('');
    }
  };

  const handleRemoveSafetyTip = (index) => {
    setFormData({
      ...formData,
      safetyTips: formData.safetyTips.filter((_, i) => i !== index)
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlace) {
        await api.put(`/api/admin/place/${editingPlace._id}`, formData);
        setToast({ message: 'Place updated successfully', type: 'success' });
      } else {
        await api.post('/api/admin/place', formData);
        setToast({ message: 'Place created successfully', type: 'success' });
      }
      setShowForm(false);
      setEditingPlace(null);
      setFormData({
        cityId: '',
        name: '',
        images: [],
        history: '',
        importance: '',
        howToReach: '',
        mapLink: '',
        safetyTips: []
      });
      fetchPlaces();
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Operation failed', type: 'error' });
    }
  };

  const handleEdit = (place) => {
    setEditingPlace(place);
    setFormData({
      cityId: place.cityId?._id || place.cityId || '',
      name: place.name || '',
      images: place.images || [],
      history: place.history || '',
      importance: place.importance || '',
      howToReach: place.howToReach || '',
      mapLink: place.mapLink || '',
      safetyTips: place.safetyTips || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;

    try {
      await api.delete(`/api/admin/place/${id}`);
      setToast({ message: 'Place deleted successfully', type: 'success' });
      fetchPlaces();
    } catch (error) {
      setToast({ message: 'Failed to delete place', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white px-4 py-14">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-14 pb-6 border-b border-white/10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Manage <span className="text-white/80">Places</span>
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-5 py-2 rounded-full bg-white/5 backdrop-blur
                         border border-white/15 text-white/70
                         hover:text-white hover:border-white/40 transition-all"
            >
              ← Dashboard
            </button>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingPlace(null);
                setFormData({
                  cityId: '',
                  name: '',
                  images: [],
                  history: '',
                  importance: '',
                  howToReach: '',
                  mapLink: '',
                  safetyTips: []
                });
              }}
              className="px-7 py-2 rounded-full font-semibold text-black
                         bg-white hover:bg-white/90 transition-all
                         shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              {showForm ? 'Cancel' : '+ Add Place'}
            </button>
          </div>
        </div>

        {/* ================= FORM PANEL ================= */}
        {showForm && (
          <div className="mb-20 animate-[fadeUp_0.6s_ease-out_forwards]">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-[2rem]
                            shadow-[0_40px_120px_rgba(0,0,0,0.9)] p-10">
              <h2 className="text-2xl font-semibold mb-10">
                {editingPlace ? 'Edit Place' : 'Add New Place'}
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* City */}
                <div>
                  <label className="text-sm text-white/60">City</label>
                  <select
                    value={formData.cityId}
                    onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                    required
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>{city.name}</option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="text-sm text-white/60">Place Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  />
                </div>

                {/* Images */}
                <div className="md:col-span-2">
                  <label className="text-sm text-white/60">Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2 text-sm text-white/60 file:bg-white file:text-black file:rounded-full file:border-0 file:px-5 file:py-2"
                  />

                  {formData.images.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.images.map((img, i) => (
                        <div key={i} className="relative rounded-xl overflow-hidden border border-white/10">
                          <img src={img} className="w-full h-28 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition text-red-400 text-xl"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Textareas */}
                {['history','importance','howToReach'].map((key) => (
                  <div key={key} className="md:col-span-2">
                    <label className="text-sm text-white/60 capitalize">{key.replace(/([A-Z])/g,' $1')}</label>
                    <textarea
                      rows={4}
                      value={formData[key]}
                      onChange={(e)=>setFormData({...formData,[key]:e.target.value})}
                      className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white"
                    />
                  </div>
                ))}

                {/* Map */}
                <div className="md:col-span-2">
                  <label className="text-sm text-white/60">Google Map Embed Link</label>
                  <input
                    value={formData.mapLink}
                    onChange={(e)=>setFormData({...formData,mapLink:e.target.value})}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white"
                  />
                </div>

                {/* Safety Tips */}
                <div className="md:col-span-2">
                  <label className="text-sm text-white/60">Safety Tips</label>
                  <div className="flex gap-3 mt-2">
                    <input
                      value={safetyTipInput}
                      onChange={(e)=>setSafetyTipInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white"
                    />
                    <button type="button" onClick={handleAddSafetyTip}
                      className="px-6 rounded-full bg-white text-black font-medium">
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.safetyTips.map((tip,i)=>(
                      <span key={i} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm">
                        {tip}
                        <button onClick={()=>handleRemoveSafetyTip(i)} className="ml-2 text-red-400">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <button className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:scale-[1.02] transition">
                    {editingPlace ? 'Update Place' : 'Create Place'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ================= PLACE GRID ================= */}
        {loading ? (
          <p className="text-white/60">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {places.map((place,i)=>(
              <div key={place._id}
                style={{animationDelay:`${i*80}ms`}}
                className="group relative rounded-[2rem] overflow-hidden bg-white/10 backdrop-blur-xl border border-white/15
                           shadow-[0_30px_90px_rgba(0,0,0,0.9)] hover:-translate-y-2 transition-all
                           opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]">

                {place.images?.[0] && (
                  <img src={place.images[0]} className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"/>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>

                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-semibold">{place.name}</h3>
                  <p className="text-sm text-white/60">{place.cityId?.name}</p>

                  <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={()=>handleEdit(place)}
                      className="px-4 py-1.5 rounded-full bg-white text-black text-sm">
                      Edit
                    </button>
                    <button onClick={()=>handleDelete(place._id)}
                      className="px-4 py-1.5 rounded-full border border-red-500 text-red-400 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeUp {
          0% { opacity:0; transform:translateY(30px); }
          100% { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminPlaces;
