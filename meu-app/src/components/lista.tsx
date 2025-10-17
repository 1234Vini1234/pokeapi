import React from 'react'

const PokemonList = ({ pokemons, onSelect, loading }: { pokemons: any[], onSelect: (name: string) => void, loading: boolean }) => {
  if (loading && pokemons.length === 0) {
    return <p>Carregando...</p>
  }

  if (pokemons.length === 0) {
    return <p>Nenhum Pokémon encontrado.</p>
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '12px'
    }}>
      {pokemons.map(p => (
        <div key={p.name} style={{
          border: '1px solid #0fec1aff',
          borderRadius: '8px',
          padding: '12px',
          textAlign: 'center',
          cursor: 'pointer'
        }} onClick={() => onSelect(p.name)}>
          <img src={p.image} alt={p.name} style={{ width: '96px', height: '96px' }} />
          <h3 style={{ textTransform: 'capitalize', margin: '8px 0 4px 0' }}>{p.name}</h3>
          <p style={{ margin: 0 }}>{p.types && p.types[0]}</p>
        </div>
      ))}
    </div>
  )
}

export default PokemonList
