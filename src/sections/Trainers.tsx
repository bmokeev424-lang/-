import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Award, X, Calendar, Trophy, User, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Trainer {
  name: string;
  title: string;
  description: string;
  fullDescription: string;
  history: string[];
  specialization: string[];
  achievements: string[];
  image: string;
  stats: {
    experience: string;
    students: string;
    championships: string;
  };
}

const trainers: Trainer[] = [
  {
    name: 'Алексей Волков',
    title: 'Мастер спорта по каратэ',
    description: '15 лет опыта преподавания. Специализация: ката, кумите, работа с детьми.',
    fullDescription: 'Алексей родился в семье военных, но с детства чувствовал, что его путь лежит не в штабах, а на ковре. Его отец, Георгий Волков, был известным тренером СССР по каратэ, и именно он стал первым учителем сына. В 8 лет Алексей уже проводил утренние тренировки с детьми младше себя, потому что «все должны учиться, даже если не хотят».В 14 лет он выиграл чемпионат Москвы среди юношей, но вместо радости ощутил страх: «Я понял, что теперь мне нужно быть лучше не только для себя, но и для тех, кто смотрит на меня». После этого он начал разрабатывать свою методику — «Каратэ для детей без страха», где каждый удар сопровождается историей, каждая форма — эмоцией.Его самая известная идея — «Два шага назад перед прыжком»: чтобы научиться прыгать выше, нужно сначала научиться правильно упасть. Эта философия стала основой всей его педагогики.Он не просто тренирует тела — он воспитывает характер. Однажды его ученик, который страдал от школьного буллинга, использовал технику «закрытого круга» (защитный жест) в реальной ситуации — и не получил ни одного удара. «Это не защита, — сказал Алексей, — это уверенность. А она начинается внутри.»',
    history: [
      '2009 — Черный пояс 1 дан, начало тренерской карьеры',
      '2014 — Черный пояс 3 дан, открытие собственной секции',
      '2018 — Чемпион России, присвоение звания Мастер спорта',
      '2021 — Черный пояс 4 дан, сертификация WKF',
      '2023 — Главный тренер клуба, подготовка сборной команды'
    ],
    specialization: ['Ката (формальные комплексы)', 'Кумите (поединки)', 'Базовая техника', 'Физическая подготовка', 'Работа с детьми 5-12 лет'],
    achievements: ['Чемпион России 2018', 'Черный пояс 4 дан', '15 лет опыта', 'Сертифицированный тренер WKF'],
    image: '/trainer1.jpg',
    stats: {
      experience: '15 лет',
      students: '500+',
      championships: '12 титулов'
    }
  },
  {
    name: 'Мария Соколова',
    title: 'Черный пояс по дзюдо',
    description: 'Чемпионка России 2019. Специализация: броски, удержания, самооборона для женщин.',
    fullDescription: 'Мария родилась в маленьком городке под Казанью, где девочкам не давали заниматься борьбой. Её первый тренировочный костюм был вторым по счёту — старый, с пятном от масла, купленный за деньги, собранные на распродаже в школе. Но она не сдавалась. В 15 лет её выгнали из секции, потому что тренер сказал: «Девочки не нужны в дзюдо — это мужская игра». Она ответила: «Тогда я сделаю её женской». С тех пор она начала тренироваться самостоятельно, записывая видео своих движений, анализируя их, изучая броски через интернет. Через два года она выиграла чемпионат региона — и впервые в истории клуба побеждала девушка. Её главный принцип: «Самооборона — это не про силу, а про осознанность». Она создала программу «Сильная женщина в городе», которая включает не только технику, но и психологическую подготовку: как не терять контроль в стрессе, как чётко говорить «нет», как использовать окружающую среду. Однажды её ученица, студентка, была остановлена на улице. Вместо паники она использовала технику «открытого замка» — и вышла из ситуации без травм. «Я не сражалась, — сказала она, — я просто знала, что могу.»',
    history: [
      '2010 — Начало занятий дзюдо в спортшколе №5',
      '2015 — Черный пояс 1 дан, первые тренерские шаги',
      '2017 — Черный пояс 2 дан, работа с женскими группами',
      '2019 — Чемпионка России, Черный пояс 3 дан',
      '2022 — Запуск программы самообороны для женщин'
    ],
    specialization: ['Броски через спину', 'Удержания на земле', 'Самооборона для женщин', 'Детское дзюдо', 'Субмиссионная борьба'],
    achievements: ['Чемпионка России 2019', 'Черный пояс 3 дан', '10 лет опыта', 'Автор методики "Сильная женщина"'],
    image: '/trainer2.jpg',
    stats: {
      experience: '10 лет',
      students: '300+',
      championships: '8 титулов'
    }
  },
  {
    name: 'Дмитрий Ким',
    title: 'Мастер кунг-фу',
    description: 'Обучался в Шаолине 5 лет. Специализация: традиционные формы, цигун, медитация.',
    fullDescription: 'Дмитрий родился в Москве, но в 17 лет решил покинуть страну — не ради денег, а ради поиска чего-то большего. Он приехал в Китай с двумя рубашками, рюкзаком и мечтой стать «не человеком, а частью движения». Первые три месяца он не видел ни одной тренировки. Его заставили мыть полы, носить воду, ходить босиком по камням. Только после этого ему разрешили стоять на коленях перед алтарём и повторять одно слово: «Цзы» — «быть здесь». Через год он получил доступ к тренировкам. Но не сразу — сначала учил цигун: дыхание, медитацию, стояние на одной ноге часами. Один из монахов сказал: «Ты хочешь быть быстрым? Тогда начни с того, чтобы быть медленным». После пяти лет жизни в монастыре он стал одним из немногих иностранцев, которым разрешили обучать. Вернувшись в Россию, он не стал просто открывать школу — он создал «Дом тишины», где ученики проходят 30-дневную адаптацию: без телефона, без соцсетей, без лишних слов. Только движение, дыхание, внутренний свет. Он считает, что настоящий мастер — это тот, кто может стоять на месте и всё равно быть в движении.',
    history: [
      '2005 — Отправка в Китай, вступление в школу ушу',
      '2008 — Зачисление в монастырь Шаолинь как послушник',
      '2010 — Обучение у мастера Ши Дэчэна, изучение цигун',
      '2013 — Возвращение в Россию, сертификация инструктора',
      '2018 — Открытие школы традиционного кунг-фу',
      '2023 — Мастер цигун, обучение более 1000 учеников'
    ],
    specialization: ['Традиционные формы (таолу)', 'Цигун и дыхательные практики', 'Медитация и концентрация', 'Ушу-саньда (полноконтакт)', 'Работа с оружием (посох, меч)'],
    achievements: ['Обучение в Шаолине', 'Мастер цигун', '20 лет практики', 'Сертификат монастыря Шаолинь'],
    image: '/trainer3.jpg',
    stats: {
      experience: '20 лет',
      students: '1000+',
      championships: '5 титулов'
    }
  },
  {
    name: 'Анна Петрова',
    title: 'Тренер по тхэквондо',
    description: 'КМС, призер международных турниров. Специализация: ударная техника, акробатика.',
    fullDescription: 'Анна выросла в семье учителей. У неё было всё: хорошее образование, стабильность, безопасность. Но она чувствовала пустоту. В 12 лет она случайно попала на тренировку тхэквондо. Первый удар — по груди — выбил из неё воздух. Но она не плакала. Она засмеялась. «Я не знаю, что это такое, — сказала она, — но мне нравится, что я могу упасть и встать снова.» На международном турнире 2020 года она проиграла в полуфинале — и ушла с поля плача. Но на следующий день пришла в зал раньше всех. «Я не хочу быть сильной, — сказала она, — я хочу быть уверенной.» Она разработала систему «Форма + Сила + Душа», где каждый элемент тренировки связан с эмоцией. Например, акробатика — это не просто прыжки, а история: «Представь, что ты — птица, которая хочет взлететь. Не бойся высоты. Она тебя не съест.» Она также помогает своим ученикам преодолевать страх падения. На тренировках есть специальные упражнения: «Ударь по стене, но не бойся — она не отобьёт». Одна из её учениц, 13-летняя Лиза, сначала не могла прыгнуть выше пояса. Сейчас она делает вращения на турнирах. «Я не стала сильнее, — говорит Лиза, — я стала смелее.»',
    history: [
      '2012 — Начало занятий тхэквондо в возрасте 9 лет',
      '2016 — Вступление в сборную региона, первые соревнования',
      '2018 — КМС по тхэквондо, призовые места на Чемпионатах России',
      '2020 — Призер Чемпионата Мира среди молодежи',
      '2022 — Начало тренерской деятельности, фокус на детей',
      '2024 — Главный тренер отделения тхэквондо'
    ],
    specialization: ['Ударная техника ногами', 'Акробатика и вращения', 'Олимпийское тхэквондо (WTF)', 'Спарринговая подготовка', 'Физическая подготовка юниоров'],
    achievements: ['Призер Чемпионата Мира', 'КМС', '8 лет опыта', 'Тренер сборной региона'],
    image: '/trainer4.jpg',
    stats: {
      experience: '8 лет',
      students: '200+',
      championships: '15 титулов'
    }
  },
];

const Trainers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 80%',
      onEnter: () => {
        const headingElements = headingRef.current?.querySelectorAll('.animate-heading');
        if (headingElements && headingElements.length > 0) {
          gsap.fromTo(
            headingElements,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }
      },
      once: true
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openTrainerDetail = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setIsModalOpen(false)
      });
    } else {
      setIsModalOpen(false);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % trainers.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
  };

  const getSlideStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + trainers.length + Math.floor(trainers.length / 2)) % trainers.length) - Math.floor(trainers.length / 2);
    const isActive = index === activeIndex;
    const isPrev = normalizedDiff === -1 || (activeIndex === 0 && index === trainers.length - 1);
    const isNext = normalizedDiff === 1 || (activeIndex === trainers.length - 1 && index === 0);

    if (isActive) {
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
        zIndex: 10,
        filter: 'blur(0px)',
      };
    } else if (isPrev) {
      return {
        transform: 'translateX(-60%) scale(0.7)',
        opacity: 0.5,
        zIndex: 5,
        filter: 'blur(2px)',
      };
    } else if (isNext) {
      return {
        transform: 'translateX(60%) scale(0.7)',
        opacity: 0.5,
        zIndex: 5,
        filter: 'blur(2px)',
      };
    } else {
      return {
        transform: 'translateX(0) scale(0.5)',
        opacity: 0,
        zIndex: 0,
        filter: 'blur(4px)',
      };
    }
  };

  return (
    <section
      id="trainers"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="container-custom mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            НАШИ <span className="text-[#E63946]">ТРЕНЕРЫ</span>
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Учитесь у лучших мастеров своего дела
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[650px] md:h-[750px] flex items-center justify-center perspective-1500"
        >
          {trainers.map((trainer, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className="absolute w-full max-w-md transition-all duration-500 ease-out"
                style={getSlideStyle(index)}
              >
                <div className={`bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${isActive ? 'cursor-pointer hover:border-[#E63946]/50 transition-colors' : ''}`}
                  onClick={() => isActive && openTrainerDetail(trainer)}
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span className="text-white font-semibold flex items-center gap-2 bg-[#E63946] px-4 py-2 rounded-full">
                          Подробнее <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white font-['Montserrat'] mb-1">
                      {trainer.name}
                    </h3>
                    <p className="text-[#E63946] font-semibold text-sm mb-3">
                      {trainer.title}
                    </p>
                    <p className="text-white/70 text-sm mb-4">
                      {trainer.description}
                    </p>
                    {/* Stats for active card */}
                    {isActive && (
                      <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b border-white/10">
                        <div className="text-center">
                          <div className="text-[#E63946] font-bold text-lg">{trainer.stats.experience}</div>
                          <div className="text-white/50 text-xs">Опыт</div>
                        </div>
                        <div className="text-center border-x border-white/10">
                          <div className="text-[#E63946] font-bold text-lg">{trainer.stats.students}</div>
                          <div className="text-white/50 text-xs">Учеников</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#E63946] font-bold text-lg">{trainer.stats.championships}</div>
                          <div className="text-white/50 text-xs">Титулов</div>
                        </div>
                      </div>
                    )}
                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {trainer.achievements.slice(0, isActive ? 4 : 2).map((achievement, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs text-white/60 bg-white/10 px-2 py-1 rounded"
                        >
                          <Award className="w-3 h-3 text-[#E63946]" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-10 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-10 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {trainers.map((_, index) => (
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
      </div>

      {/* Modal / Sheet Overlay */}
      {isModalOpen && selectedTrainer && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="w-full md:max-w-4xl md:max-h-[90vh] bg-[#0A0A0A] md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[100vh] md:max-h-[90vh]">
              {/* Hero Section */}
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedTrainer.image}
                  alt={selectedTrainer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-[#E63946] text-white text-xs font-bold rounded-full">
                      {selectedTrainer.title}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white font-['Montserrat'] mb-2">
                    {selectedTrainer.name}
                  </h2>
                  <p className="text-white/70 text-lg max-w-2xl">
                    {selectedTrainer.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-center">
                    <Calendar className="w-6 h-6 text-[#E63946] mx-auto mb-2" />
                    <div className="text-white font-bold text-xl">{selectedTrainer.stats.experience}</div>
                    <div className="text-white/50 text-sm">Опыт работы</div>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <User className="w-6 h-6 text-[#E63946] mx-auto mb-2" />
                    <div className="text-white font-bold text-xl">{selectedTrainer.stats.students}</div>
                    <div className="text-white/50 text-sm">Воспитано учеников</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-6 h-6 text-[#E63946] mx-auto mb-2" />
                    <div className="text-white font-bold text-xl">{selectedTrainer.stats.championships}</div>
                    <div className="text-white/50 text-sm">Побед и титулов</div>
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#E63946]" />
                    Биография
                  </h3>
                  <p className="text-white/70 leading-relaxed text-base md:text-lg">
                    {selectedTrainer.fullDescription}
                  </p>
                </div>

                {/* History Timeline */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#E63946]" />
                    Путь мастера
                  </h3>
                  <div className="space-y-4">
                    {selectedTrainer.history.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#E63946]" />
                          {index !== selectedTrainer.history.length - 1 && (
                            <div className="w-0.5 h-full bg-gradient-to-b from-[#E63946] to-transparent mt-2" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-white/90 text-sm md:text-base">{event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#E63946]" />
                    Специализации
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#E63946]/10 border border-[#E63946]/30 text-white rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="w-full py-4 bg-gradient-to-r from-[#E63946] to-[#d62839] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#E63946]/25 transition-all duration-300 transform hover:scale-[1.02]">
                    Записаться на тренировку к {selectedTrainer.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Trainers;