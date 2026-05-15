importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDtrcEP56bYdLdbQc6epI-BOtl4M9gl5us",
  authDomain: "knc-tri-connect.firebaseapp.com",
  databaseURL: "https://knc-tri-connect-default-rtdb.firebaseio.com",
  projectId: "knc-tri-connect",
  storageBucket: "knc-tri-connect.firebasestorage.app",
  messagingSenderId: "1021961204804",
  appId: "1:1021961204804:web:c885bff0446407798df811"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 🚀 파이어베이스의 불안정한 기능을 버리고, 브라우저 순정 푸시 이벤트로 직결!
self.addEventListener('push', function(event) {
  let title = "📩 [KNC] 알림";
  let body = "새 메시지가 도착했습니다.";

  if (event.data) {
    const payload = event.data.json();
    if (payload.notification) {
      title = payload.notification.title;
      body = payload.notification.body;
    }
  }

  // 아이콘 에러 원천 차단
  const options = {
    body: body
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 🚀 알림을 클릭하면 KNC 앱으로 바로 이동하게 만드는 보너스 기능
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://kncroy.github.io/knc-tri-connect/'));
});
