import { Instagram, Youtube, Send, Phone } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Главная', href: '#hero' },
    { name: 'О клубе', href: '#about' },
    { name: 'Направления', href: '#directions' },
    { name: 'Тренеры', href: '#trainers' },
    { name: 'Расписание', href: '#schedule' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Контакты', href: '#contacts' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://www.youtube.com/@QWBT', label: 'YouTube' },
    { icon: <Send className="w-5 h-5" />, href: 'https://t.me/Kion_pi_bot', label: 'Telegram' },
    { icon: <Phone className="w-5 h-5" />, href: 'tel:+79991234567', label: 'Phone' },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Large background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20vw] font-black text-white/[0.02] font-['Montserrat'] select-none">
          БУСИДО
        </span>
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E63946] rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg font-['Montserrat']">Б</span>
              </div>
              <span className="text-white font-bold text-xl font-['Montserrat'] tracking-wide">
                БУСИДО
              </span>
            </div>
            <p className="text-white/60 mb-6 max-w-md">
              Путь воина начинается здесь. Клуб восточных единоборств для детей и взрослых.
              Каратэ, дзюдо, кунг-фу, тхэквондо.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#E63946] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-['Montserrat']">Навигация</h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-[#E63946] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 font-['Montserrat']">Информация</h4>
            <ul className="space-y-2">
              {navLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/60 hover:text-[#E63946] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Клуб Бусидо. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
