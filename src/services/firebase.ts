// Khởi tạo Firebase (chỉ nạp khi cần — form không tải Firebase cho tới lúc gửi).
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const env = import.meta.env;
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let app: FirebaseApp | null = null;

function getApp(): FirebaseApp {
  if (!isFirebaseConfigured) throw new Error('Chưa cấu hình Firebase (biến VITE_FIREBASE_*)');
  if (!app) {
    app = initializeApp(config);
    const siteKey = env.VITE_RECAPTCHA_V3_SITE_KEY;
    if (siteKey) {
      if (env.DEV) (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      initializeAppCheck(app, { provider: new ReCaptchaV3Provider(siteKey), isTokenAutoRefreshEnabled: true });
    }
  }
  return app;
}

export const db = (): Firestore => getFirestore(getApp());
export const auth = (): Auth => getAuth(getApp());
