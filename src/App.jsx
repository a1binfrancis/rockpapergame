import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import Confetti from 'react-confetti';
import bgImage from './assets/background-image.jpg';
import trophyImage from './assets/trophy.png';
import rockIcon from './assets/rock.png';
import paperIcon from './assets/paper.png';
import scissorIcon from './assets/scissor.png';


function App() {
  const options = ['Rock', 'Paper', 'Scissors'];

  const [playerPick, setPlayerPick] = useState('Rock');
  const [computerPick, setComputerPick] = useState('Rock');
  const [playerPoints, setPlayerPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [roundResult, setRoundResult] = useState('Your move!');
  const [round, setRound] = useState(0);
  const [matchResult, setMatchResult] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSadness, setShowSadness] = useState(false);

  useEffect(() => {
    if (round === 5) {
      if (playerPoints > computerPoints) {
        setMatchResult('Congratulations, you won!!!');
        setShowConfetti(true);
      } else if (computerPoints > playerPoints) {
        setMatchResult('Computer wins it!');
        setShowSadness(true);
      } else {
        setMatchResult("It's a tie!");
      }
    }
  }, [round, playerPoints, computerPoints]);

  const checkResult = (player, computer) => {
    if (player === computer) {
      setRoundResult("It's a draw. Play on.");
    } else if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      setPlayerPoints(points => points + 1);
      setRoundResult('You won that round!');
    } else {
      setComputerPoints(points => points + 1);
      setRoundResult('Computer got the better of you.');
    }
  };

  const playTurn = (choice) => {
    if (round >= 5) return;

    const compPick = options[Math.floor(Math.random() * 3)];

    setPlayerPick(choice);
    setComputerPick(compPick);
    setRound(prev => prev + 1);

    checkResult(choice, compPick);
  };

  const startNewGame = () => {
    setPlayerPick('Rock');
    setComputerPick('Paper');
    setPlayerPoints(0);
    setComputerPoints(0);
    setRoundResult('Your move!');
    setRound(0);
    setMatchResult('');
    setShowSadness(false);
    setShowConfetti(false);
  };

  const gameIcons = {
    Rock: rockIcon,
    Paper: paperIcon,
    Scissors: scissorIcon
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: '#f2f2f2',
          minHeight: '100vh',
          fontFamily: "'Press Start 2P', cursive",
          padding: '60px 20px',
          overflow: 'auto',
          colorScheme: 'dark'
        }}
      >
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={150}
            recycle={false}
            gravity={0.3}
            friction={0.95}
            wind={0.01}
            colors={['#ff0', '#0ff', '#f0f', '#fff', '#f44']}
            drawShape={ctx => {
              ctx.beginPath();
              ctx.rect(0, 0, 6, 6); 
              ctx.fill();
            }}
          />
        )}
        {showSadness && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            pointerEvents: 'none',
            zIndex: 999
          }} />
        )}
        <Card
          className="text-center shadow"
          style={{
            border: '4px solid #66ccff',
            backgroundColor: 'rgba(17, 0, 34, 0.9)',
            padding: '30px',
            maxWidth: '700px',
            width: '100%'
          }}
        >
          <Card.Body>
            <Card.Title as="h2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1.5rem', marginBottom: '20px', color: '#ffffff' }}>
              Rock Paper Scissors
            </Card.Title>
            {round < 5 && <p style={{ fontSize: '0.7rem', marginBottom: '30px', color: '#ffccff' }}>Round {round + 1} of 5</p>}

            <Row className="mb-4 justify-content-center">
              {options.map((item) => (
                <Col xs="auto" key={item}>
                  <Button
                    variant="dark"
                    size="lg"
                    className="px-4 py-3 border border-white"
                    style={{
                      backgroundColor: '#1a0033',
                      color: '#66ccff',
                      fontFamily: "'Press Start 2P', cursive",
                      fontSize: '2rem',
                      boxShadow: '2px 2px 0 #00ffff'
                    }}
                    onClick={() => playTurn(item)}
                  >
                    <img src={gameIcons[item]} alt={item} style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} />
                  </Button>
                </Col>
              ))}
            </Row>

            <div className="results mb-4">
              <Row className="justify-content-center align-items-center mb-3" style={{ border: '2px dashed #888', padding: '10px' }}>
                <Col xs="auto"><img src={gameIcons[playerPick]} alt="Player" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} /></Col>
                <Col xs="auto"><span style={{ fontSize: '1.2rem', color: '#ffffff' }}>vs</span></Col>
                <Col xs="auto"><img src={gameIcons[computerPick]} alt="Computer" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} /></Col>
              </Row>
              <h3 style={{ fontSize: '0.85rem', color: '#ffffff' }}>{roundResult}</h3>
            </div>

            <div className="scoreboard mb-4">
              <Row className="justify-content-center">
                <Col xs="auto"><h6 style={{ color: '#ffffff' }}>Player: {playerPoints}</h6></Col>
                <Col xs="auto"><h6 style={{ color: '#ffccff' }}>Computer: {computerPoints}</h6></Col>
              </Row>
            </div>

            {matchResult && <h2 className="mt-3" style={{ fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>{matchResult}</h2>}
            {matchResult.toLowerCase().includes('congratulations') && (
              <div className="d-flex justify-content-center mt-3">
                <img
                  src={trophyImage}
                  alt="Trophy"
                  style={{
                    width: '64px',
                    height: '64px',
                    imageRendering: 'pixelated'
                  }}
                />
              </div>
            )}

            <Button
              variant="dark"
              className="mt-3 border border-white"
              style={{
                backgroundColor: '#330033',
                color: '#ff66cc',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.75rem',
                padding: '10px 20px',
                boxShadow: '2px 2px 0 #ff99ff'
              }}
              onClick={startNewGame}
            >
              Reset Match
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;
