import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/Toast';
import bg from "../assets/bg.jpg"
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(name, email, password);

    if (result.success) {
      setToast({ message: 'Signup successful!', type: 'success' });
      setTimeout(() => {
        if (result.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 1000);
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#0b0f1a] via-[#0a0d16] to-black">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 animate-[slowZoom_20s_ease-in-out_infinite_alternate] opacity-40"
        style={{
          backgroundImage:`url(${bg})`
            // "url('https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1920&auto=format&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_65%)]" />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md animate-[fadeUp_0.9s_ease-out_forwards]">
        <div
          className="rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl
                     shadow-[0_40px_120px_rgba(0,0,0,0.9)] p-8 sm:p-10"
        >
          {/* Soft Border */}
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10 pointer-events-none" />

          <h2 className="relative text-3xl sm:text-4xl font-semibold text-center mb-10 tracking-tight text-white">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-black/40 border border-white/15
                           text-white focus:outline-none focus:border-white/40
                           transition-all"
              />
              <label
                className="absolute left-4 top-3 text-sm text-white/50 transition-all
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-placeholder-shown:text-white/40
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
              >
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-black/40 border border-white/15
                           text-white focus:outline-none focus:border-white/40
                           transition-all"
              />
              <label
                className="absolute left-4 top-3 text-sm text-white/50 transition-all
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-placeholder-shown:text-white/40
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-black/40 border border-white/15
                           text-white focus:outline-none focus:border-white/40
                           transition-all"
              />
              <label
                className="absolute left-4 top-3 text-sm text-white/50 transition-all
                           peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-placeholder-shown:text-white/40
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-white"
              >
                Password (min 8 characters)
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="relative w-full py-3 rounded-xl font-medium text-black
                         bg-white hover:bg-white/90
                         transition-all duration-300
                         shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Sign Up</span>
            </button>
          </form>

          <p className="mt-8 text-center text-white/50">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-white hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default Signup;
