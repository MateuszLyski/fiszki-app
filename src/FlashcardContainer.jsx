import { useEffect, useState } from 'react';
import Flashcard from './Flashcard';

export default function FlashcardContainer({ question, answer, direction }) {
  const [currentCard, setCurrentCard] = useState({ question, answer });
  const [prevCard, setPrevCard] = useState(null);
  const [animDirection, setAnimDirection] = useState(direction);

  useEffect(() => {
    setPrevCard(currentCard);
    setCurrentCard({ question, answer });
    setAnimDirection(direction);
  }, [question, answer, direction]);

  return (
    <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '480px',
        position: 'relative', // zostaje, ale...
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      {prevCard && (
        <Flashcard
          key={prevCard.question}
          question={prevCard.question}
          answer={prevCard.answer}
          flipped={false}
          className={animDirection === 'next' ? 'slide-out-left' : 'slide-out-right'}
        />
      )}
      {currentCard && (
        <Flashcard
          key={currentCard.question}
          question={currentCard.question}
          answer={currentCard.answer}
          flipped={false}
          className={animDirection === 'next' ? 'slide-in-right' : 'slide-in-left'}
        />
      )}
    </div>
  );
}
