// Carousel gồm các banner movie với id của movie tương ứng, tự động scroll sau vài giây, có thể ấn vào để chuyển sang trang MovieDetailAndBooking tương ứng

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - TODO: Replace with API data
const mockBanners = [
  {
    id: 1,
    title: "PHIM COMING SOON",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=500&fit=crop",
  },
  {
    id: 2,
    title: "PHIM HOT NHẤT",
    image:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200&h=500&fit=crop",
  },
  {
    id: 3,
    title: "PHIM MỚI RA MẮT",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=500&fit=crop",
  },
];

const Carousel = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleBannerClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {mockBanners.map((banner) => (
            <div
              key={banner.id}
              className="flex-[0_0_100%] min-w-0 relative cursor-pointer"
              onClick={() => handleBannerClick(banner.id)}
            >
              <div className="relative h-[500px] bg-gradient-to-r from-purple-900 to-blue-900">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="container mx-auto px-4 pb-12">
                    <h2 className="text-5xl font-bold text-white mb-4">
                      {banner.title}
                    </h2>
                    <button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition">
                      XEM THÊM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
