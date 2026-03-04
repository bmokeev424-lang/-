import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Direction {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface DirectionCardProps {
  direction: Direction;
  index: number;
}

const DirectionCard = ({ direction, index }: DirectionCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          cardRef.current,
          { rotateY: 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
          }
        );
      },
      once: true
    });

    return () => trigger.kill();
  }, [index]);

  return (
    <Link
      to={`/direction/${direction.id}`}
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg cursor-pointer perspective-1000 block"
      style={{ opacity: 0, transformStyle: 'preserve-3d' }}
    >
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={direction.image}
          alt={direction.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-['Montserrat'] mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
          {direction.title}
        </h3>
        <p className="text-white/70 text-sm md:text-base mb-4 transform transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          {direction.description}
        </p>
        <div className="flex items-center gap-2 text-[#E63946] font-semibold text-sm transform transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          Подробнее <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E63946]/50 rounded-lg transition-colors duration-300" />
    </Link>
  );
};

const Directions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 80%',
      onEnter: () => {
        const headingElements = headingRef.current?.querySelectorAll('.animate-heading');
        if (headingElements && headingElements.length > 0) {
          gsap.fromTo(
            headingElements,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }
      },
      once: true
    });

    return () => trigger.kill();
  }, []);

  const directions: Direction[] = [
    {
      id: 'karate',
      title: 'Каратэ',
      description: 'Путь пустой руки. Ударная техника, ката, кумите. Развитие силы, скорости и координации.',
      image: '/karate-card.jpg',
    },
    {
      id: 'judo',
      title: 'Дзюдо',
      description: 'Мягкий путь. Броски, болевые приемы, удержания. Техника использования силы противника.',
      image: '/judo-card.jpg',
    },
    {
      id: 'kungfu',
      title: 'Кунг-фу',
      description: 'Достижение мастерства. Традиционные формы, медитация, дыхательные упражнения.',
      image: '/kungfu-card.jpg',
    },
    {
      id: 'taekwondo',
      title: 'Тхэквондо',
      description: 'Путь ноги. Высокие удары, акробатика, спарринг. Развитие гибкости и выносливости.',
      image: '/taekwondo-card.jpg',
    },
  ];

  return (
    <section
      id="directions"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-[#E63946]">НАПРАВЛЕНИЯ</span>
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Выбери свой путь в мире восточных единоборств
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 perspective-1000">
          {directions.map((direction, index) => (
            <DirectionCard key={direction.id} direction={direction} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contacts"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-[#E63946] font-semibold hover:text-white transition-colors duration-300 group"
          >
            Не знаете что выбрать? Получите консультацию
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Directions;
