import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import api from '../../api/axios';

const AdminStats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setToast({ message: 'Failed to fetch statistics', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black px-4 py-12 flex items-center justify-center">
        <p className="text-white/60 animate-pulse tracking-wide">
          Loading live analytics…
        </p>
      </div>
    );
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-20 pb-6 border-b border-white/10 animate-[fadeUp_0.6s_ease-out_forwards]">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Platform Statistics
            </h1>
            <p className="text-white/60 mt-2">
              Live platform insights and activity
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur
                       border border-white/20 text-white/80
                       hover:bg-white/20 hover:text-white transition-all"
          >
            ← Dashboard
          </button>
        </div>

        {stats && (
          <>
            {/* ================= TRAFFIC STATS ================= */}
            <section className="mb-24">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                Traffic Overview
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  {
                    title: 'Visits Today',
                    value: stats.visits.today,
                    desc: 'Page views today',
                    icon: '📊'
                  },
                  {
                    title: 'This Week',
                    value: stats.visits.thisWeek,
                    desc: 'Page views this week',
                    icon: '📈'
                  },
                  {
                    title: 'All Time',
                    value: stats.visits.allTime,
                    desc: 'Total page views',
                    icon: '🌍'
                  }
                ].map((item, i) => (
                  <div
                    key={item.title}
                    style={{ animationDelay: `${i * 120}ms` }}
                    className="relative rounded-[2rem] p-10
                               bg-white/10 backdrop-blur-2xl border border-white/15
                               shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                               hover:-translate-y-2 transition-all duration-300
                               opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
                  >
                    {/* Soft Top Glow */}
                    <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <div className="text-4xl mb-6">{item.icon}</div>

                    <p className="text-sm text-white/60">{item.title}</p>
                    <p className="text-4xl font-semibold mt-2 tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= CONTENT STATS ================= */}
            <section className="mb-24">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                Content Overview
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  {
                    title: 'Total Cities',
                    value: stats.content.cities,
                    desc: 'Cities in database',
                    icon: '🏙️'
                  },
                  {
                    title: 'Total Places',
                    value: stats.content.places,
                    desc: 'Tourist places in database',
                    icon: '📍'
                  },
                  {
                    title: 'Avg / City',
                    value:
                      stats.content.cities > 0
                        ? Math.round(stats.content.places / stats.content.cities)
                        : 0,
                    desc: 'Places per city',
                    icon: '📊'
                  }
                ].map((item, i) => (
                  <div
                    key={item.title}
                    style={{ animationDelay: `${i * 120}ms` }}
                    className="relative rounded-[2rem] p-10
                               bg-white/10 backdrop-blur-2xl border border-white/15
                               shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                               hover:-translate-y-2 transition-all duration-300
                               opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
                  >
                    <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <div className="text-4xl mb-6">{item.icon}</div>
                    <p className="text-sm text-white/60">{item.title}</p>
                    <p className="text-4xl font-semibold mt-2 tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= INFO PANEL ================= */}
            <section className="max-w-4xl mx-auto animate-[fadeUp_0.8s_ease-out_forwards]">
              <div
                className="relative rounded-[2rem] p-12
                           bg-white/10 backdrop-blur-2xl border border-white/15
                           shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
              >
                <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <h2 className="text-2xl font-semibold mb-8">
                  About These Metrics
                </h2>

                <ul className="space-y-4 text-white/70">
                  {[
                    'Visit statistics are tracked on every page load',
                    'Statistics refresh automatically every 30 seconds',
                    'All visits are counted regardless of authentication',
                    'Content metrics reflect real-time database totals'
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-2 w-2 h-2 rounded-full bg-white/60" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </div>

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

export default AdminStats;
