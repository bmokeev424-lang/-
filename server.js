const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

const applications = new Map();

app.post('/api/apply', async (req, res) => {
  try {
    const { name, phone, message, direction } = req.body;

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

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '✅ Одобрить', callback_data: `approve_${appId}` },
          { text: '❌ Отклонить', callback_data: `reject_${appId}` }
        ],
        [
          { text: '📞 Позвонить', callback_data: `call_${appId}` }
        ]
      ]
    };

    const text = `
🥋 <b>Новая заявка на пробное занятие!</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
🎯 <b>Направление:</b> ${direction || 'Не указано'}
💬 <b>Сообщение:</b> ${message || 'Не указано'}

⏰ <b>Время заявки:</b> ${new Date().toLocaleString('ru-RU')}
    `;

    await bot.sendMessage(ADMIN_CHAT_ID, text, {
      parse_mode: 'HTML',
      reply_markup: inlineKeyboard
    });

    res.json({
      success: true,
      message: 'Заявка отправлена!',
      appId
    });
  } catch (error) {
    console.error('Error sending application:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при отправке заявки'
    });
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;
  const [action, appId] = data.split('_');

  const application = applications.get(appId);

  if (!application) {
    await bot.answerCallbackQuery(query.id, { text: 'Заявка не найдена или устарела' });
    return;
  }

  try {
    if (action === 'approve') {
      application.status = 'approved';
      applications.set(appId, application);

      const approvedText = query.message.text + '\n\n✅ <b>СТАТУС: ОДОБРЕНО</b>\n👤 Одобрил: ' + query.from.first_name;

      await bot.editMessageText(approvedText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML'
      });


      await bot.sendMessage(ADMIN_CHAT_ID,
        `✅ Заявка ${appId} одобрена!\n\nНе забудьте связаться с клиентом:\n📞 ${application.phone}`,
        { parse_mode: 'HTML' }
      );

      await bot.answerCallbackQuery(query.id, { text: 'Заявка одобрена!' });

    } else if (action === 'reject') {
      application.status = 'rejected';
      applications.set(appId, application);

      const rejectedText = query.message.text + '\n\n❌ <b>СТАТУС: ОТКЛОНЕНО</b>\n👤 Отклонил: ' + query.from.first_name;

      await bot.editMessageText(rejectedText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML'
      });

      await bot.answerCallbackQuery(query.id, { text: 'Заявка отклонена' });

    } else if (action === 'call') {
      await bot.answerCallbackQuery(query.id, {
        text: `Звоним: ${application.phone}`,
        show_alert: true
      });
    }
  } catch (error) {
    console.error('Error handling callback:', error);
    await bot.answerCallbackQuery(query.id, { text: 'Произошла ошибка' });
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
  res.json({ status: 'ok', bot: 'running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Bot initialized. Admin chat ID: ${ADMIN_CHAT_ID}`);
});


bot.on('error', (error) => {
  console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});
