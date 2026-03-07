import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Базовый',
    price: 3000,
    period: 'месяц',
    description: 'Для начинающих и тех, кто хочет попробовать',
    features: [
      '2 занятия в неделю',
      'Доступ к групповым тренировкам',
      'Базовое оборудование',
      'Чат с тренером',
    ],
    featured: false,
  },
  {
    name: 'Стандарт',
    price: 5000,
    period: 'месяц',
    description: 'Оптимальный выбор для большинства учеников',
    features: [
      '4 занятия в неделю',
      'Доступ ко всем направлениям',
      'Полное оборудование',
      'Приоритетная запись',
      'Видео-разборы техники',
    ],
    featured: true,
  },
  {
    name: 'Премиум',
    price: 8000,
    period: 'месяц',
    description: 'Максимальный результат в кратчайшие сроки',
    features: [
      'Безлимитные занятия',
      '2 персональные тренировки',
      'Индивидуальная программа',
      'Питание и recovery',
      'Участие в семинарах',
      'Сопровождение на соревнованиях',
    ],
    featured: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Heading animation
      const headingTrigger = ScrollTrigger.create({
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
      triggers.push(headingTrigger);

      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
              }
            );
          },
          once: true
        });
        triggers.push(cardsTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const scrollToContacts = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-[#E63946]">АБОНЕМЕНТЫ</span>
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Выберите подходящий тариф и начните свой путь
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-center"
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative rounded-2xl p-6 md:p-8 transition-all duration-500 ${
                plan.featured
                  ? 'bg-gradient-to-b from-[#E63946]/20 to-[#E63946]/5 border-2 border-[#E63946]/50 scale-105 z-10'
                  : 'bg-gradient-to-b from-white/10 to-white/5 border border-white/10'
              } ${hoveredCard === index ? 'transform -translate-y-2' : ''}`}
              style={{ opacity: 0 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-[#E63946] text-white text-xs font-bold px-4 py-1 rounded-full">
                    <Star className="w-3 h-3" /> РЕКОМЕНДУЕМ
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-2">
                {plan.name}
              </h3>
              <p className="text-white/60 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-bold text-white font-['Montserrat']">
                  {plan.price.toLocaleString()}
                </span>
                <span className="text-white/60 text-sm ml-2">₽/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-[#E63946]' : 'text-white/60'
                      }`}
                    />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={scrollToContacts}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                  plan.featured
                    ? 'bg-[#E63946] text-white hover:bg-[#c92f3a] hover:shadow-[0_0_30px_rgba(230,57,70,0.4)]'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 text-white/50 text-sm">
          <p>Все абонементы включают страховку и медицинский осмотр</p>
          <p className="mt-2">Первое пробное занятие — <span className="text-[#E63946] font-semibold">бесплатно</span></p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
