document.addEventListener('DOMContentLoaded', () => {
  const chatButton = document.getElementById('chat-button');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatMessages = document.getElementById('chat-messages');
  const chatOptions = document.getElementById('chat-options');
  let buttonsEnabled = true;

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
    
    shake();
  }

  startShakeInterval();

  chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
  });

  closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  const foodRecommendations = {
    'вегетарианско': ['Зеленчукова лазаня', 'Къри с нахут', 'Гъби на скара'],
    'без глутен': ['Печена сьомга със зеленчуци', 'Киноа със зеленчуци', 'Ориз с къри'],
    'люто': ['Пиле с люти чушки', 'Люто къри', 'Пикантна паста']
  };

  function disableButtons() {
    buttonsEnabled = false;
    const buttons = chatOptions.querySelectorAll('button');
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

  function enableButtons() {
    buttonsEnabled = true;
    const buttons = chatOptions.querySelectorAll('button');
    buttons.forEach(button => {
      button.disabled = false;
    });
  }

  function updateButtons(options) {
    chatOptions.innerHTML = '';
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-button bg-blue-500 text-white hover:bg-blue-600';
      button.textContent = option;
      button.addEventListener('click', handleOptionClick);
      button.disabled = !buttonsEnabled;
      chatOptions.appendChild(button);
    });
  }

  function simulateBotTyping() {
    return new Promise(resolve => {
      const typingTime = Math.random() * 1000 + 500; // Random typing time between 0.5-1.5 seconds
      setTimeout(resolve, typingTime);
    });
  }

  async function handleOptionClick(event) {
    if (!buttonsEnabled) return;
    
    const option = event.target.textContent;
    addMessage(option, 'user');
    disableButtons();

    await simulateBotTyping();

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
    
    enableButtons();
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  updateButtons(['Покажи меню', 'Препоръки', 'Задай въпрос']);
});