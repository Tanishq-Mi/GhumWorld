import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0
                 z-[9999]
 w-[calc(100%-2rem)] md:w-auto max-w-md
                 animate-[toastFloatIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
    >
      <div
        className="relative flex items-center gap-4 px-6 py-4 rounded-[1.2rem]
             bg-[#111]/80 backdrop-blur-3xl
             bg-gradient-to-br from-white/10 via-transparent to-transparent
             border border-white/20
             shadow-[0_25px_80px_rgba(0,0,0,0.9)]
             overflow-hidden"
      >
        {/* Soft top glow */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Accent orb */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0
            ${isSuccess
              ? 'bg-white/20 text-white'
              : 'bg-red-500/20 text-red-400'}`}
        >
          {isSuccess ? '✓' : '⚠'}
        </div>

        {/* Text */}
        <p className="text-white/90 text-sm md:text-base font-medium leading-snug">
          {message}
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="ml-2 w-9 h-9 flex items-center justify-center rounded-full
                     text-white/60 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          ×
        </button>

        {/* Status Glow */}
        <div
          className={`absolute inset-0 pointer-events-none opacity-40
            ${isSuccess
              ? 'shadow-[0_0_40px_rgba(255,255,255,0.15)]'
              : 'shadow-[0_0_40px_rgba(255,0,0,0.25)]'}`}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes toastFloatIn {
          0% { opacity: 0; transform: translateY(-14px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Toast;
