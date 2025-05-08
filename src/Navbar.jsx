export default function Navbar({ currentSet, onSelect }) {
  const sets = ['Europa', 'Azja', 'Ameryka'];

  return (
    <nav style={navStyle}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#ffffff' }}>Fiszki o krajach</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sets.map((set) => (
          <button
            key={set}
            onClick={() => onSelect(set.toLowerCase())}
            style={{
              background: 'transparent',
              color: currentSet === set.toLowerCase() ? '#ffffff' : '#cccccc',
              border: `1px solid ${currentSet === set.toLowerCase() ? '#ffffff' : '#555555'}`,
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
    </nav>
  );
}

const navStyle = {
  width: '100%',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderBottom: '1px solid #444'
};
