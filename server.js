const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

const applications = new Map();

// Проверка конфигурации при старте
if (!FORMSPREE_ENDPOINT) {
  console.error('❌ ОШИБКА: FORMSPREE_ENDPOINT не указан в .env файле!');
  console.log('   Перейдите на https://formspree.io, создайте форму и скопируйте endpoint.');
} else {
  console.log('✅ Formspree настроен:', FORMSPREE_ENDPOINT);
}

app.post('/api/apply', async (req, res) => {
  try {
    const { name, phone, message, direction } = req.body;

    if (!FORMSPREE_ENDPOINT) {
      return res.status(500).json({
        success: false,
        message: 'Сервис email не настроен. Укажите FORMSPREE_ENDPOINT в .env'
      });
    }

    const appId = Date.now().toString();

    applications.set(appId, {
      id: appId,
      name,
      phone,
      message: message || 'Не указано',
      direction: direction || 'Не указано',
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    // Формируем сообщение для Formspree
    const emailData = {
      name: name,
      phone: phone,
      direction: direction || 'Не указано',
      message: message || 'Не указано',
      _subject: `🥋 Новая заявка от ${name}`,
      _replyto: 'no-reply@busido.ru'
    };

    // Отправляем в Formspree (используем встроенный fetch)
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      console.log(`✅ Заявка отправлена в Formspree: ${name}`);
      res.json({
        success: true,
        message: 'Заявка отправлена!',
        appId
      });
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Ошибка Formspree:', errorData);
      res.status(500).json({
        success: false,
        message: 'Ошибка при отправке заявки'
      });
    }

  } catch (error) {
    console.error('❌ Ошибка отправки заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при отправке заявки'
    });
  }
});

app.get('/api/application/:id', (req, res) => {
  const app = applications.get(req.params.id);
  if (app) {
    res.json(app);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    emailService: FORMSPREE_ENDPOINT ? 'formspree configured' : 'not configured',
    formspreeEndpoint: FORMSPREE_ENDPOINT || 'not set'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📧 Email сервис: Formspree`);
});