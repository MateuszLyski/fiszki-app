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
    <div className={isActive ? 'fullscreen-locked' : 'scrollable-menu'}>
      {!isActive && (
        <Navbar currentSet={category} onSelect={handleSet} isActive={isActive} />
      )}

      {isActive && (
        <div style={fullScreenContainerStyle}>
          <div style={topBarStyle}>
            <button onClick={() => setIsActive(false)} style={backButtonStyle}>← Wróć</button>
            <span>{index + 1} / {flashcards.length}</span>
          </div>

          <div style={cardAreaStyle}>
            <FlashcardContainer
              key={`${category}-${index}`}
              question={flashcards[index].question}
              answer={flashcards[index].answer}
              direction={direction}
            />
          </div>

          <div style={bottomBarStyle}>
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
        </div>
      )}

    </div>
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
const fullScreenContainerStyle = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 0.75rem',
  boxSizing: 'border-box',
  overflow: 'hidden',
  gap: '0.25rem'
};


const topBarStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: '#ffffff',
  width: '100%',
  justifyContent: 'flex-start'
};

const cardAreaStyle = {
  flexGrow: 1,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '60%' // ograniczenie wysokości fiszki
};


const bottomBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
  marginTop: '1rem'
};


export default App;
