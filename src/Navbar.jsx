export default function Navbar({ currentSet, onSelect, isActive, onToggleTheme }) {
  const sets = ['Europa', 'Azja', 'Ameryka', 'Długie', 'Ubezpieczenia'];

  return (
    <nav style={navStyle}>
        <div style={navHeaderStyle}>
            <h1 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-color)' }}>
            Fiszki o krajach
            </h1>
            <button onClick={onToggleTheme} style={themeButtonStyle}>
            🌙 / ☀️
            </button>
        </div>

      {!isActive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sets.map((set) => (
            <button
              key={set}
              onClick={() => onSelect(set.toLowerCase())}
              style={{
                background: 'transparent',
                color: 'var(--text-color)',
                border: currentSet === set.toLowerCase() ? '2px solid var(--text-color)' : '1px solid #999999',

                padding: '0.4rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: '160px'
              }}
            >
              {set}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}


const navStyle = {
  width: '100%',
  maxWidth: '400px', // lub 90vw, jeśli chcesz maks. 90% szerokości ekranu
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderBottom: '1px solid #444'
};

const navHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '1rem'
};

const themeButtonStyle = {
  backgroundColor: 'var(--button-bg)',
  color: 'var(--text-color)',
  border: '1px solid #888',
  borderRadius: '6px',
  padding: '0.3rem 0.6rem',
  fontSize: '1rem',
  cursor: 'pointer'
};
