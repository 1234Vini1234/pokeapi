// components/modal.tsx
import React from 'react'
import ReactDOM from 'react-dom'

type DetalhesProps = {
  pokemon: any
  onClose: () => void
}

const ModalContent: React.FC<DetalhesProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0, // top:0; right:0; bottom:0; left:0
        background: 'rgba(0,0,0,0.6)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          // cartão estilo "carta Pokémon"
          background: 'linear-gradient(145deg, #f7d860 0%, #f5a623 30%, #ffcf40 60%, #fff9c4 100%)',
          borderRadius: 16,
          padding: 24,
          minWidth: 320,
          maxWidth: '90vw',
          boxShadow: '0 10px 40px rgba(0,0,0,0.45), inset 0 0 10px rgba(255,255,255,0.4)',
          border: '4px solid #e6b800',
          color: '#222',
          textAlign: 'center',
          position: 'relative',
          transform: 'scale(0.95)',
          animation: 'modalZoomIn 240ms forwards'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 8,
            right: 12,
            background: 'transparent',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer'
          }}
          aria-label="Fechar"
        >
          ✕
        </button>

        <h2 style={{ textTransform: 'capitalize', marginBottom: 8 }}>{pokemon.name}</h2>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 8 }}
        />

        <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
        <p><strong>Peso:</strong> {pokemon.weight} kg</p>
        <p><strong>Altura:</strong> {pokemon.height} m</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities?.map((a: any) => a.ability.name).join(', ')}</p>

        <div style={{ textAlign: 'left', marginTop: 12 }}>
          <strong>Estatísticas:</strong>
          <ul>
            {pokemon.stats?.map((stat: any) => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
      </div>

      {}
      <style>{`
        @keyframes modalZoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const Detalhes: React.FC<DetalhesProps> = (props) => {
  
  if (typeof document === 'undefined') return null

  return ReactDOM.createPortal(
    <ModalContent {...props} />,
    document.body
  )
}

export default Detalhes
