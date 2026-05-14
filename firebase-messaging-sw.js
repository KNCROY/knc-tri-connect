<!-- 📱 모바일 웹 푸시 알림 전용 독립 코드 (PC 버전 영향 제로) -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"></script>

<!-- 스마트폰에서만 보이는 알림 켜기 버튼 -->
<button id="btnEnablePush" onclick="enableWebPush()" style="display:none; position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:9999; padding:12px 24px; background:var(--accent-color); color:#fff; border:none; border-radius:30px; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2);">
  🔔 스마트폰 알림 켜기
</button>

<script>
  // 오토핫키(PC)가 아닌 진짜 브라우저(스마트폰 등)일 때만 버튼을 보여줍니다.
  if (!navigator.userAgent.includes("AutoHotkey")) {
    // 3초 뒤에 알림 켜기 버튼이 스르륵 나타납니다.
    setTimeout(() => {
      document.getElementById('btnEnablePush').style.display = 'block';
    }, 3000);
  }

  function enableWebPush() {
    const messaging = firebase.messaging();
    
    // ⭐️ 2번 단계에서 복사한 VAPID 키를 아래에 넣습니다 ⭐️
    messaging.getToken({ vapidKey: '여기에_복사한_VAPID_키를_붙여넣으세요' }).then((currentToken) => {
      if (currentToken) {
        // 알림 허용 시, 파이어베이스 DB 'tokens' 폴더에 본인 이름으로 토큰 저장
        fdb.ref('tokens/' + currentUser).set(currentToken);
        alert("모바일 알림 설정이 완료되었습니다! 이제 앱을 닫아도 알림이 옵니다.");
        document.getElementById('btnEnablePush').style.display = 'none';
      }
    }).catch((err) => {
      alert("알림 권한을 허용해 주셔야 합니다.");
    });
  }
</script>
