import React, { useState, useEffect } from 'react';
import roomData from './roomData.json';

const Game = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...roomData].sort(() => 0.5 - Math.random());
    setRooms(shuffled.slice(0, 10));
    setCurrentRoomIndex(0);
    setScore(0);
    setGameOver(false);
    setFeedback('');
  };

  const handleGuess = () => {
    const currentRoom = rooms[currentRoomIndex];
    if (userGuess.toLowerCase() === currentRoom.room_number.toLowerCase()) {
      setScore(score + 10);
      setFeedback('Correct! Well done!');
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback(`Sorry, the correct answer was ${currentRoom.room_number}.`);
    }

    if (currentRoomIndex + 1 >= rooms.length) {
      setGameOver(true);
    } else {
      setCurrentRoomIndex(currentRoomIndex + 1);
    }

    setUserGuess('');
  };

  const currentRoom = rooms[currentRoomIndex];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>@Joythi</h1>
      {!gameOver ? (
        <div>
          {currentRoom && (
            <>
              <img src={currentRoom.image_url} alt="Room" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              <p>Score: {score} | Question: {currentRoomIndex + 1}/{rooms.length}</p>
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter room number"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />
              <button onClick={handleGuess} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Submit Guess
              </button>
              {feedback && <p>{feedback}</p>}
            </>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <button onClick={initializeGame} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;