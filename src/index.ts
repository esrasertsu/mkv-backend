import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { sendPushNotificationFCM } from './services/pushNotificationService';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Firebase Admin başlat
admin.initializeApp({
  credential: admin.credential.cert(require('../serviceAccountKey.json')),
});

// Basit test route
app.get('/', (req, res) => {
  res.send('MKV Backend Çalışıyor 🚀');
});

// Push notification göndermek için API
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;
  try {
    const result = await sendPushNotificationFCM({ token, title, body });
    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
