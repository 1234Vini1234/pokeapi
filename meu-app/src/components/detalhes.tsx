import React from 'react'
import ReactDOM from 'react-dom'

type DetalhesProps = {
  pokemon: any
  onClose: () => void
}

const typeStyles: Record<string, { bg: string; border: string; accent: string }> = {
  grass:   { bg: 'linear-gradient(145deg, #A8E063, #56AB2F)', border: '#6DBE45', accent: '#d9ffb3' },
  fire:    { bg: 'linear-gradient(145deg, #FF512F, #F09819)', border: '#FF6B3D', accent: '#fff0e6' },
  water:   { bg: 'linear-gradient(145deg, #2193b0, #6dd5ed)', border: '#56C1FF', accent: '#e0f7ff' },
  bug:     { bg: 'linear-gradient(145deg, #A8B920, #788D0C)', border: '#A8B920', accent: '#f3f7cc' },
  poison:  { bg: 'linear-gradient(145deg, #B621FE, #1FD1F9)', border: '#9a3efc', accent: '#f2e6ff' },
  flying:  { bg: 'linear-gradient(145deg, #83a4d4, #b6fbff)', border: '#6c9cff', accent: '#eaf4ff' },
  normal:  { bg: 'linear-gradient(145deg, #D7D2CC, #304352)', border: '#aaa', accent: '#f7f7f7' },
  electric:{ bg: 'linear-gradient(145deg, #F7B733, #FC4A1A)', border: '#ffcc00', accent: '#fff6cc' },
  ground:  { bg: 'linear-gradient(145deg, #C79081, #dfa579)', border: '#b37a5b', accent: '#fff3e6' },
  fairy:   { bg: 'linear-gradient(145deg, #ff9a9e, #fecfef)', border: '#ff80bf', accent: '#fff0fa' },
  fighting:{ bg: 'linear-gradient(145deg, #C04848, #480048)', border: '#b04141', accent: '#ffe0e0' },
  psychic: { bg: 'linear-gradient(145deg, #DA22FF, #9733EE)', border: '#c358ff', accent: '#f5e0ff' },
  rock:    { bg: 'linear-gradient(145deg, #3C3B3F, #605C3C)', border: '#9e8f6a', accent: '#eee7da' },
  ghost:   { bg: 'linear-gradient(145deg, #654ea3, #eaafc8)', border: '#a27ec2', accent: '#f7f0fa' },
  ice:     { bg: 'linear-gradient(145deg, #83a4d4, #b6fbff)', border: '#7cdfff', accent: '#f0fbff' },
  dragon:  { bg: 'linear-gradient(145deg, #20002c, #cbb4d4)', border: '#9b4de0', accent: '#f0e8ff' },
  all:     { bg: 'linear-gradient(145deg, #f7d860, #f5a623)', border: '#e6b800', accent: '#fff9c4' },
}

const ModalContent: React.FC<DetalhesProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null

  const mainType = pokemon.types?.[0] ?? 'all'
  const style = typeStyles[mainType] || typeStyles.all

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: style.bg,
          border: `4px solid ${style.border}`,
          borderRadius: 18,
          padding: 24,
          minWidth: 320,
          maxWidth: 400,
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          boxShadow: `0 10px 40px rgba(0,0,0,0.5), inset 0 0 15px ${style.accent}`,
          transform: 'scale(0.9)',
          animation: 'cardPop 0.35s ease forwards',
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 8,
            right: 12,
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '50%',
            width: 28,
            height: 28,
            fontSize: 18,
            color: '#fff',
            cursor: 'pointer',
            transition: '0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >
          ✕
        </button>

        <h2
          style={{
            textTransform: 'capitalize',
            marginBottom: 8,
            textShadow: `0 0 10px ${style.accent}, 0 0 20px ${style.border}`,
          }}
        >
          {pokemon.name}
        </h2>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{
            width: 120,
            height: 120,
            objectFit: 'contain',
            marginBottom: 12,
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
          }}
        />

        <p><strong>Tipo:</strong> {pokemon.types.join(', ')}</p>
        <p><strong>Peso:</strong> {pokemon.weight} kg</p>
        <p><strong>Altura:</strong> {pokemon.height} m</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities?.map((a: any) => a.ability.name).join(', ')}</p>

        <div
          style={{
            textAlign: 'left',
            marginTop: 12,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: '10px 14px',
          }}
        >
          <strong>Estatísticas:</strong>
          <ul style={{ marginTop: 6, paddingLeft: 16 }}>
            {pokemon.stats?.map((stat: any) => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes cardPop {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const Detalhes: React.FC<DetalhesProps> = (props) => {
  if (typeof document === 'undefined') return null
  return ReactDOM.createPortal(<ModalContent {...props} />, document.body)
}

export default Detalhes
