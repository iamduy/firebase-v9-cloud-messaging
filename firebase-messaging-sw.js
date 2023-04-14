import { firebaseConfig } from '@/utils/constants';

if ('serviceWorker' in navigator) {
  const params = new URLSearchParams(firebaseConfig).toString();
  navigator.serviceWorker
    .register(`../firebase-messaging-sw.js?${params}`)
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
