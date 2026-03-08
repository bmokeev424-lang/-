#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "========================================"
echo "   🚀 ЗАПУСК ПРОЕКТА"
echo "========================================"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED}[❌ ОШИБКА] Node.js не установлен!${NC}"
    echo ""
    echo "Пожалуйста, скачайте и установите Node.js:"
    echo "https://nodejs.org"
    echo ""
    echo "Для macOS рекомендуется использовать Homebrew:"
    echo "  brew install node"
    echo ""
    echo "Для Linux (Ubuntu/Debian):"
    echo "  sudo apt update && sudo apt install nodejs npm"
    echo ""
    read -p "Нажмите Enter для выхода..."
    exit 1
fi

echo -e "${GREEN}[✓] Node.js найден${NC}"
echo "    Версия: $(node --version)"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}[❌ ОШИБКА] npm не найден!${NC}"
    read -p "Нажмите Enter для выхода..."
    exit 1
fi

echo -e "${GREEN}[✓] npm найден${NC}"

if [ ! -d "node_modules" ]; then
    echo ""
    echo -e "${BLUE}[📦] Установка зависимостей...${NC}"
    echo "    Это может занять несколько минут..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}[❌ ОШИБКА] Не удалось установить зависимости!${NC}"
        read -p "Нажмите Enter для выхода..."
        exit 1
    fi
    echo -e "${GREEN}[✓] Зависимости установлены${NC}"
else
    echo -e "${GREEN}[✓] Зависимости уже установлены${NC}"
fi

echo ""
echo "========================================"
echo "   🔄 ЗАПУСК СЕРВИСОВ"
echo "========================================"
echo ""

BACKEND_PORT=3001

if lsof -Pi :$BACKEND_PORT -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -an 2>/dev/null | grep -q ":$BACKEND_PORT "; then
    echo -e "${YELLOW}[⚠] Порт $BACKEND_PORT занят, пробуем 3002...${NC}"
    BACKEND_PORT=3002
fi

if [ ! -f ".env" ]; then
    echo "VITE_API_URL=http://localhost:$BACKEND_PORT" > .env
    echo -e "${BLUE}[ℹ] Создан файл .env с настройками по умолчанию${NC}"
fi

# Функция очистки при выходе
cleanup() {
    echo ""
    echo "========================================"
    echo "   🛑 ОСТАНОВКА СЕРВИСОВ"
    echo "========================================"

    if [ -n "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}[✓] Бэкенд остановлен${NC}"
    fi

    if [ -n "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}[✓] Фронтенд остановлен${NC}"
    fi

    echo ""
    echo "До свидания! 👋"
    exit 0
}

trap cleanup SIGINT SIGTERM

echo -e "${BLUE}[🖥️ ] Запуск бэкенда на порту $BACKEND_PORT...${NC}"
PORT=$BACKEND_PORT node server.js &
BACKEND_PID=$!

echo -e "${BLUE}[⏳] Ожидание запуска бэкенда...${NC}"
sleep 3

if curl -s http://localhost:$BACKEND_PORT/api/health >/dev/null 2>&1; then
    echo -e "${GREEN}[✓] Бэкенд запущен и отвечает${NC}"
else
    echo -e "${YELLOW}[⚠] Бэкенд еще инициализируется...${NC}"
fi

echo -e "${BLUE}[⚛️ ] Запуск фронтенда (Vite + React)...${NC}"
npm run dev &
FRONTEND_PID=$!

echo -e "${BLUE}[⏳] Ожидание запуска фронтенда...${NC}"
sleep 5

FRONTEND_URL="http://localhost:5173"

if ! curl -s $FRONTEND_URL >/dev/null 2>&1; then
    FRONTEND_URL="http://localhost:5174"
fi

echo -e "${BLUE}[🌐] Открытие браузера...${NC}"

if command -v open &> /dev/null; then
    open "$FRONTEND_URL"
elif command -v xdg-open &> /dev/null; then
    xdg-open "$FRONTEND_URL"
elif command -v gnome-open &> /dev/null; then
    gnome-open "$FRONTEND_URL"
else
    echo -e "${YELLOW}[⚠] Не удалось автоматически открыть браузер${NC}"
    echo "    Пожалуйста, откройте вручную: $FRONTEND_URL"
fi

echo ""
echo "========================================"
echo -e "   ${GREEN}✅ ПРОЕКТ ЗАПУЩЕН!${NC}"
echo "========================================"
echo ""
echo -e "🌐 ${BLUE}Сайт:${NC} $FRONTEND_URL"
echo -e "🖥️  ${BLUE}Бэкенд:${NC} http://localhost:$BACKEND_PORT"
echo ""
echo -e "${YELLOW}⚠️  ВАЖНО:${NC} Не закрывайте это окно!"
echo "    Оно нужно для работы сайта."
echo ""
echo -e "🛑 ${YELLOW}Для остановки:${NC}"
echo "    Нажмите Ctrl+C"
echo ""
echo "========================================"
echo ""

# Ждем завершения процессов
wait $BACKEND_PID $FRONTEND_PID