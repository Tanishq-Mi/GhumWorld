import { FaInstagram, FaLinkedin  } from "react-icons/fa";
import logo from "../assets/icon.png"

const Footer = () => {
  const socialLinks = {
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com',
    email: import.meta.env.VITE_EMAIL || 'worldghum@gmail.com',


  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${socialLinks.email}`;
  };

  return (
    <footer className="relative mt-32 overflow-hidden bg-black text-white">
      {/* ===== Ambient Background ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1325] via-black to-black opacity-90" />

      {/* ===== Top Glow Divider ===== */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">

          {/* ===== BRAND CARD ===== */}
          <div
            className="relative rounded-3xl p-8
                       bg-white/5 backdrop-blur-xl border border-white/15
                       shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                       hover:-translate-y-1 transition-all duration-300"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none
                            shadow-[0_0_35px_rgba(255,255,255,0.08)]" />

            <h3 className="text-2xl font-semibold tracking-wide mb-3">
              <img src={logo} alt="GhumWorld" className="h-10 md:h-10 w-auto object-contain"
              />
            </h3>
            <div className="w-20 h-[2px] bg-gradient-to-r from-white/80 to-transparent mb-5" />
            <p className="text-white/70 text-sm leading-relaxed">
             Discover places with their rich history, cultural significance, safety tips, and an authentic local vibe.
            </p>
          </div>

          {/* ===== NAVIGATION ===== */}
          <div
            className="relative rounded-3xl p-8
                       bg-white/5 backdrop-blur-xl border border-white/15
                       shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                       hover:-translate-y-1 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Explore</h4>

            <ul className="space-y-4 text-white/70">
              {[
                { name: 'Home', link: '/' },
                { name: 'Add Your Place', link: '/add-your-own' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="group inline-flex items-center gap-2
                               hover:text-white transition-all"
                  >
                    <span className="relative">
                      {item.name}
                      <span
                        className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white
                                   transition-all group-hover:w-full"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CONNECT ===== */}
          <div
            className="relative rounded-3xl p-8
                       bg-white/5 backdrop-blur-xl border border-white/15
                       shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                       hover:-translate-y-1 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Connect</h4>

            {/* ===== SOCIAL ICONS ===== */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { link: socialLinks.instagram, icon: <FaInstagram />, title: 'Instagram' },
  { link: socialLinks.linkedin, icon: <FaLinkedin />, title: 'LinkedIn' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.title}
                  className="w-12 h-12 rounded-full flex items-center justify-center
                             bg-white/10 backdrop-blur-md border border-white/20
                             hover:bg-white hover:text-black
                             hover:scale-110 transition-all duration-300
                             shadow-lg"
                >
                  {item.icon}
                </a>
              ))}

              <button
                onClick={handleEmailClick}
                title="Email"
                className="w-12 h-12 rounded-full flex items-center justify-center
                           bg-white/10 backdrop-blur-md border border-white/20
                           hover:bg-white hover:text-black
                           hover:scale-110 transition-all duration-300
                           shadow-lg"
              >
                ✉️
              </button>
            </div>

            {/* ===== EMAIL CHIP ===== */}
            <div
              className="inline-block px-5 py-2 rounded-full text-sm
                         bg-white/10 backdrop-blur-md border border-white/20
                         text-white/80"
            >
              {socialLinks.email}
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="pt-10 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm tracking-wide">
            © {new Date().getFullYear()} GhumWorld. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
