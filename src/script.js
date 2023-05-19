import './style.css';
import createGame from './modules/createGame.js'
import {
  getGameScores,
  saveGameScore,
} from './modules/app.js';

const refreshButton = document.querySelector('#refresh');
const formElement = document.querySelector('form');

const apiUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

let gameId;
const createGame = async () => {
  const localGameId = localStorage.getItem('gameId');
  if (localGameId) {
    gameId = localGameId;
  } else {
    const response = await fetch(`${apiUrl}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Game-ID' }),
    });
    const obj = await response.json();
    gameId = obj.result;
    localStorage.setItem('gameId', gameId);
  }
};
createGame();

// Refresh
refreshButton.addEventListener('click', async () => {
  const scores = await getGameScores(gameId);
  const scoresList = document.getElementById('score-list');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const tr = createGame({score.user, score.score});
    scoresList.appendChild(tr);
  });
});

// Submit
formElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value.trim();
  const score = scoreInput.value;
  await saveGameScore(gameId, {name, score});
  formElement.reset();
});
