![ekran](https://github.com/volkanbasaran1/chat-app/assets/76842256/3713a459-41fb-4615-8976-d45905ddec72)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="chat-container"></div>
    <div id="message-input">
        <input type="text" id="message" placeholder="Mesajınızı yazın...">
        <button onclick="sendMessage()">Gönder</button>
    </div>
    <!-- Firebase JavaScript kütüphanesi -->
    <script src="https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"></script>
    <script>
        // Firebase konfigürasyonu (Firebase Console'dan alınmalıdır)
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        // Firebase uygulamasını başlat
        firebase.initializeApp(firebaseConfig);
        // Firestore referansını al
        const db = firebase.firestore();
        // Mesajları saklamak için koleksiyon
        const messagesCollection = db.collection('messages');
        // Mesajları dinleme fonksiyonu
        function listenForMessages() {
            messagesCollection.orderBy('timestamp').onSnapshot(snapshot => {
                const chatContainer = document.getElementById('chat-container');
                chatContainer.innerHTML = '';
                snapshot.forEach(doc => {
                    const messageData = doc.data();
                    const messageElement = document.createElement('p');
                    messageElement.textContent = `${messageData.sender}: ${messageData.message}`;
                    chatContainer.appendChild(messageElement);
                });
                // Otomatik olarak en alttaki mesajı görüntüle
                chatContainer.scrollTop = chatContainer.scrollHeight;
            });
        }
        // Mesaj gönderme fonksiyonu
        function sendMessage() {
            const messageInput = document.getElementById('message');
            const messageText = messageInput.value;
            if (messageText.trim() !== '') {
                // Firestore'a yeni mesaj ekle
                messagesCollection.add({
                    sender: 'User', // Mesajı kimin gönderdiğini belirleyin
                    message: messageText,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                // Mesaj gönderildikten sonra giriş kutusunu temizle
                messageInput.value = '';
            }
        }
        // Sayfa yüklendiğinde dinlemeyi başlat
        window.onload = () => {
            listenForMessages();
        };
    </script>
</body>
</html>
