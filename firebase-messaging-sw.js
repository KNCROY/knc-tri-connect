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

  // 아이콘 에러 차단 및 중복 알림 하나로 묶기(tag)
  const options = {
    body: body,
    tag: 'knc-notification', // ⭐️ 알림이 3~4번씩 우다다다 오는 것을 방지합니다.
    renotify: true           // ⭐️ 새로운 알림이 올 때마다 폰이 다시 울리게 합니다.
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 🚀 알림을 클릭하면 KNC 앱으로 바로 이동
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://kncroy.github.io/knc-tri-connect/'));
});

// ⭐️ [핵심] 안드로이드 PWA '앱 설치' 버튼 활성화를 위한 필수 통과 조건
self.addEventListener('fetch', function(event) {
  // 구글 크롬이 "이 사이트는 오프라인 기능(fetch)이 있구나!" 하고 착각하게 만드는 더미 코드입니다.
  // 아무 내용이 없어도 이 코드가 존재한다는 사실 자체가 '앱 설치' 버튼을 띄우는 열쇠가 됩니다.
});
