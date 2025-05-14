// Chat bot logic
export function initChatBot(menuItems, foodRecommendations) {
  const chatButton = document.getElementById("chat-button");
  const chatWindow = document.getElementById("chat-window");
  const closeChat = document.getElementById("close-chat");
  const chatMessages = document.getElementById("chat-messages");
  const chatOptions = document.getElementById("chat-options");
  const popupText = document.getElementById("popup-text");
  const chatWidget = document.getElementById("chat-widget");
  let buttonsEnabled = true;

  // Show popup text initially
  popupText.classList.remove("hidden");

  function startShakeInterval() {
    function shake() {
      if (chatWindow.classList.contains("hidden")) {
        chatWidget.classList.add("shake-animation");
        setTimeout(() => {
          chatWidget.classList.remove("shake-animation");
        }, 500);
      }

      const nextInterval = Math.random() * 1000 + 5000;
      setTimeout(shake, nextInterval);
    }

    shake();
  }

  startShakeInterval();

  chatButton.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
    popupText.classList.add("hidden");
  });

  closeChat.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
  });

  function disableButtons() {
    buttonsEnabled = false;
    chatOptions.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
  }

  function enableButtons() {
    buttonsEnabled = true;
    chatOptions.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
  }

  function displayMenuItems(category) {
    const items = menuItems[category];
    let message = `🥗 Това са 3-те най-предпочитани ${category} от нашите клиенти:\n\n`;
    items.forEach((item) => {
      message += `${item.name} - ${item.price}\n${item.description}\n\n`;
    });
    addMessage(message, "bot");
  }

  function updateButtons(options) {
    chatOptions.innerHTML = "";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "option-button text-white";
      button.textContent = option;
      button.addEventListener("click", handleOptionClick);
      button.disabled = !buttonsEnabled;
      chatOptions.appendChild(button);
    });
  }

  function simulateBotTyping() {
    return new Promise((resolve) => {
      const typingTime = Math.random() * 1000 + 500;
      setTimeout(resolve, typingTime);
    });
  }

  async function handleOptionClick(event) {
    if (!buttonsEnabled) return;

    const option = event.target.textContent;
    addMessage(option, "user");
    disableButtons();

    await simulateBotTyping();

    switch (option) {
      case "Покажи меню":
        addMessage("Изберете категория от менюто:", "bot");
        updateButtons(["Основни ястия", "Салати", "Десерти", "Назад"]);
        break;
      case "Основни ястия":
      case "Салати":
      case "Десерти":
        displayMenuItems(option);
        break;
      case "Препоръки":
        addMessage("Имате ли хранителни предпочитания?", "bot");
        updateButtons(["Вегетарианско", "Без глутен", "Люто", "Назад"]);
        break;
      case "Задай въпрос":
        addMessage("Какво искате да знаете за нашата храна?", "bot");
        updateButtons(["За алергени", "За съставки", "За цени", "Назад"]);
        break;
      case "Назад":
        updateButtons(["Покажи меню", "Препоръки", "Задай въпрос"]);
        break;
      case "Вегетарианско":
      case "Без глутен":
      case "Люто":
        const recommendations = foodRecommendations[option.toLowerCase()];
        addMessage(
          `Ето нашите препоръки за вас: ${recommendations.join(", ")}`,
          "bot"
        );
        updateButtons(["Вегетарианско", "Без глутен", "Люто", "Назад"]);
        break;
      default:
        if (option.startsWith("За ")) {
          addMessage(
            "Ще ви свържем с наш консултант за повече информация.",
            "bot"
          );
          updateButtons(["За алергени", "За съставки", "За цени", "Назад"]);
        }
    }

    enableButtons();
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "chat-message",
      sender === "user" ? "user-message" : "bot-message",
      "text-gray-700"
    );
    messageDiv.style.whiteSpace = "pre-line";
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  updateButtons(["Покажи меню", "Препоръки", "Задай въпрос"]);
}
