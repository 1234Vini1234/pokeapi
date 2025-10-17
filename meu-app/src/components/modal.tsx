import React from 'react'

type DetalhesProps = {
  pokemon: any
  onClose: () => void
}

const Detalhes: React.FC<DetalhesProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #ffffffff, #e11d48)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0)', 
          padding: '24px',
          borderRadius: '16px',
          minWidth: '320px',
          maxWidth: '90vw',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          color: '#222',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            fontSize: '18px',
            background: 'transparent',
            border: 'none',
            color: '#f30b0bff',
            cursor: 'pointer'
          }}
        >
          ✖
        </button>

        <h2 style={{ textTransform: 'capitalize', marginBottom: '8px' }}>{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '120px', height: '120px' }} />

        <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
        <p><strong>Peso:</strong> {pokemon.weight} kg</p>
        <p><strong>Altura:</strong> {pokemon.height} m</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities?.map((a: any) => a.ability.name).join(', ')}</p>

        <div style={{ textAlign: 'left', marginTop: '12px' }}>
          <strong>Estatísticas:</strong>
          <ul>
            {pokemon.stats?.map((stat: any) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Detalhes
