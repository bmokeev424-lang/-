const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER;

const applications = new Map();


transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Ошибка подключения к SMTP:', error);
  } else {
    console.log('✅ SMTP сервер готов к отправке писем');
  }
});

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

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
          <h1 style="color: #c9a227; margin: 0; font-size: 24px;">🥋 БУСИДО - Клуб Восточных Единоборств</h1>
          <p style="color: #fff; margin: 10px 0 0 0; font-size: 16px;">Новая заявка на пробное занятие</p>
        </div>

        <div style="background: #fff; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 0; color: #666; font-size: 12px;">ID заявки: <strong>#${appId}</strong></p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">Время: ${new Date().toLocaleString('ru-RU')}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;">👤 Имя:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">📞 Телефон:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">
                <a href="tel:${phone}" style="color: #c9a227; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">🎯 Направление:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">${direction || 'Не указано'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #666; vertical-align: top;">💬 Сообщение:</td>
              <td style="padding: 12px 0; color: #333;">${message || 'Не указано'}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; text-align: center;">
            <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #d4af37 100%); color: #1a1a1a; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; margin: 5px;">📞 Позвонить</a>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>Это письмо отправлено автоматически с сайта Бусидо</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Бусидо - Заявки" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `🥋 Новая заявка от ${name}`,
      html: htmlContent,
      text: `
Новая заявка на пробное занятие!

Имя: ${name}
Телефон: ${phone}
Направление: ${direction || 'Не указано'}
Сообщение: ${message || 'Не указано'}

Время заявки: ${new Date().toLocaleString('ru-RU')}
ID заявки: ${appId}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email отправлен: заявка от ${name}`);

    res.json({
      success: true,
      message: 'Заявка отправлена!',
      appId
    });
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
    email: 'configured',
    recipient: RECIPIENT_EMAIL
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📧 Email получателя: ${RECIPIENT_EMAIL}`);
});