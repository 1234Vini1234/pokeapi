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
      style={{ padding: '10px', width: '60%', marginBottom: '16px' }}
    />
  )
}

export default SearchBar