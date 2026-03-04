import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Елена К.',
    role: 'Мама ученика',
    text: 'Сын занимается 2 года, стал дисциплинированнее и увереннее. Тренеры находят подход к каждому ребенку. Очень благодарны клубу за атмосферу и профессионализм!',
    rating: 5,
  },
  {
    name: 'Сергей М.',
    role: 'Взрослый ученик',
    text: 'Отличные тренеры, атмосфера настоящего додзё. Занимаюсь каратэ полгода и уже чувствую огромный прогресс. Рекомендую всем, кто хочет научиться защищать себя.',
    rating: 5,
  },
  {
    name: 'Анна П.',
    role: 'Студентка',
    text: 'Нашла здесь вторую семью. Занимаюсь тхэквондо, очень нравится подход тренеров и поддержка команды. Рекомендую всем, кто ищет не просто спорт, а образ жизни!',
    rating: 5,
  },
  {
    name: 'Иван Д.',
    role: 'Бизнесмен',
    text: 'Лучший клуб в городе, проверено на собственном опыте. Пробовал разные секции, но Бусидо — это что-то особенное. Дисциплина, уважение, результат.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-[#E63946]">ОТЗЫВЫ</span>
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Что говорят наши ученики и их родители
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-0 md:-left-8 text-[#E63946]/20">
              <Quote className="w-16 h-16 md:w-24 md:h-24" />
            </div>

            {/* Testimonial Content */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute translate-x-10'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#E63946] fill-[#E63946]"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="text-white font-semibold font-['Montserrat']">
                      {testimonial.name}
                    </p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-[#E63946] w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E63946] transition-colors duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E63946] transition-colors duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
