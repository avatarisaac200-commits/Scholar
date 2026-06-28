
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { browserLocalPersistence, getAuth, setPersistence } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

/**
 * Firebase configuration for Scholar.
 */
const requiredFirebaseEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const missingFirebaseEnv = Object.entries(requiredFirebaseEnv)
  .filter(([, value]) => !String(value || '').trim())
  .map(([key]) => key);

if (missingFirebaseEnv.length > 0) {
  throw new Error(`Missing Scholar Firebase environment values: ${missingFirebaseEnv.join(', ')}`);
}

export const firebaseConfig = {
  ...requiredFirebaseEnv,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);

// Export instances to be used throughout the app
export const auth = getAuth(app);
export const db = getFirestore(app);

// Universal auth session rule: persist signed-in users in browser/device storage.
// This prevents idle tabs or browser restarts from falling back to a short-lived in-memory session.
export const AUTH_PERSISTENCE_RULE = 'local';
export const authPersistenceReady = setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('Auth persistence: Falling back to Firebase default persistence.', err);
});

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('Firestore persistence: Multiple tabs open, persistence enabled in only one.');
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Firestore persistence: The current browser does not support persistence.');
    }
});
