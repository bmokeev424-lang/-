import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
      );

      // Title character animation
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.5,
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.4 }
      );

      // CTA button animation
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', delay: 1.6 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContacts = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'БУСИДО';

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-dojo.jpg"
          alt="Dojo interior"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 text-white/5 text-9xl font-black font-['Montserrat'] select-none pointer-events-none hidden lg:block">
        武道
      </div>

      {/* Content */}
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 font-['Montserrat'] tracking-tight perspective-1000"
          >
            {titleText.split('').map((char, index) => (
              <span
                key={index}
                className="char inline-block"
                style={{ transformStyle: 'preserve-3d', opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-['Montserrat'] font-semibold mb-6"
            style={{ opacity: 0 }}
          >
            Клуб восточных единоборств
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-white/70 max-w-xl mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Традиции самураев в современном мире. Каратэ, дзюдо, кунг-фу, тхэквондо 
            для детей и взрослых. Начни свой путь воина сегодня.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              ref={ctaRef}
              onClick={scrollToContacts}
              className="btn-primary flex items-center justify-center gap-2 group"
              style={{ opacity: 0 }}
            >
              Записаться на пробное
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary flex items-center justify-center"
            >
              Узнать больше
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </section>
  );
};

export default Hero;
