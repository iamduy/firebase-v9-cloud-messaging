import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging';
import { firebaseConfig } from './utils/constants';
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const getMessagingToken = async () => {
  let token = '';
  try {
    const messaging = getMessaging(app);
    await Notification.requestPermission();
    token = await getToken(messaging, {
      vapidKey:
        process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ||
        'BNg93Dot5GDDjWimkZ18DvN9TqK0cxmsLanc0pmadVS6PyBPg8hW-Qorq_Hx-rPLUqwQlxRqn3XRRh201__br80',
    });
    if (token) {
      console.log('FCM registration token', token);
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return token;
};

export const onMessageListener = (
  callback: (value: MessagePayload) => void
) => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
