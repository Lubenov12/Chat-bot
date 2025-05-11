import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const chatButton = document.getElementById("chat-button");
  const chatWindow = document.getElementById("chat-window");
  const closeChat = document.getElementById("close-chat");
  const chatMessages = document.getElementById("chat-messages");
  const chatOptions = document.getElementById("chat-options");
  const popupText = document.getElementById("popup-text");
  let buttonsEnabled = true;

  // Check if this is the first visit
  const hasVisited = localStorage.getItem("hasVisited");
  if (!hasVisited) {
    popupText.classList.remove("hidden");
    localStorage.setItem("hasVisited", "true");
  }

  // Menu categories and items
  const menuItems = {
    "Основни ястия": [
      {
        name: "Пилешка пържола",
        price: "16.90 лв",
        description: "Сочна пилешка пържола с гарнитура от картофи",
      },
      {
        name: "Свинска вратна пържола",
        price: "18.90 лв",
        description: "Крехка свинска пържола с грилирани зеленчуци",
      },
      {
        name: "Риба тон",
        price: "22.90 лв",
        description: "Прясна риба тон със сос и задушени зеленчуци",
      },
    ],
    Салати: [
      {
        name: "Гръцка салата",
        price: "9.90 лв",
        description: "Домати, краставици, маслини, сирене фета",
      },
      {
        name: "Цезар",
        price: "12.90 лв",
        description: "Айсберг, пиле, крутони, пармезан",
      },
      {
        name: "Капрезе",
        price: "11.90 лв",
        description: "Домати, моцарела, босилек, зехтин",
      },
    ],
    Десерти: [
      {
        name: "Тирамису",
        price: "7.90 лв",
        description: "Класическо италианско тирамису",
      },
      {
        name: "Шоколадово суфле",
        price: "8.90 лв",
        description: "Топло шоколадово суфле с ванилов сладолед",
      },
      {
        name: "Чийзкейк",
        price: "6.90 лв",
        description: "Домашен чийзкейк с горски плодове",
      },
    ],
  };

  const foodRecommendations = {
    вегетарианско: ["Зеленчукова лазаня", "Къри с нахут", "Гъби на скара"],
    "без глутен": [
      "Печена сьомга със зеленчуци",
      "Киноа със зеленчуци",
      "Ориз с къри",
    ],
    люто: ["Пиле с люти чушки", "Люто къри", "Пикантна паста"],
  };

  function startShakeInterval() {
    const minInterval = 5000;
    const maxInterval = 6000;

    function shake() {
      if (chatWindow.classList.contains("hidden") && !hasVisited) {
        chatButton.classList.add("shake-animation");
        setTimeout(() => {
          chatButton.classList.remove("shake-animation");
        }, 500);
      }

      const nextInterval =
        Math.random() * (maxInterval - minInterval) + minInterval;
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
    const buttons = chatOptions.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  function enableButtons() {
    buttonsEnabled = true;
    const buttons = chatOptions.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }

  function displayMenuItems(category) {
    const items = menuItems[category];
    let message = `${category}:\n\n`;
    items.forEach((item) => {
      message += `${item.name} - ${item.price}\n${item.description}\n\n`;
    });
    addMessage(message, "bot");
  }

  function updateButtons(options) {
    chatOptions.innerHTML = "";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.className =
        "option-button bg-blue-500 text-white hover:bg-blue-600";
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
        updateButtons(["Покажи меню", "Препоръки", "Задай въпрос"]);
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
        updateButtons(["Покажи меню", "Препоръки", "Задай въпрос"]);
        break;
      default:
        if (option.startsWith("За ")) {
          addMessage(
            "Ще ви свържем с наш консултант за повече информация.",
            "bot"
          );
          updateButtons(["Покажи меню", "Препоръки", "Задай въпрос"]);
        }
    }

    enableButtons();
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "chat-message",
      sender === "user" ? "user-message" : "bot-message"
    );
    messageDiv.style.whiteSpace = "pre-line";
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  updateButtons(["Покажи меню", "Препоръки", "Задай въпрос"]);
});