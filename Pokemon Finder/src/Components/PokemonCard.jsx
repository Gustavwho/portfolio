import { useEffect, useState } from "react";
import "./style.css";

export default function PokemonCard({ pokemon, onClick }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (err) {
        console.error("Failed to fetch Pokemon details", err);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  if (!pokemonDetails) return null;

  const name = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
  const image = pokemonDetails.sprites.front_default;
  const types = pokemonDetails.types.map((el) => el.type.name);
  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  
  return (
    <div className="pokemonCard" onClick={onClick}>
      <div className="name">{name}</div>
      <img src={image} alt={name} />
      <div className="types">
        {types.map((type) => (
          <div
            key={type}
            className="type"
            style={{ backgroundColor: colours[type] }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}



