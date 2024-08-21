import { useEffect, useRef } from 'react';
import "./style.css";

export default function Modal({ show, pokemonDetails, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  const name = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
  const image = pokemonDetails.sprites.front_default;
  const types = pokemonDetails.types.map((el) => el.type.name);
  const wikiUrl = `https://bulbapedia.bulbagarden.net/wiki/${name}`;
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
    <div className="modal">
      <div className="modalContent" ref={modalRef}>
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <div className="modalDetails">
          <div className="modalName">{name}</div>
          <img src={image} alt={name} />
          <div className='pokemonTypeHeader'>Type</div>
          <div className="modalTypes">
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
          <a href={wikiUrl} target="_blank" rel="noopener noreferrer">
            <button className='wikiButton'>Visit {name}'s Wiki</button>
          </a>
        </div>
      </div>
    </div>
  );
}



