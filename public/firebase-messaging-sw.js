importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

self.addEventListener("fetch", () => {
  const urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);
});

const firebaseConfig = {
  apiKey: "AIzaSyCOhLD9SzpRjPZIyrqFxRuJH7fHYJ2B2V0",
  authDomain: 'sanmario2001.firebaseapp.com',
  projectId: 'sanmario2001',
  storageBucket: 'sanmario2001.appspot.com',
  messagingSenderId: '854713213833',
  appId: '1:854713213833:web:613d61dd797514d6bef758',
};

firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel("notifications");
  messaging.onBackgroundMessage(function (payload) {
    channel.postMessage({ payload });
  });
}
