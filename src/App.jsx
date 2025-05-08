import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import FlashcardContainer from './FlashcardContainer';

// statyczne importy danych
import europa from './data/europe.json';
import azja from './data/asia.json';
import ameryka from './data/america.json';

const allSets = {
  europa,
  azja,
  ameryka
};

function App() {
  const [category, setCategory] = useState('europa');
  const [flashcards, setFlashcards] = useState(allSets[category]);
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    setFlashcards(allSets[category]);
    setIndex(0);
    setIsFinished(false);
    setDirection('next');
  }, [category]);

  const nextCard = () => {
    if (index < flashcards.length - 1) {
      setDirection('next');
      setIndex(index + 1);
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setDirection('prev');
      setIndex(index - 1);
    }
  };

  const finish = () => setIsFinished(true);
  const restart = () => {
    setIndex(0);
    setIsFinished(false);
  };

  return (
    <>
      <Navbar currentSet={category} onSelect={setCategory} />
      <div style={containerStyle}>
        {isFinished ? (
          <>
            <h2 style={{ color: '#ffffff' }}>Gratulacje! To już wszystkie fiszki 🎉</h2>
            <button onClick={restart} style={buttonStyle}>Zacznij od początku</button>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1.2rem', color: '#ffffff' }}>
              {index + 1} / {flashcards.length}
            </div>

            <FlashcardContainer
              key={`${category}-${index}`}
              question={flashcards[index].question}
              answer={flashcards[index].answer}
              direction={direction}
            />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={prevCard} disabled={index === 0}
                style={{ ...buttonStyle, opacity: index === 0 ? 0.5 : 1 }}>
                Poprzednia
              </button>
              {index === flashcards.length - 1 ? (
                <button onClick={finish} style={buttonStyle}>Zakończ</button>
              ) : (
                <button onClick={nextCard} style={buttonStyle}>Następna</button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const containerStyle = {
  minHeight: 'calc(100vh - 80px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.5rem',
  margin: 0,
  overflow: 'hidden',
  maxWidth: '100vw',
  padding: '1rem'
};

const buttonStyle = {
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  backgroundColor: '#ffffff',
  color: '#000000',
  border: '1px solid #999999',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default App;
