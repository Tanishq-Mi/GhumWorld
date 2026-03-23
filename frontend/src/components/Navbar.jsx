import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/icon.png"
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // 🔒 Lock scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  return (
    <>
      {/* ================= FLOATING GLASS NAVBAR ================= */}
      <nav
  className="
fixed top-5 left-[5%] md:left-[10%]

  w-[90%] max-w-6xl
  z-[200]
  bg-white/10 backdrop-blur-2xl
  border border-white/20
  rounded-2xl
  shadow-[0_18px_50px_rgba(0,0,0,0.7)]
  animate-[fadeDown_0.6s_ease-out_forwards]
  "
>

        <div className="px-6 py-3">
          <div className="flex items-center justify-between">

            {/* ===== BRAND ===== */}
            <Link
              to="/"
              className="
              text-lg md:text-xl font-semibold tracking-wide text-white
              hover:text-white/90 transition-all
              "
            >
              {/* Ghum<span className="text-white/60 ml-1">World</span> */}
              <img src={logo} alt="GhumWorld" className="h-10 md:h-10 w-auto object-contain"
/>
            </Link>

            {/* ===== DESKTOP MENU ===== */}
            <div className="hidden md:flex items-center gap-8">

              <Link className="navLink" to="/">Home</Link>
              <Link className="navLink" to="/add-your-own">Add Your Own Place</Link>

              {user ? (
                <>
                  <span className="hidden lg:block text-sm text-white/60">
                    Hi, <span className="text-white">{user.name}</span>
                  </span>

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="
                      px-4 py-1.5 rounded-full text-sm font-medium
                      border border-white/30 text-white
                      hover:bg-white hover:text-black
                      transition-all
                      "
                    >
                      Admin
                    </Link>
                  )}

                  <button onClick={handleLogout} className="glassBtn">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="glassBtn">
                  Login
                </Link>
              )}
            </div>

            {/* ===== MOBILE HAMBURGER ===== */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white focus:outline-none"
            >
              <div className="space-y-1.5">
                <span className="block w-7 h-[2px] bg-white/90"></span>
                <span className="block w-7 h-[2px] bg-white/90"></span>
                <span className="block w-7 h-[2px] bg-white/90"></span>
              </div>
            </button>

          </div>
        </div>
      </nav>

      {/* ================= APPLE STYLE MOBILE MENU ================= */}
      {menuOpen && (
        <div
          className="
          fixed inset-0 z-[999]
          bg-black/80 backdrop-blur-3xl
          flex flex-col items-center justify-center
          space-y-10 text-center
          animate-[appleFade_0.45s_cubic-bezier(0.16,1,0.3,1)_forwards]
          "
        >
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="
            absolute top-6 right-6 text-white text-4xl
            hover:text-white/70 transition-colors
            "
          >
            ×
          </button>

          <Link onClick={() => setMenuOpen(false)} to="/" className="mobileLink">
            Home
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/add-your-own"
            className="mobileLink"
          >
            Add Place
          </Link>

          {!user ? (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/login"
              className="mobileBtn"
            >
              Login
            </Link>
          ) : (
            <>
              {user.role === "admin" && (
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/admin/dashboard"
                  className="mobileLink"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="mobileBtn"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style>{`
        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes appleFade {
          0% { opacity: 0; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }

        .navLink {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          transition: color 0.3s ease;
        }

        .navLink:hover {
          color: white;
        }

        .glassBtn {
          padding: 8px 22px;
          border-radius: 9999px;
          font-weight: 600;
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          transition: all 0.25s ease;
        }

        .glassBtn:hover {
          background: white;
          color: black;
        }

        .mobileLink {
          font-size: 1.6rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          transition: all 0.35s ease;
        }

        .mobileLink:hover {
          color: white;
          transform: translateY(-2px) scale(1.08);
        }

        .mobileBtn {
          margin-top: 10px;
          padding: 14px 48px;
          border-radius: 9999px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: black;
          background: white;
          transition: transform 0.3s ease;
        }

        .mobileBtn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default Navbar;
