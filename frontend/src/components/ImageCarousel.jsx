import { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className="w-full aspect-[16/9] rounded-3xl
                   bg-white/5 backdrop-blur-xl border border-white/15
                   shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                   flex items-center justify-center"
      >
        <p className="text-white/60">No images available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      {/* ================= HERO IMAGE ================= */}
      <div
        className="relative group w-full aspect-[16/9] rounded-[28px] overflow-hidden
                   bg-black border border-white/15
                   shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
      >
        {/* Glow Border */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[28px]
                     ring-1 ring-white/20
                     shadow-[0_0_40px_rgba(255,255,255,0.08)]"
        />

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-[900ms] ease-out
                     group-hover:scale-[1.06]"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/1200x700/111111/ffffff?text=Image+Not+Available';
          }}
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        {/* ================= ARROWS ================= */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         backdrop-blur-xl bg-white/10 hover:bg-white/20
                         w-11 h-11 md:w-14 md:h-14 rounded-full
                         flex items-center justify-center
                         text-white text-xl md:text-2xl
                         border border-white/30"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         backdrop-blur-xl bg-white/10 hover:bg-white/20
                         w-11 h-11 md:w-14 md:h-14 rounded-full
                         flex items-center justify-center
                         text-white text-xl md:text-2xl
                         border border-white/30"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {/* ================= COUNTER ================= */}
        <div
          className="absolute bottom-4 right-4 px-4 py-1.5 rounded-full
                     bg-white/10 backdrop-blur-xl
                     text-xs md:text-sm text-white
                     border border-white/25
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* ================= THUMB STRIP ================= */}
      {images.length > 1 && (
        <div className="mt-6 flex justify-center overflow-x-auto pb-3">
          <div
            className="flex gap-4 px-4 py-2 rounded-2xl
                       bg-white/5 backdrop-blur-xl border border-white/10"
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden
                            transition-all duration-300
                            ${
                              index === currentIndex
                                ? 'ring-2 ring-white scale-105 shadow-[0_0_18px_rgba(255,255,255,0.4)]'
                                : 'opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/160x120/111111/ffffff?text=Img';
                  }}
                />

                {index !== currentIndex && (
                  <div className="absolute inset-0 bg-black/40" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
