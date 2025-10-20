import React from 'react'

const tipos = [
  'all', 'grass', 'fire', 'water', 'bug', 'poison', 'flying', 'normal', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'
]

const FiltroTipo = ({ tipoSelecionado, onTipoChange }: { tipoSelecionado: string, onTipoChange: (tipo: string) => void }) => (
  <select
    value={tipoSelecionado}
    onChange={e => onTipoChange(e.target.value)}
    style={{  marginBottom: '26px',
  padding: '10px 20px',
  borderRadius: '10px',
  border: '1.5px solid rgba(103, 15, 245, 0.15)',
  background: 'rgba(56, 8, 133, 0.08)',
  color: '#ffffffff',
  fontSize: '1rem',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(6px)',
  boxShadow: '0 2px 6px rgba(48, 15, 109, 1)', 
}}
onFocus={(e) => {
  e.target.style.border = '1.5px solid #7f57ff'
  e.target.style.boxShadow = '0 0 8px rgba(127, 87, 255, 0.4)'
  e.target.style.background = 'rgba(27, 5, 70, 1)'
}}
onBlur={(e) => {
  e.target.style.border = '1.5px solid rgba(255, 255, 255, 0.15)'
  e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'
  e.target.style.background = 'rgba(255, 255, 255, 0.08)'
}}


  >
    {tipos.map(tipo => (
      <option key={tipo} value={tipo}>{tipo === 'all' ? 'Todos os tipos' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
    ))}
  </select>
)

export default FiltroTipo