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
    
    shake(); // Start immediately
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

  // Food recommendations based on preferences
  const foodRecommendations = {
    'вегетарианско': ['Зеленчукова лазаня', 'Къри с нахут', 'Гъби на скара'],
    'без глутен': ['Печена сьомга със зеленчуци', 'Киноа със зеленчуци', 'Ориз с къри'],
    'люто': ['Пиле с люти чушки', 'Люто къри', 'Пикантна паста']
  };

  function updateButtons(options) {
    chatOptions.innerHTML = '';
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'w-full mb-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors';
      button.textContent = option;
      button.addEventListener('click', handleOptionClick);
      chatOptions.appendChild(button);
    });
  }

  function handleOptionClick(event) {
    const option = event.target.textContent;
    addMessage(option, 'user');

    switch (option) {
      case 'Покажи меню':
        addMessage('Ето днешните категории в менюто: Основни ястия, Салати, Десерти', 'bot');
        updateButtons(['Основни ястия', 'Салати', 'Десерти', 'Назад']);
        break;
      case 'Препоръки':
        addMessage('Имате ли хранителни предпочитания?', 'bot');
        updateButtons(['Вегетарианско', 'Без глутен', 'Люто', 'Назад']);
        break;
      case 'Задай въпрос':
        addMessage('Какво искате да знаете за нашата храна?', 'bot');
        updateButtons(['За алергени', 'За съставки', 'За цени', 'Назад']);
        break;
      case 'Назад':
        updateButtons(['Покажи меню', 'Препоръки', 'Задай въпрос']);
        break;
      case 'Вегетарианско':
      case 'Без глутен':
      case 'Люто':
        const recommendations = foodRecommendations[option.toLowerCase()];
        addMessage(`Ето нашите препоръки за вас: ${recommendations.join(', ')}`, 'bot');
        updateButtons(['Покажи меню', 'Препоръки', 'Задай въпрос']);
        break;
      default:
        if (option.startsWith('За ')) {
          addMessage('Ще ви свържем с наш консултант за повече информация.', 'bot');
          updateButtons(['Покажи меню', 'Препоръки', 'Задай въпрос']);
        }
    }
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Initialize default buttons
  updateButtons(['Покажи меню', 'Препоръки', 'Задай въпрос']);
});