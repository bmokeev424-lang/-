import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const directions = [
  { id: '', name: 'Выберите направление' },
  { id: 'karate', name: 'Каратэ' },
  { id: 'judo', name: 'Дзюдо' },
  { id: 'kungfu', name: 'Кунг-фу' },
  { id: 'taekwondo', name: 'Тхэквондо' },
];

const Contacts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    direction: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
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

      const formTrigger = ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true
      });
      triggers.push(formTrigger);

      const infoTrigger = ScrollTrigger.create({
        trigger: infoRef.current,
        start: 'top 80%',
        onEnter: () => {
          const infoElements = infoRef.current?.querySelectorAll('.info-item');
          if (infoElements && infoElements.length > 0) {
            gsap.fromTo(
              infoElements,
              { x: 30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
          }
        },
        once: true
      });
      triggers.push(infoTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', phone: '', message: '', direction: '' });
        }, 5000);
      } else {
        setError(data.message || 'Произошла ошибка при отправке');
      }
    } catch (err) {
      setError('Не удалось отправить заявку. Попробуйте позже.');
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Адрес',
      value: 'г. Москва, ул. Спортивная, 15',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Телефон',
      value: '+7 (999) 123-45-67',
      href: 'tel:+79991234567',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'info@busido-club.ru',
      href: 'mailto:info@busido-club.ru',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Часы работы',
      value: 'Пн-Пт: 8:00-22:00, Сб: 9:00-18:00',
    },
  ];

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative"
    >
      <div className="container-custom mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="animate-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Montserrat']">
            <span className="text-[#E63946]">СВЯЖИТЕСЬ</span> С НАМИ
          </h2>
          <p className="animate-heading text-white/60 text-lg max-w-2xl mx-auto">
            Запишитесь на пробное занятие или задайте вопрос
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8"
            style={{ opacity: 0 }}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-[#E63946] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-white/60 mb-4">Мы рассмотрим вашу заявку и свяжемся с вами в ближайшее время</p>
                <div className="flex items-center gap-2 text-[#E63946] text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ожидайте звонка
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                  Записаться на пробное занятие
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E63946] transition-colors disabled:opacity-50"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E63946] transition-colors disabled:opacity-50"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Направление</label>
                    <select
                      name="direction"
                      value={formData.direction}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E63946] transition-colors disabled:opacity-50 appearance-none cursor-pointer"
                    >
                      {directions.map((dir) => (
                        <option key={dir.id} value={dir.id} className="bg-[#1A1A1A]">
                          {dir.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Сообщение (необязательно)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      disabled={isLoading}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E63946] transition-colors resize-none disabled:opacity-50"
                      placeholder="Какое время вам удобно? Есть ли опыт занятий?"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-white/40 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                Контактная информация
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="info-item flex items-start gap-4 group"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E63946]/10 flex items-center justify-center text-[#E63946] flex-shrink-0 group-hover:bg-[#E63946] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white font-semibold hover:text-[#E63946] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-64 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#E63946] mx-auto mb-3" />
                <p className="text-white/60">Карта проезда</p>
                <p className="text-white text-sm">г. Москва, ул. Спортивная, 15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
