// 1. 파이어베이스 핵심 라이브러리 불러오기 (HTML의 <script> 태그 역할을 대신함)
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// 2. ⭐️ 팀장님의 파이어베이스 설정값 (누락되었던 databaseURL 정식 추가) ⭐️
const firebaseConfig = {
  apiKey: "AIzaSyDtrcEP56bYdLdbQc6epI-BOtl4M9gl5us",
  authDomain: "knc-tri-connect.firebaseapp.com",
  databaseURL: "https://knc-tri-connect-default-rtdb.firebaseio.com",
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
    body: payload.notification.body
    // ⭐️ 정확한 조치: 에러를 유발하던 icon 속성을 완전히 삭제하여 순수 텍스트 알림만 강제 출력되도록 수정함
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
