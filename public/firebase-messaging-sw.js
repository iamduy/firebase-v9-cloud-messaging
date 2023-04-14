importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

self.addEventListener("fetch", () => {
  const urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);
});

firebase.initializeApp(self.firebaseConfig);

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel("notifications");
  messaging.onBackgroundMessage(function (payload) {
    channel.postMessage({ payload });
  });
}
