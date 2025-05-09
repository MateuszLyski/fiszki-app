import { useState } from 'react';

export default function Flashcard({ question, answer, flipped = false, className = '' }) {
  const [isFlipped, setIsFlipped] = useState(flipped);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className={className}
      style={{
        width: '100%',
        maxWidth: '400px',
        height: '400px',
        perspective: '1000px',
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        <div style={{ ...cardFaceStyle, zIndex: 2 }}>
          {question}
        </div>
        <div
          style={{
            ...cardFaceStyle,
            transform: 'rotateY(180deg)',
            backgroundColor: '#dff0d8'
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

const cardFaceStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '12px',
  backgroundColor: '#e8f5e9',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backfaceVisibility: 'hidden',
  padding: '1rem',
  textAlign: 'center',
  lineHeight: '1.4',
  fontSize: '1.25rem',
  boxSizing: 'border-box',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  color: '#000000' // ← dodaj to
};

