import { initChatBot } from './chatBot.js';
import { menuItems, foodRecommendations } from './data.js';
import '../css/styles.css';

document.addEventListener("DOMContentLoaded", () => {
  initChatBot(menuItems, foodRecommendations);
});