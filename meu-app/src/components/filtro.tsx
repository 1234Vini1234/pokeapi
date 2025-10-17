import React from 'react'

const tipos = [
  'all', 'grass', 'fire', 'water', 'bug', 'poison', 'flying', 'normal', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'
]

const FiltroTipo = ({ tipoSelecionado, onTipoChange }: { tipoSelecionado: string, onTipoChange: (tipo: string) => void }) => (
  <select
    value={tipoSelecionado}
    onChange={e => onTipoChange(e.target.value)}
    style={{ marginBottom: '16px', padding: '8px', borderRadius: '8px', border: '2px solid #d32f2f' }}
  >
    {tipos.map(tipo => (
      <option key={tipo} value={tipo}>{tipo === 'all' ? 'Todos os tipos' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
    ))}
  </select>
)

export default FiltroTipo