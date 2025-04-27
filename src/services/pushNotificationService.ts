import admin from 'firebase-admin';

interface PushNotificationPayload {
  token: string;
  title: string;
  body: string;
  data?: { [key: string]: string };
}

export async function sendPushNotificationFCM({
  token,
  title,
  body,
  data = {},
}: PushNotificationPayload) {
  const message = {
    token,
    notification: {
      title,
      body,
    },
    data,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('📨 Successfully sent push notification:', response);
    return response;
  } catch (error) {
    console.error('❌ Error sending push notification:', error);
    throw error;
  }
}
