const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const getGameScores = async (gameId) =>
  const response = await fetch(`${apiUrl}games/${gameId}/scores/`);
  const data = await response.json();
  return data.result;
};

const saveGameScore = async (gameId, { name, score }) => {
  const response = await fetch(`${apiUrl}games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score }),
  });
  const data = await response.json();
  return data.result;
};

const sortRequest = (result) => {
  const scores = result.sort((x, y) => y.score - x.score);
  return scores;
};

export {
  getGameScores,
  saveGameScore,
  sortRequest,
  apiUrl,
}