import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Check, Target, Users, Award, Clock, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DirectionData {
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  benefits: string[];
  programs: {
    name: string;
    description: string;
    duration: string;
    level: string;
  }[];
  achievements: string[];
  schedule: {
    day: string;
    time: string;
    group: string;
  }[];
}

const directionsData: Record<string, DirectionData> = {
  karate: {
    title: 'Каратэ',
    subtitle: 'Путь пустой руки',
    description: 'Ударная техника, ката, кумите. Развитие силы, скорости и координации.',
    fullDescription: `Каратэ — это японское боевое искусство, зародившееся на острове Окинава. 
    
В нашем клубе мы обучаем традиционному каратэ, которое развивает не только физические качества, но и духовную силу. Занятия включают в себя изучение базовой техники (кихон), форм (ката) и спаррингов (кумите).

Каратэ подходит для людей любого возраста и уровня подготовки. Наши тренеры индивидуально подходят к каждому ученику, помогая достичь максимальных результатов.`,
    image: '/karate-card.jpg',
    benefits: [
      'Развитие силы и выносливости',
      'Улучшение координации движений',
      'Обучение самообороне',
      'Формирование дисциплины',
      'Повышение уверенности в себе',
      'Снятие стресса',
    ],
    programs: [
      {
        name: 'Детская группа',
        description: 'Занятия для детей 6-12 лет. Базовая техника, игровые формы.',
        duration: '60 минут',
        level: 'Начальный',
      },
      {
        name: 'Подростковая группа',
        description: 'Для подростков 13-17 лет. Углубленная техника, ката, кумите.',
        duration: '90 минут',
        level: 'Средний',
      },
      {
        name: 'Взрослая группа',
        description: 'Интенсивные тренировки для взрослых всех уровней.',
        duration: '120 минут',
        level: 'Все уровни',
      },
    ],
    achievements: [
      'Чемпионаты России и мира',
      'Черные пояса различных данов',
      'Мастера спорта',
    ],
    schedule: [
      { day: 'Понедельник', time: '16:00', group: 'Дети 6-12 лет' },
      { day: 'Среда', time: '16:00', group: 'Дети 6-12 лет' },
      { day: 'Среда', time: '18:00', group: 'Взрослые' },
      { day: 'Суббота', time: '10:00', group: 'Все группы' },
    ],
  },
  judo: {
    title: 'Дзюдо',
    subtitle: 'Мягкий путь',
    description: 'Броски, болевые приемы, удержания. Техника использования силы противника.',
    fullDescription: `Дзюдо — японское боевое искусство, основанное мастером Дзигоро Кано в 1882 году. 

В отличие от других боевых искусств, дзюдо акцентирует внимание на бросках, удержаниях и болевых приемах. Главный принцип дзюдо — «мягкость побеждает жесткость», использование силы противника против него самого.

Наши тренеры — мастера спорта с многолетним опытом, которые научат вас правильной технике и философии дзюдо.`,
    image: '/judo-card.jpg',
    benefits: [
      'Развитие гибкости и ловкости',
      'Обучение бросковой технике',
      'Укрепление всех групп мышц',
      'Развитие тактического мышления',
      'Возможность участия в соревнованиях',
      'Самооборона в любой ситуации',
    ],
    programs: [
      {
        name: 'Детская группа',
        description: 'Безопасное обучение базовым броскам и падениям.',
        duration: '60 минут',
        level: 'Начальный',
      },
      {
        name: 'Подростковая группа',
        description: 'Углубленное изучение техники, подготовка к соревнованиям.',
        duration: '90 минут',
        level: 'Средний',
      },
      {
        name: 'Взрослая группа',
        description: 'Полноценные тренировки с спаррингами.',
        duration: '120 минут',
        level: 'Все уровни',
      },
    ],
    achievements: [
      'Призеры чемпионатов России',
      'Черные пояса до 5 дана',
      'Мастера спорта международного класса',
    ],
    schedule: [
      { day: 'Понедельник', time: '18:00', group: 'Взрослые' },
      { day: 'Четверг', time: '16:00', group: 'Дети 6-12 лет' },
      { day: 'Суббота', time: '10:00', group: 'Все группы' },
    ],
  },
  kungfu: {
    title: 'Кунг-фу',
    subtitle: 'Достижение мастерства',
    description: 'Традиционные формы, медитация, дыхательные упражнения.',
    fullDescription: `Кунг-фу — это древнее китайское боевое искусство, которое развивалось на протяжении тысячелетий.

В нашем клубе мы обучаем традиционному кунг-фу, включающему в себя изучение форм (таолу), работу с оружием, цигун и медитацию. Кунг-фу развивает не только тело, но и дух, учит контролю над своими эмоциями.

Наш главный тренер проходил обучение в монастыре Шаолинь и передает подлинные знания ученикам.`,
    image: '/kungfu-card.jpg',
    benefits: [
      'Развитие внутренней энергии (ци)',
      'Улучшение гибкости и пластики',
      'Обучение работе с традиционным оружием',
      'Медитация и дыхательные практики',
      'Гармония тела и духа',
      'Изучение философии Востока',
    ],
    programs: [
      {
        name: 'Цигун и здоровье',
        description: 'Дыхательные упражнения для укрепления здоровья.',
        duration: '60 минут',
        level: 'Все уровни',
      },
      {
        name: 'Традиционные формы',
        description: 'Изучение классических форм кунг-фу.',
        duration: '90 минут',
        level: 'Средний',
      },
      {
        name: 'Продвинутый курс',
        description: 'Оружие, сложные формы, медитация.',
        duration: '120 минут',
        level: 'Продвинутый',
      },
    ],
    achievements: [
      'Обучение в Шаолине',
      'Мастера цигун',
      'Эксперты традиционных форм',
    ],
    schedule: [
      { day: 'Вторник', time: '19:00', group: 'Взрослые' },
      { day: 'Пятница', time: '19:00', group: 'Взрослые' },
      { day: 'Суббота', time: '12:00', group: 'Все группы' },
    ],
  },
  taekwondo: {
    title: 'Тхэквондо',
    subtitle: 'Путь ноги',
    description: 'Высокие удары, акробатика, спарринг. Развитие гибкости и выносливости.',
    fullDescription: `Тхэквондо — корейское боевое искусство, известное своими эффектными ударами ногами.

В нашем клубе мы обучаем олимпийскому тхэквондо, которое включает в себя базовую технику, формы (пхумсэ), спарринги и разбивание досок. Тхэквондо развивает невероятную гибкость, скорость и координацию.

Наши тренеры — призеры международных соревнований, которые помогут вам достичь высоких результатов.`,
    image: '/taekwondo-card.jpg',
    benefits: [
      'Развитие гибкости и растяжки',
      'Обучение высоким ударам ногами',
      'Улучшение равновесия',
      'Акробатические элементы',
      'Возможность участия в соревнованиях',
      'Дисциплина и уважение',
    ],
    programs: [
      {
        name: 'Детская группа',
        description: 'Базовая техника, игры на развитие гибкости.',
        duration: '60 минут',
        level: 'Начальный',
      },
      {
        name: 'Подростковая группа',
        description: 'Углубленная техника, пхумсэ, спарринг.',
        duration: '90 минут',
        level: 'Средний',
      },
      {
        name: 'Взрослая группа',
        description: 'Интенсивные тренировки, подготовка к соревнованиям.',
        duration: '120 минут',
        level: 'Все уровни',
      },
    ],
    achievements: [
      'Призеры чемпионатов мира',
      'Кандидаты в мастера спорта',
      'Черные пояса WTF',
    ],
    schedule: [
      { day: 'Вторник', time: '17:00', group: 'Все группы 8+' },
      { day: 'Четверг', time: '18:00', group: 'Подростки' },
      { day: 'Пятница', time: '17:00', group: 'Все группы 8+' },
      { day: 'Суббота', time: '10:00', group: 'Все группы' },
    ],
  },
};

const DirectionPage = () => {
  const { directionId } = useParams<{ directionId: string }>();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const direction = directionId ? directionsData[directionId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!direction) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      const animateItems = contentRef.current?.querySelectorAll('.animate-item');
      if (animateItems && animateItems.length > 0) {
        gsap.fromTo(
          animateItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [direction]);

  if (!direction) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Направление не найдено</h1>
          <Link to="/" className="text-[#E63946] hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[60vh] min-h-[400px]">
        <img
          src={direction.image}
          alt={direction.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>На главную</span>
        </Link>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container-custom mx-auto">
            <p className="text-[#E63946] font-semibold mb-2">{direction.subtitle}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-['Montserrat'] mb-4">
              {direction.title}
            </h1>
            <p className="text-white/70 max-w-xl text-lg">{direction.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="section-padding">
        <div className="container-custom mx-auto">
          {/* Description */}
          <div className="animate-item mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
              О <span className="text-[#E63946]">направлении</span>
            </h2>
            <div className="text-white/70 text-lg leading-relaxed whitespace-pre-line max-w-4xl">
              {direction.fullDescription}
            </div>
          </div>

          {/* Benefits */}
          <div className="animate-item mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
              Что вы <span className="text-[#E63946]">получите</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {direction.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <Check className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="animate-item mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
              Программы <span className="text-[#E63946]">обучения</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {direction.programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{program.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{program.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-[#E63946]">
                      <Clock className="w-4 h-4" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1 text-white/60">
                      <Target className="w-4 h-4" /> {program.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="animate-item mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
              Расписание <span className="text-[#E63946]">занятий</span>
            </h2>
            <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5 text-white/60 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> День
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Время
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Группа
                </div>
              </div>
              {direction.schedule.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="text-white">{item.day}</div>
                  <div className="text-white font-semibold">{item.time}</div>
                  <div className="text-white/70">{item.group}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="animate-item mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
              Наши <span className="text-[#E63946]">достижения</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {direction.achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-[#E63946]/10 text-[#E63946] px-4 py-2 rounded-full text-sm font-semibold"
                >
                  <Award className="w-4 h-4" /> {achievement}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="animate-item text-center">
            <div className="bg-gradient-to-r from-[#E63946]/20 to-transparent rounded-2xl p-8 md:p-12 border border-[#E63946]/30">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Montserrat']">
                Готовы начать?
              </h2>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">
                Запишитесь на бесплатное пробное занятие и почувствуйте магию {direction.title}
              </p>
              <Link
                to="/#contacts"
                className="btn-primary inline-flex items-center gap-2"
              >
                Записаться на пробное
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E63946] rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg font-['Montserrat']">Б</span>
              </div>
              <span className="text-white font-bold text-xl font-['Montserrat']">БУСИДО</span>
            </Link>
            <p className="text-white/40 text-sm">
              © 2024 Клуб Бусидо. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DirectionPage;
