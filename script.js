document.addEventListener('DOMContentLoaded', () => {
  const chatButton = document.getElementById('chat-button');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatMessages = document.getElementById('chat-messages');
  const chatOptions = document.getElementById('chat-options');

  // Add shake animation every 5-6 seconds
  function startShakeInterval() {
    const minInterval = 5000;
    const maxInterval = 6000;
    
    function shake() {
      if (chatWindow.classList.contains('hidden')) {
        chatButton.classList.add('shake-animation');
        setTimeout(() => {
          chatButton.classList.remove('shake-animation');
        }, 500);
      }
      
      const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval;
      setTimeout(shake, nextInterval);
    }
    
    setTimeout(shake, 5000);
  }

  startShakeInterval();

  // Toggle chat window
  chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
  });

  // Close chat window
  closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  // Handle option buttons
  const optionButtons = chatOptions.getElementsByTagName('button');
  Array.from(optionButtons).forEach(button => {
    button.addEventListener('click', () => {
      const option = button.textContent;
      addMessage(option, 'user');

      switch (option) {
        case 'Покажи меню':
          addMessage('Ето днешните категории в менюто: Основни ястия, Салати, Десерти', 'bot');
          break;
        case 'Препоръки':
          addMessage('Имате ли хранителни предпочитания или алергии? (Вегетарианско, Без глутен, Люто)', 'bot');
          break;
        case 'Задай въпрос':
          addMessage('Какво искате да знаете за нашата храна?', 'bot');
          break;
      }
    });
  });

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});