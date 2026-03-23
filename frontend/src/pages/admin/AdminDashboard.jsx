import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black text-white px-4 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= HERO HEADER ================= */}
        <div className="text-center mb-20 animate-[fadeUp_0.8s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-white/60 mt-4 text-lg">
            Content Management Center
          </p>

          <div className="mt-8 h-[1px] w-56 mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* ================= MAIN ACTION CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {[
            {
              to: '/admin/cities',
              title: 'Cities',
              icon: '🏙️',
              desc: 'Manage cities and their detailed information'
            },
            {
              to: '/admin/places',
              title: 'Places',
              icon: '📍',
              desc: 'Manage tourist places within each city'
            },
            {
              to: '/admin/stats',
              title: 'Statistics',
              icon: '📊',
              desc: 'View website analytics and engagement'
            }
          ].map((card, i) => (
            <Link
              key={card.to}
              to={card.to}
              style={{ animationDelay: `${i * 120}ms` }}
              className="group relative rounded-[2rem] p-10
                         bg-white/10 backdrop-blur-2xl border border-white/15
                         shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                         hover:-translate-y-2 hover:scale-[1.03]
                         transition-all duration-300
                         opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0
                           group-hover:opacity-100 transition-opacity
                           shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              />

              <div className="flex flex-col items-center text-center h-full">
                <div className="text-5xl mb-8">{card.icon}</div>
                <h2 className="text-2xl font-semibold mb-4">
                  {card.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="max-w-4xl mx-auto animate-[fadeUp_0.9s_ease-out_forwards]">
          <div
            className="relative rounded-[2rem] p-12
                       bg-white/10 backdrop-blur-2xl border border-white/15
                       shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          >
            {/* Soft Accent */}
            <span className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <h2 className="text-2xl font-semibold mb-8">
              Quick Actions
            </h2>

            <ul className="space-y-5 text-white/70">
              {[
                'Add new cities with hero images and descriptions',
                'Create tourist places with galleries and maps',
                'Track visitor statistics and engagement',
                'Manage all content from one central dashboard'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1 w-2 h-2 rounded-full bg-white/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

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

export default AdminDashboard;
