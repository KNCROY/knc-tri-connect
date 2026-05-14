// 1. 파이어베이스 핵심 라이브러리 불러오기 (HTML의 <script> 태그 역할을 대신함)
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// 2. ⭐️ 팀장님의 파이어베이스 설정값 (index.html에 있는 firebaseConfig와 똑같이 채워주세요) ⭐️
const firebaseConfig = {
  apiKey: "AIzaSyDtrcEP56bYdLdbQc6epI-BOtl4M9gl5us",
  authDomain: "knc-tri-connect.firebaseapp.com",
  projectId: "knc-tri-connect",
  storageBucket: "knc-tri-connect.firebasestorage.app",
  messagingSenderId: "1021961204804",
  appId: "1:1021961204804:web:c885bff0446407798df811"
};

// 3. 파이어베이스 초기화 및 백그라운드 수신 대기
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // 앱 아이콘이 있다면 띄워줍니다
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
