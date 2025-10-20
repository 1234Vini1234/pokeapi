import React, { useState } from 'react'


const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setValue(text)
    onSearch(text) 
  }

  return (
    <input
      type="text"
      placeholder="Digite para buscar Pokémon..."
      value={value}
      onChange={handleChange}
      style={{      width: '60%',
      maxWidth: '480px',
      padding: '12px 18px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '1.5px solid rgba(255, 255, 255, 0.15)',
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#fff',
      outline: 'none',
      transition: 'all 0.3s ease',
      marginBottom: '24px',
      backdropFilter: 'blur(6px)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
    }}
     onFocus={(e) => {
      e.target.style.border = '1.5px solid #7f57ff'
      e.target.style.boxShadow = '0 0 8px rgba(127, 87, 255, 0.4)'
      e.target.style.background = 'rgba(255, 255, 255, 0.12)'
    }}
    onBlur={(e) => {
      e.target.style.border = '1.5px solid rgba(255, 255, 255, 0.15)'
      e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)'
      e.target.style.background = 'rgba(255, 255, 255, 0.08)'}}
    />
  )
}

export default SearchBar