import './style.css';
import createGame from './modules/createGame.js';
import {
  apiUrl,
  getGameScores,
  saveGameScore,
  sortRequest,
} from './modules/app.js';

const refreshButton = document.querySelector('#refresh');
const formElement = document.querySelector('form');

let gameId;

const createGameApi = async () => {
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
createGameApi();

// Refresh
refreshButton.addEventListener('click', async () => {
  let scores = await getGameScores(gameId);
  scores = sortRequest(scores);
  const scoresList = document.getElementById('score-list');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const tr = createGame({ user: score.user, score: score.score });
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
  await saveGameScore(gameId, { name, score });
  formElement.reset();
});
