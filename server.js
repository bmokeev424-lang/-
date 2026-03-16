const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const APPLICATIONS_DIR = path.join(__dirname, 'заявки');

if (!fs.existsSync(APPLICATIONS_DIR)) {
  fs.mkdirSync(APPLICATIONS_DIR, { recursive: true });
  console.log('✅ Создана папка для заявок:', APPLICATIONS_DIR);
}

const applications = new Map();

console.log('✅ Сервис заявок настроен. Заявки сохраняются в папку:', APPLICATIONS_DIR);

app.post('/api/apply', async (req, res) => {
  try {
    const { name, phone, message, direction } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Имя и телефон обязательны для заполнения'
      });
    }

    const appId = Date.now().toString();
    const createdAt = new Date().toISOString();

    const application = {
      id: appId,
      name,
      phone,
      message: message || 'Не указано',
      direction: direction || 'Не указано',
      status: 'new',
      createdAt: createdAt
    };
    applications.set(appId, application);

    const dateStr = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
    const timeStr = new Date().toLocaleTimeString('ru-RU').replace(/:/g, '-');
    const fileName = `zayavka_${dateStr}_${timeStr}_${appId}.txt`;
    const filePath = path.join(APPLICATIONS_DIR, fileName);

    const fileContent = `
╔══════════════════════════════════════════════════════════════╗
║                 НОВАЯ ЗАЯВКА - КЛУБ БУСИДО                   ║
╠══════════════════════════════════════════════════════════════╣
║ Дата получения: ${new Date(createdAt).toLocaleString('ru-RU')}
╠══════════════════════════════════════════════════════════════╣
║ Имя:           ${name}
║ Телефон:       ${phone}
║ Направление:   ${direction || 'Не указано'}
╠══════════════════════════════════════════════════════════════╣
║ Сообщение:
║ ${message || 'Не указано'}
╚══════════════════════════════════════════════════════════════╝
`;

    fs.writeFileSync(filePath, fileContent, 'utf8');

    console.log(`✅ Заявка сохранена в файл: ${filePath}`);
    console.log(`   От: ${name}, Тел: ${phone}`);

    res.json({
      success: true,
      message: 'Заявка отправлена!',
      appId
    });

  } catch (error) {
    console.error('❌ Ошибка сохранения заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при сохранении заявки'
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
  let savedApplicationsCount = 0;
  try {
    const files = fs.readdirSync(APPLICATIONS_DIR);
    savedApplicationsCount = files.filter(f => f.startsWith('zayavka_') && f.endsWith('.txt')).length;
  } catch (e) {
    savedApplicationsCount = 0;
  }

  res.json({
    status: 'ok',
    storage: 'local file system',
    applicationsFolder: APPLICATIONS_DIR,
    savedApplications: savedApplicationsCount
  });
});

app.get('/api/applications', (req, res) => {
  try {
    const files = fs.readdirSync(APPLICATIONS_DIR);
    const applicationsList = files
      .filter(f => f.startsWith('zayavka_') && f.endsWith('.txt'))
      .map(f => ({
        fileName: f,
        filePath: path.join(APPLICATIONS_DIR, f),
        createdAt: fs.statSync(path.join(APPLICATIONS_DIR, f)).mtime
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    res.json({
      success: true,
      count: applicationsList.length,
      applications: applicationsList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении списка заявок'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📁 Папка для заявок: ${APPLICATIONS_DIR}`);
  console.log(`📝 Заявки сохраняются в текстовые файлы`);
});