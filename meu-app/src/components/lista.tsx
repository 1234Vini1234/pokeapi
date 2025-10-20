import React from 'react';

interface PokemonListProps {
  pokemons: any[];
  onSelect: (name: string) => void;
  loading: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelect, loading }) => {
  if (loading && pokemons.length === 0) {
    return <p>Carregando...</p>;
  }

  if (pokemons.length === 0) {
    return <p>Nenhum Pokémon encontrado.</p>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((p) => (
        <div
          key={p.name}
          className="pokemon-card"
          onClick={() => onSelect(p.name)}
        >
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.types && p.types[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;

