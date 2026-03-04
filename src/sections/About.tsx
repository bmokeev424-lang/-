import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, Trophy, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const AnimatedStat = ({ icon, value, suffix, label, delay }: StatProps) => {
  const [count, setCount] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: statRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        
        gsap.to(
          {},
          {
            duration: 1.5,
            delay: delay,
            onUpdate: function () {
              setCount(Math.floor(this.progress() * value));
            },
            onComplete: () => setCount(value),
          }
        );
      },
    });

    return () => trigger.kill();
  }, [value, delay]);

  return (
    <div
      ref={statRef}
      className="flex flex-col items-center text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[#E63946]/50 group"
    >
      <div className="text-[#E63946] mb-3 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white font-['Montserrat'] mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Heading animation
      const headingTrigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, ease: 'power4.out' }
          );
        },
        once: true
      });
      triggers.push(headingTrigger);

      // Text animation
      const textTrigger = ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 80%',
        onEnter: () => {
          const textElements = textRef.current?.querySelectorAll('.animate-text');
          if (textElements && textElements.length > 0) {
            gsap.fromTo(
              textElements,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
          }
        },
        once: true
      });
      triggers.push(textTrigger);

      // Image animation
      const imageTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { rotateY: -45, x: 100, opacity: 0 },
            { rotateY: -5, x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
          );
        },
        once: true
      });
      triggers.push(imageTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: 500, suffix: '+', label: 'Учеников', delay: 0.5 },
    { icon: <Calendar className="w-8 h-8" />, value: 9, suffix: '', label: 'Лет опыта', delay: 0.7 },
    { icon: <Trophy className="w-8 h-8" />, value: 50, suffix: '+', label: 'Наград', delay: 0.9 },
    { icon: <Target className="w-8 h-8" />, value: 4, suffix: '', label: 'Направления', delay: 1.1 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Decorative diagonal line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E63946]/30 to-transparent" />

      <div className="container-custom mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-['Montserrat']"
              style={{ opacity: 0 }}
            >
              О <span className="text-[#E63946]">КЛУБЕ</span> БУСИДО
            </h2>

            <div ref={textRef} className="space-y-6 mb-10">
              <p className="animate-text text-white/80 text-lg leading-relaxed">
                Бусидо — это не просто спорт, это <span className="text-[#E63946] font-semibold">путь самосовершенствования</span>. 
                Наш клуб основан в 2015 году и за это время выпустил более 500 учеников 
                разного уровня подготовки.
              </p>
              <p className="animate-text text-white/70 leading-relaxed">
                Мы обучаем не только технике боевых искусств, но и философии восточной 
                культуры. У нас вы научитесь дисциплине, уважению и самоконтролю — 
                качествам, которые пригодятся во всех сферах жизни.
              </p>
              <p className="animate-text text-white/70 leading-relaxed">
                Наши тренеры — мастера спорта и чемпионы с многолетним опытом. 
                Мы создаем атмосферу настоящего додзё, где каждый ученик получает 
                индивидуальный подход.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 perspective-1000"
            style={{ opacity: 0 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E63946]/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/about-training.jpg"
                alt="Training session"
                className="relative w-full h-auto rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ transform: 'rotateY(-5deg)' }}
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#E63946]/30 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
