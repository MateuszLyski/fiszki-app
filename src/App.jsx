import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import FlashcardContainer from './FlashcardContainer';

// statyczne importy danych
import europa from './data/europe.json';
import azja from './data/asia.json';
import ameryka from './data/america.json';
import długie from './data/dlugie.json';

const allSets = {
  europa,
  azja,
  ameryka,
  długie
};

function App() {
  const [category, setCategory] = useState('europa');
  const [isActive, setIsActive] = useState(false); // czy użytkownik wszedł w zestaw
  const [flashcards, setFlashcards] = useState(allSets[category]);
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [direction, setDirection] = useState('next');
  const handleSet = (name) => {
  setCategory(name);
  setIsActive(true); // przełącza widok na fiszki
  };

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
      {!isActive && (
        <Navbar currentSet={category} onSelect={handleSet} isActive={isActive} />
      )}

      {isActive && (
        <div style={containerStyle}>
          {isFinished ? (
            <>
              <h2 style={{ color: '#ffffff' }}>Gratulacje! To już wszystkie fiszki 🎉</h2>
              <button onClick={restart} style={buttonStyle}>Zacznij od początku</button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#ffffff' }}>
                <button onClick={() => setIsActive(false)} style={backButtonStyle}>← Wróć</button>
                {index + 1} / {flashcards.length}
              </div>

              <FlashcardContainer
                key={`${category}-${index}`}
                question={flashcards[index].question}
                answer={flashcards[index].answer}
                direction={direction}
              />

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  onClick={prevCard}
                  disabled={index === 0}
                  style={{ ...buttonStyle, opacity: index === 0 ? 0.5 : 1 }}
                >
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
      )}
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
  margin: '0 auto',
  padding: '0 1rem',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '100vw',
  overflow: 'hidden'
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

const backButtonStyle = {
  background: 'transparent',
  color: '#ffffff',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default App;
