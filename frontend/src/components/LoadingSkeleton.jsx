const LoadingSkeleton = () => {
  return (
    <div
      className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden
                 bg-white/5 backdrop-blur-2xl border border-white/15
                 shadow-[0_20px_60px_rgba(0,0,0,0.75)]
                 transition-all duration-300"
    >
      {/* Soft Glow Border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none
                   ring-1 ring-white/20
                   shadow-[0_0_40px_rgba(255,255,255,0.08)]"
      />

      {/* Shimmer Layer */}
      <div className="absolute inset-0 shimmer" />

      {/* Image Placeholder */}
      <div className="relative h-[60%]
                      bg-gradient-to-br from-[#1b1b1b] via-[#242424] to-[#1b1b1b]" />

      {/* Text Placeholder */}
      <div className="relative p-5 space-y-4">
        <div className="h-5 rounded-full bg-white/15 w-4/5" />
        <div className="h-4 rounded-full bg-white/10 w-2/3" />
      </div>

      {/* Shimmer Animation Styles */}
      <style>{`
        .shimmer {
          background: linear-gradient(
            110deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.12) 37%,
            rgba(255,255,255,0.04) 63%
          );
          background-size: 200% 100%;
          animation: shimmerMove 2.2s ease-in-out infinite;
        }

        @keyframes shimmerMove {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;
