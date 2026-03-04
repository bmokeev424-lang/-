import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScheduleItem {
  time: string;
  activity: string;
  trainer: string;
  level: string;
  age: string;
}

interface DaySchedule {
  day: string;
  shortDay: string;
  classes: ScheduleItem[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 'Понедельник',
    shortDay: 'Пн',
    classes: [
      { time: '16:00', activity: 'Каратэ', trainer: 'А. Волков', level: 'Начальный', age: '6-12 лет' },
      { time: '18:00', activity: 'Дзюдо', trainer: 'М. Соколова', level: 'Средний', age: 'Взрослые' },
    ],
  },
  {
    day: 'Вторник',
    shortDay: 'Вт',
    classes: [
      { time: '17:00', activity: 'Тхэквондо', trainer: 'А. Петрова', level: 'Все уровни', age: '8+ лет' },
      { time: '19:00', activity: 'Кунг-фу', trainer: 'Д. Ким', level: 'Продвинутый', age: 'Взрослые' },
    ],
  },
  {
    day: 'Среда',
    shortDay: 'Ср',
    classes: [
      { time: '16:00', activity: 'Каратэ', trainer: 'А. Волков', level: 'Начальный', age: '6-12 лет' },
      { time: '18:00', activity: 'Каратэ', trainer: 'А. Волков', level: 'Продвинутый', age: 'Взрослые' },
    ],
  },
  {
    day: 'Четверг',
    shortDay: 'Чт',
    classes: [
      { time: '16:00', activity: 'Дзюдо', trainer: 'М. Соколова', level: 'Начальный', age: '6-12 лет' },
      { time: '18:00', activity: 'Тхэквондо', trainer: 'А. Петрова', level: 'Средний', age: 'Подростки' },
    ],
  },
  {
    day: 'Пятница',
    shortDay: 'Пт',
    classes: [
      { time: '17:00', activity: 'Тхэквондо', trainer: 'А. Петрова', level: 'Все уровни', age: '8+ лет' },
      { time: '19:00', activity: 'Кунг-фу', trainer: 'Д. Ким', level: 'Все уровни', age: 'Взрослые' },
    ],
  },
  {
    day: 'Суббота',
    shortDay: 'Сб',
    classes: [
      { time: '10:00', activity: 'Общая тренировка', trainer: 'Все тренеры', level: 'Все уровни', age: 'Все возраста' },
      { time: '12:00', activity: 'Семинар', trainer: 'Гость', level: 'Специальный', age: 'По записи' },
    ],
  },
];

const Schedule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);

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

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'Каратэ':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Дзюдо':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Кунг-фу':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Тхэквондо':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative"
    >
      <div className="container-custom mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-[#E63946]">РАСПИСАНИЕ</span>
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Занятия для всех уровней подготовки
          </p>
        </div>

        {/* Day Tabs - Desktop */}
        <div className="hidden md:flex justify-center gap-2 mb-8">
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeDay === index
                  ? 'bg-[#E63946] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Day Tabs - Mobile */}
        <div className="flex md:hidden justify-center gap-2 mb-8 flex-wrap">
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeDay === index
                  ? 'bg-[#E63946] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {day.shortDay}
            </button>
          ))}
        </div>

        {/* Schedule Table */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 md:p-6 border-b border-white/10 bg-white/5">
            <div className="col-span-2 md:col-span-2 text-white/60 font-semibold text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> Время
            </div>
            <div className="col-span-3 md:col-span-3 text-white/60 font-semibold text-sm">
              Занятие
            </div>
            <div className="col-span-3 md:col-span-2 text-white/60 font-semibold text-sm">
              Тренер
            </div>
            <div className="hidden md:block col-span-2 text-white/60 font-semibold text-sm">
              Уровень
            </div>
            <div className="col-span-4 md:col-span-3 text-white/60 font-semibold text-sm flex items-center gap-2">
              <Users className="w-4 h-4" /> Возраст
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {scheduleData[activeDay].classes.map((classItem, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 p-4 md:p-6 hover:bg-white/5 transition-colors duration-300"
              >
                <div className="col-span-2 md:col-span-2 text-white font-semibold">
                  {classItem.time}
                </div>
                <div className="col-span-3 md:col-span-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getActivityColor(
                      classItem.activity
                    )}`}
                  >
                    {classItem.activity}
                  </span>
                </div>
                <div className="col-span-3 md:col-span-2 text-white/80">
                  {classItem.trainer}
                </div>
                <div className="hidden md:block col-span-2 text-white/60 text-sm">
                  {classItem.level}
                </div>
                <div className="col-span-4 md:col-span-3 text-white/60 text-sm">
                  {classItem.age}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => alert('Функция скачивания расписания в разработке')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#E63946] transition-colors duration-300"
          >
            <Download className="w-5 h-5" />
            Скачать расписание в PDF
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['Каратэ', 'Дзюдо', 'Кунг-фу', 'Тхэквондо'].map((activity) => (
            <div key={activity} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${getActivityColor(activity).split(' ')[0]}`} />
              <span className="text-white/60 text-sm">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
