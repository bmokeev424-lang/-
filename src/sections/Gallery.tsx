import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: '/gallery1.jpg', alt: 'Детская тренировка', category: 'Тренировки' },
  { src: '/gallery2.jpg', alt: 'Соревнования', category: 'Турниры' },
  { src: '/gallery3.jpg', alt: 'Групповое фото', category: 'Команда' },
  { src: '/gallery4.jpg', alt: 'Мастер-класс', category: 'Тренировки' },
  { src: '/gallery5.jpg', alt: 'Занятия с детьми', category: 'Тренировки' },
  { src: '/gallery6.jpg', alt: 'Награждение', category: 'Турниры' },
];

const categories = ['Все', 'Тренировки', 'Турниры', 'Команда'];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 80%',
      onEnter: () => {
        const headingElements = headingRef.current?.querySelectorAll('.animate-heading');
        if (headingElements && headingElements.length > 0) {
          gsap.fromTo(
            headingElements,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }
      },
      once: true
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const images = gridRef.current?.querySelectorAll('.gallery-item');
    if (images) {
      gsap.fromTo(
        images,
        { y: 50, opacity: 0, rotate: (i) => (i % 2 === 0 ? -3 : 3) },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [activeCategory]);

  const filteredImages =
    activeCategory === 'Все'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative"
    >
      <div className="container-custom mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-[#E63946]">ГАЛЕРЕЯ</span>
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Моменты из жизни клуба
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 md:gap-4 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#E63946] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item group relative overflow-hidden rounded-lg cursor-pointer ${
                index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div
                className={`overflow-hidden ${
                  index === 0 || index === 3 ? 'aspect-[16/10]' : 'aspect-square'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>

              {/* Category Tag */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-[#E63946] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="font-semibold">{selectedImage.alt}</p>
            <p className="text-white/60 text-sm">{selectedImage.category}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
