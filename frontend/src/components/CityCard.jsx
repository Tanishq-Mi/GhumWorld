import { useNavigate } from 'react-router-dom';

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/city/${city._id || city.name}`);
  };

  const imageUrl = city.heroImage || (city.images && city.images[0]);

  return (
    <div
      onClick={handleClick}
      className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer
                 bg-white/5 backdrop-blur-xl
                 border border-white/15
                 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                 hover:-translate-y-2 hover:scale-[1.02]
                 transition-all duration-500 ease-out
                 opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
    >
      {/* ===== Image ===== */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-700 ease-out
                     group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              'https://placehold.co/400x600/111111/d4af37?text=' +
              encodeURIComponent(city.name);
          }}
        />
      )}

      {/* ===== Vignette Gradient ===== */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

      {/* ===== Spotlight Hover Glow ===== */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]"
      />

      {/* ===== Gold Edge Glow ===== */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   shadow-[0_0_35px_rgba(212,175,55,0.45)]"
      />

      {/* ===== Glass Info Panel ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5
                   bg-black/40 backdrop-blur-xl
                   border-t border-white/10"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
          {city.name}
        </h3>

        <p className="text-sm text-[#d4af37] mt-1 tracking-wide">
{city.placesCount || 0} tourist places

        </p>
      </div>
    </div>
  );
};

export default CityCard;

/* Animations */
<style>{`
  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(25px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`}</style>
